// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UploadDownload = () => {
//   const [file, setFile] = useState(null);
//   const [uploadedFilename, setUploadedFilename] = useState('');
//   const [downloadFilename, setDownloadFilename] = useState('');
//   const [secretKey, setSecretKey] = useState('');
//   const [iv, setIv] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       toast.error('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success('File uploaded and encrypted successfully!');
//       setUploadedFilename(response.data.filename);
//       setSecretKey(response.data.secretKey); // Store the encryption key
//       setIv(response.data.iv); // Store the initialization vector (IV)
//     } catch (error) {
//       toast.error('Error uploading and encrypting file.');
//       console.error(error);
//     }
//   };

//   const handleDownload = async () => {
//     if (!downloadFilename || !secretKey || !iv) {
//       toast.error('Please enter the filename, secret key, and IV.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/download/${downloadFilename}`,
//         { secretKey, iv },
//         { responseType: 'blob' } // Expect binary data
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', downloadFilename.replace('enc-', '')); // Set the correct filename
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.success('File downloaded and decrypted successfully!');
//     } catch (error) {
//       toast.error('Error downloading file. Check your inputs.');
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Upload and Encrypt File</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>

//       {uploadedFilename && secretKey && iv && (
//         <div>
//           <p>Uploaded Filename: {uploadedFilename}</p>
//           <p>Secret Key: {secretKey}</p>
//           <p>Initialization Vector (IV): {iv}</p>
//           <p>
//             <strong>Note:</strong> Save the secret key and IV. You'll need them to decrypt and download the file.
//           </p>
//         </div>
//       )}

//       <h2>Download and Decrypt File</h2>
//       <input
//         type="text"
//         placeholder="Enter encrypted filename"
//         value={downloadFilename}
//         onChange={(e) => setDownloadFilename(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter secret key"
//         value={secretKey}
//         onChange={(e) => setSecretKey(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter IV"
//         value={iv}
//         onChange={(e) => setIv(e.target.value)}
//       />
//       <button onClick={handleDownload}>Download</button>

//       <ToastContainer />
//     </div>
//   );
// };

// export default UploadDownload;


import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadDownload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFilename, setUploadedFilename] = useState('');
  const [downloadFilename, setDownloadFilename] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [iv, setIv] = useState('');
  const [isKeyVisible, setIsKeyVisible] = useState(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('File uploaded and encrypted successfully!');
      setUploadedFilename(response.data.filename);
      setSecretKey(response.data.secretKey); // Store the encryption key
      setIv(response.data.iv); // Store the initialization vector (IV)
      setIsKeyVisible(true); // Show the keys initially
    } catch (error) {
      toast.error('Error uploading and encrypting file.');
      console.error(error);
    }
  };

  const handleDownload = async () => {
    if (!downloadFilename || !secretKey || !iv) {
      toast.error('Please enter the filename, secret key, and IV.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/download/${downloadFilename}`,
        { secretKey, iv },
        { responseType: 'blob' } // Expect binary data
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadFilename.replace('enc-', '')); // Set the correct filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('File downloaded and decrypted successfully!');
    } catch (error) {
      toast.error('Error downloading file. Check your inputs.');
      console.error(error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => toast.success('Copied to clipboard!'),
      (err) => toast.error('Failed to copy.')
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">File Encryption Service</h1>

        {/* Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload and Encrypt File</h2>
          <input
            type="file"
            className="block w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-md p-2 mb-4"
            onChange={handleFileChange}
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Upload
          </button>
        </div>

        {/* Display Keys */}
        {uploadedFilename && isKeyVisible && (
          <div className="bg-gray-800 p-4 rounded-md mb-8">
            <p className="mb-2">Uploaded Filename: <span className="font-semibold">{uploadedFilename}</span></p>
            <div className="mb-4">
              <p className="mb-2">Secret Key:</p>
              <div className="flex items-center">
                <input
                  type="text"
                  value={secretKey}
                  readOnly
                  className="flex-1 bg-gray-700 border border-gray-600 text-gray-300 p-2 rounded-l-md"
                />
                <button
                  onClick={() => copyToClipboard(secretKey)}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-r-md"
                >
                  Copy
                </button>
              </div>
            </div>
            <div>
              <p className="mb-2">Initialization Vector (IV):</p>
              <div className="flex items-center">
                <input
                  type="text"
                  value={iv}
                  readOnly
                  className="flex-1 bg-gray-700 border border-gray-600 text-gray-300 p-2 rounded-l-md"
                />
                <button
                  onClick={() => copyToClipboard(iv)}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-r-md"
                >
                  Copy
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsKeyVisible(false)}
              className="mt-4 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded"
            >
              Hide Keys
            </button>
          </div>
        )}

        {/* Download Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Download and Decrypt File</h2>
          <input
            type="text"
            placeholder="Enter encrypted filename"
            value={downloadFilename}
            onChange={(e) => setDownloadFilename(e.target.value)}
            className="block w-full bg-gray-700 border border-gray-600 text-gray-300 p-2 mb-4 rounded-md"
          />
          <input
            type="text"
            placeholder="Enter secret key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="block w-full bg-gray-700 border border-gray-600 text-gray-300 p-2 mb-4 rounded-md"
          />
          <input
            type="text"
            placeholder="Enter IV"
            value={iv}
            onChange={(e) => setIv(e.target.value)}
            className="block w-full bg-gray-700 border border-gray-600 text-gray-300 p-2 mb-4 rounded-md"
          />
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Download
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UploadDownload;
