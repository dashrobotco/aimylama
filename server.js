const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for game state
let players = [];

app.get('/api/join', (req, res) => {
  const playerName = req.query.name;
  if (players.length >= 5) {
    res.json({ error: 'Server is full, sucker!' });
  } else {
    const newPlayer = {
      id: players.length,
      name: playerName,
      x: Math.random() * 750,
      y: Math.random() * 550,
      color: ['red', 'blue', 'green', 'yellow', 'purple'][players.length]
    };
    players.push(newPlayer);
    res.json(newPlayer);
  }
});

app.get('/api/move', (req, res) => {
  const { id, direction } = req.query;
  const player = players[parseInt(id)];
  if (player) {
    const speed = 5;
    switch (direction) {
      case 'up': player.y = Math.max(0, player.y - speed); break;
      case 'down': player.y = Math.min(550, player.y + speed); break;
      case 'left': player.x = Math.max(0, player.x - speed); break;
      case 'right': player.x = Math.min(750, player.x + speed); break;
    }
    res.json({ success: true });
  } else {
    res.json({ error: 'Player not found' });
  }
});

app.get('/api/gameState', (req, res) => {
  res.json(players);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for Vercel