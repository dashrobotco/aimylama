const socket = io();
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

socket.on('gameState', (players) => {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    if (!canvas) {
        canvas = document.getElementById('game-canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 600;
        setupKeyboardControls();
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const player of players) {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, 50, 50);
        
        ctx.fillStyle = 'black';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(player.name, player.x + 25, player.y + 30);

        if (player.id === socket.id) {
            playerId = player.id;
        }
    }
});

socket.on('serverFull', () => {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('server-full').style.display = 'block';
});

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