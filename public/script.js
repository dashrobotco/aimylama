const socket = io();

const statusDiv = document.getElementById('status');

socket.on('connect', () => {
  statusDiv.textContent = 'Connected to server';
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  statusDiv.textContent = 'Disconnected from server';
  console.log('Disconnected from server');
});

socket.on('connect_error', (error) => {
  statusDiv.textContent = `Connection error: ${error.message}`;
  console.error('Connection error:', error);
});