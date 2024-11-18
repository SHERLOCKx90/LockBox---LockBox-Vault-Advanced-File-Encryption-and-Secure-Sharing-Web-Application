// // import React, { useState } from 'react';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogTitle,
// //   TextField,
// //   Button,
// //   Typography,
// //   Box,
// // } from '@mui/material';
// // import { ToastContainer, toast } from 'react-toastify';
// // import axios from 'axios';

// // function KeyUnlockDialog() {
// //   const [secretKey, setSecretKey] = useState('');
// //   const [fileDetails, setFileDetails] = useState(null);
// //   const [isDialogOpen, setIsDialogOpen] = useState(true);

// //   const handleVerifyKey = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:5000/verify-key', { secretKey });
// //       setFileDetails(response.data);
// //       toast.success('Key verified! You can now download the file.');
// //     } catch (error) {
// //       toast.error('Invalid secret key or file not found.');
// //     }
// //   };

// //   const handleDownload = async () => {
// //     if (!fileDetails) return;

// //     try {
// //       const response = await axios.post(
// //         `http://localhost:5000/download/${fileDetails.filename}`,
// //         { secretKey },
// //         { responseType: 'blob' }
// //       );

// //       const url = window.URL.createObjectURL(new Blob([response.data]));
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.setAttribute('download', fileDetails.originalName);
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);

// //       toast.success('File downloaded successfully!');
// //       setIsDialogOpen(false);
// //     } catch (error) {
// //       toast.error('Error downloading file.');
// //     }
// //   };

// //   return (
// //     <div>
// //       <ToastContainer />
// //       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
// //         <DialogTitle>Enter Secret Key</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             fullWidth
// //             value={secretKey}
// //             onChange={(e) => setSecretKey(e.target.value)}
// //             placeholder="Enter the secret key"
// //             variant="outlined"
// //             margin="normal"
// //           />
// //           {fileDetails && (
// //             <Typography sx={{ mt: 2 }}>
// //               File Found: <strong>{fileDetails.originalName}</strong>
// //             </Typography>
// //           )}
// //           <Box sx={{ mt: 2 }}>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               fullWidth
// //               onClick={!fileDetails ? handleVerifyKey : handleDownload}
// //             >
// //               {!fileDetails ? 'Verify Key' : 'Download File'}
// //             </Button>
// //           </Box>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // }

// // export default KeyUnlockDialog;


// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
//   Typography,
//   Box,
// } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';

// function KeyUnlockDialog() {
//   const [secretKey, setSecretKey] = useState('');
//   const [fileDetails, setFileDetails] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(true);

//   const handleVerifyKey = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/verify-key', { secretKey });
//       setFileDetails(response.data);
//       toast.success('Key verified! You can now download the file.');
//     } catch (error) {
//       console.error('Error verifying key:', error);
//       toast.error(error.response?.data?.error || 'Invalid secret key or file not found.');
//     }
//   };

//   const handleDownload = async () => {
//     if (!fileDetails) return;
  
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/download/${fileDetails.filename}`,
//         { secretKey, iv: fileDetails.iv }, // Include both secretKey and iv
//         { responseType: 'blob' } // Expect a binary file response
//       );
  
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', fileDetails.originalName);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
  
//       toast.success('File downloaded successfully!');
//       setIsDialogOpen(false);
//     } catch (error) {
//       console.error('Error downloading file:', error.message);
//       toast.error('Failed to download file. Check your secret key or try again.');
//     }
//   };
  
  

//   return (
//     <div>
//       <ToastContainer />
//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Enter Secret Key</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             value={secretKey}
//             onChange={(e) => setSecretKey(e.target.value)}
//             placeholder="Enter the secret key"
//             variant="outlined"
//             margin="normal"
//           />
//           {fileDetails && (
//             <Typography sx={{ mt: 2 }}>
//               File Found: <strong>{fileDetails.originalName}</strong>
//             </Typography>
//           )}
//           <Box sx={{ mt: 2 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={!fileDetails ? handleVerifyKey() : handleDownload()}
//             >
//               {!fileDetails ? 'Verify Key' : 'Download File'}
//             </Button>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default KeyUnlockDialog;


import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function KeyUnlockDialog() {
  const [secretKey, setSecretKey] = useState('');
  const [fileDetails, setFileDetails] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const handleVerifyKey = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-key', { secretKey });
      setFileDetails(response.data); // Update fileDetails state with response data
      toast.success('Key verified! You can now download the file.');
    } catch (error) {
      console.error('Error verifying key:', error);
      toast.error(error.response?.data?.error || 'Invalid secret key or file not found.');
    }
  };

  const handleDownload = async () => {
    if (!fileDetails) {
      toast.error('File details are missing. Verify the key first.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/download/${fileDetails.filename}`,
        { secretKey, iv: fileDetails.iv }, // Pass secretKey and iv to backend
        { responseType: 'blob' } // Expect binary response
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileDetails.originalName); // Use original file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('File downloaded successfully!');
      setIsDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error('Error downloading file:', error.message);
      toast.error('Failed to download file. Check your secret key or try again.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Enter Secret Key</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Enter the secret key"
            variant="outlined"
            margin="normal"
          />
          {fileDetails && (
            <Typography sx={{ mt: 2 }}>
              File Found: <strong>{fileDetails.originalName}</strong>
            </Typography>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={!fileDetails ? handleVerifyKey : handleDownload} // Pass function reference
            >
              {!fileDetails ? 'Verify Key' : 'Download File'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default KeyUnlockDialog;
