import { io } from 'socket.io-client';
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from '../utils/generateToast';

const socket = io('http://localhost:6002',{
    //withCredentials: true,
    // extraHeaders: {
    //     "my-custom-header": "abcd"
    //   } // Allow credentials like cookies or headers
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
