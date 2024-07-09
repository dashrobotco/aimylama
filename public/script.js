const statusDiv = document.getElementById('status');

function updateStatus(message) {
  statusDiv.textContent = message;
  console.log(message);
}

try {
  const socket = io({
    transports: ['polling'],
    upgrade: false
  });

  socket.on('connect', () => {
    updateStatus('Connected to server');
  });

  socket.on('disconnect', (reason) => {
    updateStatus(`Disconnected from server: ${reason}`);
  });

  socket.on('connect_error', (error) => {
    updateStatus(`Connection error: ${error.message}`);
    console.error('Connection error:', error);
  });

  socket.on('welcome', (message) => {
    updateStatus(`Server says: ${message}`);
  });

} catch (error) {
  updateStatus(`Error initializing Socket.IO: ${error.message}`);
  console.error('Error initializing Socket.IO:', error);
}