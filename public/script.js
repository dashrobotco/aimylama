const statusDiv = document.getElementById('status');

function updateStatus(message) {
  statusDiv.textContent = message;
  console.log(message);
}

try {
  const socket = io({
    transports: ['websocket', 'polling']
  });

  socket.on('connect', () => {
    updateStatus('Connected to server');
  });

  socket.on('disconnect', () => {
    updateStatus('Disconnected from server');
  });

  socket.on('connect_error', (error) => {
    updateStatus(`Connection error: ${error.message}`);
    console.error('Connection error:', error);
  });
} catch (error) {
  updateStatus(`Error initializing Socket.IO: ${error.message}`);
  console.error('Error initializing Socket.IO:', error);
}