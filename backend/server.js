const express = require('express');
const multer = require('multer');
const cors = require('cors');
const crypto = require('crypto');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const User = require('./models/User');
const File = require('./models/File');

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/simple-file', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware for JSON, static files, and CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors());

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Encrypt a file
function encryptFile(inputPath, outputPath, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  return new Promise((resolve, reject) => {
    input
      .pipe(cipher)
      .pipe(output)
      .on('finish', () => resolve(iv.toString('hex')))
      .on('error', (err) => reject(err));
  });
}

// Decrypt a file
function decryptFile(inputPath, outputPath, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-ctr', key, Buffer.from(iv, 'hex'));
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  return new Promise((resolve, reject) => {
    input
      .pipe(decipher)
      .pipe(output)
      .on('finish', resolve)
      .on('error', reject);
  });
}

// User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(400).json({ error: 'Error registering user' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// API to upload and encrypt a file
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { userId } = req.body;
    const secretKey = crypto.randomBytes(32).toString('hex'); // Generate a unique secret key
    const encryptedFilePath = path.join(__dirname, 'uploads', `enc-${req.file.filename}`);

    const iv = await encryptFile(req.file.path, encryptedFilePath, Buffer.from(secretKey, 'hex'));

    fs.unlinkSync(req.file.path); // Delete the original file

    // Save file details in MongoDB
    const file = new File({
      userId,
      filename: `enc-${req.file.filename}`,
      originalName: req.file.originalname,
      iv,
      secretKey,
    });
    await file.save();

    res.status(200).json({
      message: 'File uploaded and encrypted successfully.',
      secretKey,
      iv,
      filename: file.filename,
    });
  } catch (error) {
    console.error('Error encrypting file:', error);
    res.status(500).json({ error: 'Error uploading and encrypting file.' });
  }
});

// Endpoint to download a particular file
app.post('/download/:filename', async (req, res) => {
  try {
      const { filename } = req.params;
      const { secretKey, iv } = req.body;

      // Validate incoming data
      if (!filename || !secretKey || !iv) {
          return res.status(400).json({ error: 'Missing required fields: filename, secretKey, or iv' });
      }

      const file = await File.findOne({ filename });
      if (!file) {
          return res.status(404).json({ error: 'File not found.' });
      }

      if (file.secretKey !== secretKey) {
          return res.status(403).json({ error: 'Invalid secret key.' });
      }

      const encryptedFilePath = path.join(__dirname, 'uploads', filename);
      const decryptedFilePath = path.join(__dirname, 'uploads', `dec-${filename}`);

      // Decrypt the file
      await decryptFile(encryptedFilePath, decryptedFilePath, Buffer.from(secretKey, 'hex'), iv);

      res.download(decryptedFilePath, file.originalName, (err) => {
          fs.unlinkSync(decryptedFilePath); // Delete decrypted file after download
          if (err) {
              console.error('Error serving file:', err);
              res.status(500).json({ error: 'Error downloading file.' });
          }
      });
  } catch (error) {
      console.error('Error in download endpoint:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




// API to get all files for a user
app.get('/files', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    const files = await File.find({ userId });
    if (!files.length) {
      return res.status(404).json({ message: 'No files found for this user.' });
    }
    res.status(200).json(files);
  } catch (err) {
    console.error('Error fetching files:', err);
    res.status(500).json({ error: 'An error occurred while fetching files.' });
  }
});

// Endpoint to verify the secret key
app.post('/verify-key', async (req, res) => {
  const { secretKey } = req.body;

  try {
    const file = await File.findOne({ secretKey });
    if (!file) {
      return res.status(404).json({ error: 'Invalid secret key or file not found.' });
    }

    res.status(200).json({
      fileId: file._id,
      filename: file.filename,
      originalName: file.originalName,
      iv: file.iv,
    });
  } catch (error) {
    console.error('Error verifying key:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// API to delete a file
app.delete('/files/:id', async (req, res) => {
  try {
    const { id } = req.params; // File ID from the request parameters
    const { userId } = req.query; // User ID from the query parameters for authorization

    // Find the file in the database
    const file = await File.findOneAndDelete({ _id: id, userId });
    if (!file) {
      return res.status(404).json({ error: 'File not found or unauthorized access.' });
    }

    // Get the file path
    const filePath = path.join(__dirname, 'uploads', file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file from the filesystem
    }

    res.status(200).json({ message: 'File deleted successfully.' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'An error occurred while deleting the file.' });
  }
});



// Default route for root path
app.get('/', (req, res) => {
  res.send('Welcome to the CipherFiles Backend API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
