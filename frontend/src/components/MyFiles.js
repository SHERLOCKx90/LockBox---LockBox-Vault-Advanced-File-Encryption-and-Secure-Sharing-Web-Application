// // import React, { useState, useEffect } from 'react';
// // import {
// //   Grid,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Button,
// //   Typography,
// //   TextField,
// //   Dialog,
// //   DialogContent,
// //   DialogTitle,
// //   Box,
// // } from '@mui/material';
// // import DownloadIcon from '@mui/icons-material/Download';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import axios from 'axios';

// // function MyFiles() {
// //   const [files, setFiles] = useState([]);
// //   const [secretKey, setSecretKey] = useState('');
// //   const [downloadFileId, setDownloadFileId] = useState('');
// //   const userId = localStorage.getItem('userId');

// //   useEffect(() => {
// //     fetchFiles();
// //   }, []);

// //   const fetchFiles = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5000/files', {
// //         params: { userId },
// //       });
// //       setFiles(response.data);
// //     } catch (error) {
// //       toast.error('Error fetching files.');
// //     }
// //   };

// //   const handleDownload = async (fileId) => {
// //     const file = files.find((f) => f._id === fileId);
// //     const { filename, iv, originalName } = file;

// //     if (!secretKey) {
// //       toast.error('Please enter the secret key.');
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         `http://localhost:5000/download/${filename}`,
// //         { userId, secretKey, iv },
// //         { responseType: 'blob' }
// //       );

// //       const url = window.URL.createObjectURL(new Blob([response.data]));
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.setAttribute('download', originalName);
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);

// //       toast.success('File downloaded successfully!');
// //       setDownloadFileId('');
// //     } catch (error) {
// //       toast.error('Error downloading file. Check your secret key.');
// //     }
// //   };

// //   const handleDelete = async (fileId) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/files/${fileId}`, {
// //         params: { userId },
// //       });
// //       toast.success('File deleted successfully!');
// //       fetchFiles();
// //     } catch (error) {
// //       toast.error('Error deleting file.');
// //     }
// //   };

// //   return (
// //     <Box sx={{ mt: 2, padding: 2 }}>
// //       <ToastContainer />
// //       <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
// //         Your Files
// //       </Typography>
// //       <Grid container spacing={3}>
// //         {files.map((file) => (
// //           <Grid item xs={12} key={file._id}>
// //             <Card
// //               sx={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 padding: 2,
// //                 backgroundColor: '#ffffff',
// //                 color: '#000000',
// //                 borderRadius: 4,
// //                 boxShadow: 2,
// //               }}
// //             >
// //               <CardContent
// //                 sx={{
// //                   display: 'flex',
// //                   justifyContent: 'space-between',
// //                   alignItems: 'center',
// //                   paddingBottom: '8px',
// //                 }}
// //               >
// //                 <Box>
// //                   <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
// //                     {file.originalName}
// //                   </Typography>
// //                   <Typography variant="body2" sx={{ color: '#555' }}>
// //                     Uploaded: {new Date(file.createdAt).toLocaleString()}
// //                   </Typography>
// //                 </Box>
// //               </CardContent>
// //               <CardActions
// //                 sx={{
// //                   display: 'flex',
// //                   justifyContent: 'space-between',
// //                   padding: '8px 16px',
// //                 }}
// //               >
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   startIcon={<DownloadIcon />}
// //                   onClick={() => setDownloadFileId(file._id)}
// //                   sx={{ flexGrow: 1, marginRight: 1, textTransform: 'capitalize' }}
// //                 >
// //                   Download
// //                 </Button>
// //                 <Button
// //                   variant="contained"
// //                   color="error"
// //                   startIcon={<DeleteIcon />}
// //                   onClick={() => handleDelete(file._id)}
// //                   sx={{ flexGrow: 1, textTransform: 'capitalize' }}
// //                 >
// //                   Delete
// //                 </Button>
// //               </CardActions>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* Dialog for Secret Key Input */}
// //       <Dialog open={!!downloadFileId} onClose={() => setDownloadFileId('')} fullWidth maxWidth="sm">
// //         <DialogTitle sx={{ fontWeight: 'bold', color: '#1976d2' }}>Enter Secret Key</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             fullWidth
// //             value={secretKey}
// //             onChange={(e) => setSecretKey(e.target.value)}
// //             placeholder="Enter your secret key"
// //             variant="outlined"
// //             margin="normal"
// //           />
// //           <Button
// //             fullWidth
// //             variant="contained"
// //             color="primary"
// //             onClick={() => handleDownload(downloadFileId)}
// //             sx={{ mt: 2 }}
// //           >
// //             Download
// //           </Button>
// //           <Button
// //             fullWidth
// //             variant="outlined"
// //             color="secondary"
// //             onClick={() => setDownloadFileId('')}
// //             sx={{ mt: 1 }}
// //           >
// //             Cancel
// //           </Button>
// //         </DialogContent>
// //       </Dialog>
// //     </Box>
// //   );
// // }

// // export default MyFiles;



// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Typography,
//   TextField,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Box,
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// function MyFiles() {
//   const [files, setFiles] = useState([]);
//   const [secretKey, setSecretKey] = useState('');
//   const [downloadFileId, setDownloadFileId] = useState('');
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (userId) {
//       fetchFiles();
//     } else {
//       toast.error('User ID not found. Please log in again.');
//     }
//   }, [userId]);

//   const fetchFiles = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/files', {
//         params: { userId },
//       });
//       if (response.data && response.data.length > 0) {
//         setFiles(response.data);
//       } else {
//         toast.info('No files found for this user.');
//       }
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       toast.error(
//         error.response?.data?.error || 'Error fetching files. Please try again later.'
//       );
//     }
//   };

//   const handleDownload = async (fileId) => {
//     const file = files.find((f) => f._id === fileId);
//     const { filename, iv, originalName } = file;

//     if (!secretKey) {
//       toast.error('Please enter the secret key.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/download/${filename}`,
//         { userId, secretKey, iv },
//         { responseType: 'blob' }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', originalName);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.success('File downloaded successfully!');
//       setDownloadFileId('');
//     } catch (error) {
//       console.error('Error downloading file:', error);
//       toast.error('Error downloading file. Check your secret key.');
//     }
//   };

//   const handleDelete = async (fileId) => {
//     try {
//       await axios.delete(`http://localhost:5000/files/${fileId}`, {
//         params: { userId },
//       });
//       toast.success('File deleted successfully!');
//       fetchFiles(); // Refresh file list
//     } catch (error) {
//       console.error('Error deleting file:', error);
//       toast.error('Error deleting file.');
//     }
//   };

//   return (
//     <Box sx={{ mt: 2, padding: 2 }}>
//       <ToastContainer />
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
//         Your Files
//       </Typography>
//       <Grid container spacing={3}>
//         {files.map((file) => (
//           <Grid item xs={12} key={file._id}>
//             <Card
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 padding: 2,
//                 backgroundColor: '#ffffff',
//                 color: '#000000',
//                 borderRadius: 4,
//                 boxShadow: 2,
//               }}
//             >
//               <CardContent
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   paddingBottom: '8px',
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//                     {file.originalName}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: '#555' }}>
//                     Uploaded: {new Date(file.createdAt).toLocaleString()}
//                   </Typography>
//                 </Box>
//               </CardContent>
//               <CardActions
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   padding: '8px 16px',
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<DownloadIcon />}
//                   onClick={() => setDownloadFileId(file._id)}
//                   sx={{ flexGrow: 1, marginRight: 1, textTransform: 'capitalize' }}
//                 >
//                   Download
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   startIcon={<DeleteIcon />}
//                   onClick={() => handleDelete(file._id)}
//                   sx={{ flexGrow: 1, textTransform: 'capitalize' }}
//                 >
//                   Delete
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Dialog for Secret Key Input */}
//       <Dialog open={!!downloadFileId} onClose={() => setDownloadFileId('')} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ fontWeight: 'bold', color: '#1976d2' }}>Enter Secret Key</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             value={secretKey}
//             onChange={(e) => setSecretKey(e.target.value)}
//             placeholder="Enter your secret key"
//             variant="outlined"
//             margin="normal"
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={() => handleDownload(downloadFileId)}
//             sx={{ mt: 2 }}
//           >
//             Download
//           </Button>
//           <Button
//             fullWidth
//             variant="outlined"
//             color="secondary"
//             onClick={() => setDownloadFileId('')}
//             sx={{ mt: 1 }}
//           >
//             Cancel
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }

// export default MyFiles;



import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function MyFiles() {
  const [files, setFiles] = useState([]);
  const [secretKey, setSecretKey] = useState('');
  const [downloadFileId, setDownloadFileId] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchFiles();
    } else {
      toast.error('User ID not found. Please log in again.');
    }
  }, [userId]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files', {
        params: { userId },
      });
      if (response.data.length > 0) {
        setFiles(response.data);
      } else {
        toast.info('No files found for this user.');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error(
        error.response?.data?.error || 'Error fetching files. Please try again later.'
      );
    }
  };

  const handleDownload = async (fileId) => {
    const file = files.find((f) => f._id === fileId);
    if (!file) {
      toast.error('File not found in the current list.');
      return;
    }
    const { filename, iv, originalName } = file;

    if (!secretKey) {
      toast.error('Please enter the secret key.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/download/${filename}`,
        { secretKey, iv },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('File downloaded successfully!');
      setDownloadFileId('');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Error downloading file. Check your secret key.');
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/files/${fileId}`, {
        params: { userId },
      });
      toast.success('File deleted successfully!');
      fetchFiles(); // Refresh file list
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Error deleting file.');
    }
  };

  return (
    <Box sx={{ mt: 2, padding: 2 }}>
      <ToastContainer />
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
        Your Files
      </Typography>
      <Grid container spacing={3}>
        {files.map((file) => (
          <Grid item xs={12} key={file._id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
                backgroundColor: '#ffffff',
                color: '#000000',
                borderRadius: 4,
                boxShadow: 2,
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '8px',
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {file.originalName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Uploaded: {new Date(file.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 16px',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={() => setDownloadFileId(file._id)}
                  sx={{ flexGrow: 1, marginRight: 1, textTransform: 'capitalize' }}
                >
                  Download
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(file._id)}
                  sx={{ flexGrow: 1, textTransform: 'capitalize' }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Secret Key Input */}
      <Dialog open={!!downloadFileId} onClose={() => setDownloadFileId('')} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', color: '#1976d2' }}>Enter Secret Key</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Enter your secret key"
            variant="outlined"
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleDownload(downloadFileId)}
            sx={{ mt: 2 }}
          >
            Download
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => setDownloadFileId('')}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default MyFiles;
