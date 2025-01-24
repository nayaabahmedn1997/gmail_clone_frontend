import { io } from 'socket.io-client';
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../utils/generateToast';

const socket = io('https://gmail-clone-backend-pfid.onrender.com',{
    //withCredentials: true,
    // extraHeaders: {
    //     "my-custom-header": "abcd"
    //   } // Allow credentials like cookies or headers
    auth: {
      token: localStorage.getItem('token-url'), // Send JWT token
    },
    }); // Backend server URL

socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
  generateToast("Connected to server", TOAST_SUCCESS)
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
  generateToast("Disconnected from server", TOAST_ERROR)
});

socket.on('emailSent', (data) => {
  alert(data.message); // Notify user email was sent
  generateToast(data.message, TOAST_SUCCESS);

});

socket.on('newEmail', (data) => {
  generateToast(data.message, TOAST_SUCCESS);

});

export default socket;
