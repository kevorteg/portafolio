let snakeGameInterval;
let snake = [];
let food = {};
let direction = 'right';
let score = 0;
let highScore = localStorage.getItem('kevinos-snake-highscore') || 0;

function renderSnake() {
    const win = document.createElement('div');
    win.id = 'snake-window';
    win.className = 'window';
    win.style.width = '400px';
    win.style.height = '440px';
    win.style.top = '150px';
    win.style.left = '400px';
    win.setAttribute('onmousedown', "focusApp('snake')");

    win.innerHTML = `
        <div class="window-header" onmousedown="dragElement(this.parentElement)">
            <div class="traffic-lights">
                <div class="light light-close" onclick="closeSnake()"><i class="fas fa-times"></i></div>
                <div class="light light-min" onclick="minimizeApp('snake')"><i class="fas fa-minus"></i></div>
                <div class="light light-max" onclick="maximizeApp('snake')"><i class="fas fa-expand"></i></div>
            </div>
            <span style="color:white; font-size:12px; margin-left:10px;">Snake Game</span>
        </div>
        <div class="snake-content" style="background: #222; height: 100%; display: flex; flex-direction:column; align-items: center; justify-content: center;">
            <div style="color:white; margin-bottom: 10px; font-family: monospace; font-size: 14px;">
                Score: <span id="snake-score">0</span> | BEST: <span id="snake-best">${highScore}</span>
            </div>
            <canvas id="snake-canvas" width="300" height="300" style="background: black; border: 2px solid #333;"></canvas>
            <p style="color: #666; font-size: 10px; margin-top: 10px;">Use Arrow Keys to Play</p>
        </div>
    `;

    document.getElementById('windows-container').appendChild(win);
    dragElement(win.querySelector('.window-header'));

    // Controls
    document.addEventListener('keydown', changeDirection);
}

function initGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 10 };
    direction = 'right';
    score = 0;
    if (snakeGameInterval) clearInterval(snakeGameInterval);
    snakeGameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    const canvas = document.getElementById('snake-canvas');
    if (!canvas) return; // Window closed
    const ctx = canvas.getContext('2d');

    // Update Pos
    let head = { ...snake[0] };
    if (direction === 'right') head.x++;
    if (direction === 'left') head.x--;
    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;

    // Collision Wall
    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30) return gameOver();
    // Collision Self
    if (snake.some(s => s.x === head.x && s.y === head.y)) return gameOver();

    snake.unshift(head);

    // Eat Food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('snake-score').innerText = score;
        food = {
            x: Math.floor(Math.random() * 30),
            y: Math.floor(Math.random() * 30)
        };
    } else {
        snake.pop();
    }

    // Draw
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 300, 300);

    ctx.fillStyle = '#0f0';
    snake.forEach(s => ctx.fillRect(s.x * 10, s.y * 10, 9, 9));

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 9, 9);
}

function changeDirection(e) {
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
}

function openSnake() {
    if (!document.getElementById('snake-window')) {
        renderSnake();
    }
    openApp('snake');
    initGame();
}

function gameOver() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('kevinos-snake-highscore', highScore);
    }
    initGame();
}

function closeSnake() {
    clearInterval(snakeGameInterval);
    closeApp('snake');
}
