const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Serve socket.io.js
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules/socket.io/client-dist/socket.io.js'));
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});