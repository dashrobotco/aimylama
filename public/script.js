const socket = io({
    path: '/api/socketio',
    transports: ['polling'],
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
  });
  
  // Debug: Log all socket events
  const originalEmit = socket.emit;
  socket.emit = function() {
    console.log('Emitting:', arguments);
    originalEmit.apply(socket, arguments);
  };

  
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