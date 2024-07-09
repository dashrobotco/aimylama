import { Server } from 'socket.io';

export default function ioHandler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket already running');
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  console.log('Socket initialized');
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};