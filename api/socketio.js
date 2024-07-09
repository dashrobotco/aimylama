import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  console.log('Received request for Socket.IO');

  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      transports: ['polling'],
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
      pingTimeout: 60000,
      pingInterval: 25000
    });

    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('Socket.io already running');
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;