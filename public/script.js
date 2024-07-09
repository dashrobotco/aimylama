const socket = io({
    path: '/api/socketio',
    transports: ['polling'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000
  });
  
  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    console.error('Error details:', error.description);
  });
  
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  
  socket.on('disconnect', (reason) => {
    console.log('Disconnected:', reason);
    if (reason === 'io server disconnect') {
      // the disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    }
    // else the socket will automatically try to reconnect
  });
  
  // Debug: Log all socket events
  const originalEmit = socket.emit;
  socket.emit = function() {
    console.log('Emitting:', arguments);
    originalEmit.apply(socket, arguments);
  };
  
  // Rest of your game logic...


  // ... rest of your game logic
  
  function setupKeyboardControls() {
      document.addEventListener('keydown', (event) => {
          let direction = null;
          switch (event.key) {
              case 'ArrowUp':
              case 'w':
              case 'W':
                  direction = 'up';
                  break;
              case 'ArrowDown':
              case 's':
              case 'S':
                  direction = 'down';
                  break;
              case 'ArrowLeft':
              case 'a':
              case 'A':
                  direction = 'left';
                  break;
              case 'ArrowRight':
              case 'd':
              case 'D':
                  direction = 'right';
                  break;
          }
          if (direction) {
              socket.emit('move', direction);
          }
      });
  }