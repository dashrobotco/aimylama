import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      transports: ['polling'], // Use only polling for now
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('join', (playerName) => {
        console.log('Player joined:', playerName);
        // Your game logic here
      });

      socket.on('move', (direction) => {
        console.log('Player moved:', direction);
        // Your game logic here
      });

      socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        // Your game logic here
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;