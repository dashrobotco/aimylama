let playerId;
let gameLoop;

document.getElementById('play-button').addEventListener('click', async () => {
    const playerName = document.getElementById('player-name').value.trim();
    if (playerName) {
        const response = await fetch(`/api/join?name=${encodeURIComponent(playerName)}`);
        const data = await response.json();
        if (data.error) {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('server-full').style.display = 'block';
        } else {
            playerId = data.id;
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('game-screen').style.display = 'block';
            startGame();
        }
    }
});

function startGame() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    document.addEventListener('keydown', handleKeyPress);

    gameLoop = setInterval(async () => {
        const response = await fetch('/api/gameState');
        const players = await response.json();
        updateGame(ctx, players);
    }, 1000 / 30);  // 30 FPS
}

function handleKeyPress(event) {
    let direction = null;
    switch (event.key) {
        case 'ArrowUp':
        case 'w': direction = 'up'; break;
        case 'ArrowDown':
        case 's': direction = 'down'; break;
        case 'ArrowLeft':
        case 'a': direction = 'left'; break;
        case 'ArrowRight':
        case 'd': direction = 'right'; break;
    }
    if (direction) {
        fetch(`/api/move?id=${playerId}&direction=${direction}`);
    }
}

function updateGame(ctx, players) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    players.forEach(player => {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, 50, 50);
        ctx.fillStyle = 'black';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(player.name, player.x + 25, player.y + 30);
    });
}