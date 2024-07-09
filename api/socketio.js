import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
    });

    const players = new Map();
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('join', (playerName) => {
        console.log('Player joined:', playerName);
        if (players.size >= 5) {
          socket.emit('serverFull');
          return;
        }

        const player = {
          id: socket.id,
          name: playerName,
          x: Math.random() * 750,
          y: Math.random() * 550,
          color: colors[players.size]
        };

        players.set(socket.id, player);
        io.emit('gameState', Array.from(players.values()));
      });

      socket.on('move', (direction) => {
        const player = players.get(socket.id);
        if (player) {
          const speed = 5;
          switch (direction) {
            case 'up':
              player.y = Math.max(0, player.y - speed);
              break;
            case 'down':
              player.y = Math.min(550, player.y + speed);
              break;
            case 'left':
              player.x = Math.max(0, player.x - speed);
              break;
            case 'right':
              player.x = Math.min(750, player.x + speed);
              break;
          }
          io.emit('gameState', Array.from(players.values()));
        }
      });

      socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        players.delete(socket.id);
        io.emit('gameState', Array.from(players.values()));
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;