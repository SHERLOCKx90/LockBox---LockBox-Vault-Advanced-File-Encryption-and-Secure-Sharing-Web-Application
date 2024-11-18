// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   Typography,
// //   Dialog,
// //   DialogContent,
// //   DialogTitle,
// //   IconButton,
// // } from '@mui/material';
// // import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import axios from 'axios';

// // function UploadFile() {
// //   const [file, setFile] = useState(null);
// //   const [fileName, setFileName] = useState('');
// //   const [secretKey, setSecretKey] = useState('');
// //   const [showKeyDialog, setShowKeyDialog] = useState(false);
// //   const userId = localStorage.getItem('userId');

// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //     setFileName(e.target.files[0]?.name || '');
// //   };

// //   const handleUpload = async () => {
// //     if (!file) {
// //       toast.error('Please select a file.');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('file', file);
// //     formData.append('userId', userId);

// //     try {
// //       const response = await axios.post('http://localhost:5000/upload', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });

// //       setSecretKey(response.data.secretKey);
// //       setShowKeyDialog(true);
// //       toast.success('File uploaded successfully!');
// //     } catch (error) {
// //       toast.error('Error uploading file.');
// //     }
// //   };

// //   const copyToClipboard = () => {
// //     navigator.clipboard.writeText(secretKey).then(
// //       () => toast.success('Secret key copied to clipboard!'),
// //       () => toast.error('Failed to copy the secret key.')
// //     );
// //   };

// //   return (
// //     <Box textAlign="center">
// //       <ToastContainer />
// //       <Box display="flex" justifyContent="center" mb={3}>
// //         <input
// //           type="file"
// //           onChange={handleFileChange}
// //           style={{ display: 'none' }}
// //           id="file-upload"
// //         />
// //         <label htmlFor="file-upload">
// //           <Button variant="outlined" component="span">
// //             Select File
// //           </Button>
// //         </label>
// //         <Typography sx={{ ml: 2 }}>{fileName || 'No file selected'}</Typography>
// //       </Box>
// //       <Button variant="contained" color="primary" onClick={handleUpload}>
// //         Upload
// //       </Button>

// //       <Dialog open={showKeyDialog} onClose={() => setShowKeyDialog(false)} fullWidth maxWidth="sm">
// //         <DialogTitle>Encryption Details</DialogTitle>
// //         <DialogContent>
// //           <Typography gutterBottom>
// //             Save this secret key. You will need it to download and decrypt your file.
// //           </Typography>
// //           <Box display="flex" alignItems="center" mt={2}>
// //             <TextField fullWidth value={secretKey} InputProps={{ readOnly: true }} />
// //             <IconButton color="primary" onClick={copyToClipboard}>
// //               <ContentCopyIcon />
// //             </IconButton>
// //           </Box>
// //           <Button
// //             fullWidth
// //             variant="outlined"
// //             color="secondary"
// //             sx={{ mt: 2 }}
// //             onClick={() => setShowKeyDialog(false)}
// //           >
// //             Close
// //           </Button>
// //         </DialogContent>
// //       </Dialog>
// //     </Box>
// //   );
// // }

// // export default UploadFile;


// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
// } from '@mui/material';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// function UploadFile() {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [secretKey, setSecretKey] = useState('');
//   const [showKeyDialog, setShowKeyDialog] = useState(false);
//   const userId = localStorage.getItem('userId'); // Make sure this is correctly stored

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setFileName(e.target.files[0]?.name || '');
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       toast.error('Please select a file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file); // Add file to FormData
//     formData.append('userId', userId); // Add userId to FormData

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.data && response.data.secretKey) {
//         setSecretKey(response.data.secretKey); // Store the secret key
//         setShowKeyDialog(true); // Open the dialog
//         toast.success('File uploaded successfully!');
//       } else {
//         throw new Error('Invalid response from the server.');
//       }
//     } catch (error) {
//       console.error('Upload Error:', error);
//       const errorMessage = error.response?.data?.message || 'Error uploading file. Please try again.';
//       toast.error(errorMessage);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(secretKey).then(
//       () => toast.success('Secret key copied to clipboard!'),
//       () => toast.error('Failed to copy the secret key.')
//     );
//   };

//   return (
//     <Box textAlign="center">
//       <ToastContainer />
//       <Box display="flex" justifyContent="center" mb={3}>
//         <input
//           type="file"
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//           id="file-upload"
//         />
//         <label htmlFor="file-upload">
//           <Button variant="outlined" component="span">
//             Select File
//           </Button>
//         </label>
//         <Typography sx={{ ml: 2 }}>{fileName || 'No file selected'}</Typography>
//       </Box>
//       <Button variant="contained" color="primary" onClick={handleUpload}>
//         Upload
//       </Button>

//       <Dialog open={showKeyDialog} onClose={() => setShowKeyDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Encryption Details</DialogTitle>
//         <DialogContent>
//           <Typography gutterBottom>
//             Save this secret key. You will need it to download and decrypt your file.
//           </Typography>
//           <Box display="flex" alignItems="center" mt={2}>
//             <TextField fullWidth value={secretKey} InputProps={{ readOnly: true }} />
//             <IconButton color="primary" onClick={copyToClipboard}>
//               <ContentCopyIcon />
//             </IconButton>
//           </Box>
//           <Button
//             fullWidth
//             variant="outlined"
//             color="secondary"
//             sx={{ mt: 2 }}
//             onClick={() => setShowKeyDialog(false)}
//           >
//             Close
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }

// export default UploadFile;


import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showKeyDialog, setShowKeyDialog] = useState(false);

  const userId = localStorage.getItem('userId');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file.');
      return;
    }

    if (!userId) {
      toast.error('User ID not found. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.secretKey) {
        setSecretKey(response.data.secretKey);
        setShowKeyDialog(true);
        toast.success('File uploaded successfully!');
      } else {
        toast.error('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      toast.error(
        error.response?.data?.message || 'Error uploading file. Please try again later.'
      );
    }
  };

  const copyToClipboard = () => {
    if (!secretKey) {
      toast.error('No secret key available to copy.');
      return;
    }

    navigator.clipboard.writeText(secretKey).then(
      () => toast.success('Secret key copied to clipboard!'),
      () => toast.error('Failed to copy the secret key.')
    );
  };

  return (
    <Box textAlign="center">
      <ToastContainer />
      <Box display="flex" justifyContent="center" mb={3}>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outlined" component="span">
            Select File
          </Button>
        </label>
        <Typography sx={{ ml: 2 }}>{fileName || 'No file selected'}</Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>

      <Dialog open={showKeyDialog} onClose={() => setShowKeyDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Encryption Details</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Save this secret key. You will need it to download and decrypt your file.
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <TextField fullWidth value={secretKey} InputProps={{ readOnly: true }} />
            <IconButton color="primary" onClick={copyToClipboard}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => setShowKeyDialog(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default UploadFile;
