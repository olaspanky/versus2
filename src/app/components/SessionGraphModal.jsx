import React from 'react';
import { Modal, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// const SessionGraphModal = ({ open, onClose, dailySessions }) => {
//   const sessionGraphData = {
//     labels: dailySessions.map(session => session.date),
//     datasets: [
//       {
//         label: 'Time Spent (hours)',
//         data: dailySessions.map(session => (session.timeSpent / 3600).toFixed(2)), // Convert seconds to hours
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }
//     ]
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '80%', borderRadius: '10px' }}>
//         <h3>Daily Sessions</h3>
//         <Line data={sessionGraphData} />
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Time Spent (hours)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dailySessions.map(session => (
//               <tr key={session._id}>
//                 <td>{session.date}</td>
//                 <td>{(session.timeSpent / 3600).toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Box>
//     </Modal>
//   );
// };
const SessionGraphModal = ({ open, onClose, dailySessions }) => {
    console.log('Modal open:', open); // Log when the modal opens
    console.log('Daily sessions data:', dailySessions); // Log the daily sessions data
  
    const sessionGraphData = {
      labels: dailySessions.map(session => session.date),
      datasets: [
        {
          label: 'Time Spent (hours)',
          data: dailySessions.map(session => (session.timeSpent / 3600).toFixed(2)), // Convert seconds to hours
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '80%', borderRadius: '10px' }}>
          <h3>Daily Sessions</h3>
          <Line data={sessionGraphData} />
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time Spent (hours)</th>
              </tr>
            </thead>
            <tbody>
              {dailySessions.map(session => (
                <tr key={session._id}>
                  <td>{session.date}</td>
                  <td>{(session.timeSpent / 3600).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Modal>
    );
  };
  
export default SessionGraphModal;
