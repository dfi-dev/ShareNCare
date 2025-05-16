import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { printPlugin } from '@react-pdf-viewer/print';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import '@react-pdf-viewer/core/lib/styles/index.css';

const ResumeViewer = ({ fileUrl }) => {
  const printPluginInstance = printPlugin();
  const getFilePluginInstance = getFilePlugin();

  const handlePrint = () => {
    printPluginInstance.print();
  };

  const handleDownload = () => {
    getFilePluginInstance.download();
  };

  return (
    <div style={containerStyle}>
      {/* Print styles to hide UI during print */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Buttons container */}
      <div className="no-print" style={toolbarStyle}>
        <button onClick={handlePrint} style={buttonStyle}>Print</button>
        <button onClick={handleDownload} style={buttonStyle}>Download</button>
      </div>

      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
        <Viewer
          fileUrl={fileUrl}
          plugins={[printPluginInstance, getFilePluginInstance]}
        />
      </Worker>
    </div>
  );
};

const containerStyle = {
  height: '750px',
  maxWidth: '1000px',
  margin: 'auto',
  border: '2px solid #333',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export default ResumeViewer;




















// import React, { useState } from 'react';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { saveAs } from 'file-saver'; // Import file-saver for downloading the file

// // Import styles
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const ResumeViewer = ({ fileUrl }) => {
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(null);

//   const handleLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const handlePrint = () => {
//     // Open PDF in a new window/tab for printing
//     const printWindow = window.open(fileUrl, '_blank');
//     printWindow.onload = () => {
//       printWindow.print(); // This triggers the print dialog for the whole document
//     };
//   };

//   const handleDownload = () => {
//     // Download the file using the file-saver library
//     saveAs(fileUrl, 'resume.pdf');
//   };

//   return (
//     <div style={styles.container}>
//       <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
//         <Viewer
//           fileUrl={fileUrl}
//           pageIndex={pageNumber - 1}
//           onLoadSuccess={handleLoadSuccess}
//           style={styles.viewer}
//         />
//       </Worker>

//       {/* Custom Print and Download Buttons */}
//       <div style={styles.actionButtons}>
//         <button onClick={handlePrint} style={styles.navButton}>
//           Print
//         </button>
//         <button onClick={handleDownload} style={styles.navButton}>
//           Download
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     height: '600px', // Reduced height
//     width: '80%', // Reduced width (80% of the parent container)
//     maxWidth: '1000px', // Maximum width
//     margin: 'auto',
//     borderRadius: '12px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     backgroundColor: '#f9f9f9',
//     padding: '20px',
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center', // Vertically and horizontally centered
//   },
//   viewer: {
//     width: '100%',
//     height: '100%',
//     borderRadius: '8px',
//   },
//   actionButtons: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: '10px',
//   },
//   navButton: {
//     backgroundColor: '#007bff',
//     color: '#fff',
//     padding: '10px 15px',
//     borderRadius: '5px',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '16px',
//     transition: 'background-color 0.3s',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//     margin: '0 5px',
//   },
// };

// export default ResumeViewer;
