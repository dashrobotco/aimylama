const socket = io({
    path: '/api/socketio',
    transports: ['polling'],
  });
  
  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });
  
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  
  let canvas, ctx;
  let playerId;
  
  document.getElementById('play-button').addEventListener('click', () => {
      const playerName = document.getElementById('player-name').value.trim();
      if (playerName) {
          document.getElementById('login-screen').style.display = 'none';
          document.getElementById('loading-screen').style.display = 'block';
          socket.emit('join', playerName);
      }
  });
  
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