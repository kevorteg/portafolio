// Pong Game Logic
let pongGame = {
    canvas: null,
    ctx: null,
    ball: { x: 0, y: 0, dx: 4, dy: 4, size: 10 },
    paddleHeight: 80,
    paddleWidth: 10,
    playerY: 0,
    aiY: 0,
    score: { player: 0, ai: 0 },
    interval: null,
    isRunning: false
};

function initPong() {
    pongGame.canvas = document.getElementById('pong-canvas');
    if (!pongGame.canvas) return;
    pongGame.ctx = pongGame.canvas.getContext('2d');

    // Reset State
    pongGame.ball.x = pongGame.canvas.width / 2;
    pongGame.ball.y = pongGame.canvas.height / 2;
    pongGame.playerY = (pongGame.canvas.height - pongGame.paddleHeight) / 2;
    pongGame.aiY = (pongGame.canvas.height - pongGame.paddleHeight) / 2;
    pongGame.score = { player: 0, ai: 0 };

    // Listeners
    pongGame.canvas.addEventListener('mousemove', (e) => {
        const rect = pongGame.canvas.getBoundingClientRect();
        const root = document.documentElement;
        let mouseY = e.clientY - rect.top - root.scrollTop;

        // Center paddle on mouse
        pongGame.playerY = mouseY - (pongGame.paddleHeight / 2);
    });

    // Start Loop
    clearInterval(pongGame.interval);
    pongGame.isRunning = true;
    pongGame.interval = setInterval(updatePong, 1000 / 60);
}

function updatePong() {
    if (!pongGame.isRunning) return;

    // Move Ball
    pongGame.ball.x += pongGame.ball.dx;
    pongGame.ball.y += pongGame.ball.dy;

    // AI Movement (Simple tracking)
    const aiCenter = pongGame.aiY + (pongGame.paddleHeight / 2);
    if (aiCenter < pongGame.ball.y - 35) pongGame.aiY += 3;
    else if (aiCenter > pongGame.ball.y + 35) pongGame.aiY -= 3;

    // Wall Collision (Top/Bottom)
    if (pongGame.ball.y < 0 || pongGame.ball.y > pongGame.canvas.height) {
        pongGame.ball.dy *= -1;
    }

    // Paddle Collision
    // Player (Left)
    if (pongGame.ball.x < pongGame.paddleWidth) {
        if (pongGame.ball.y > pongGame.playerY && pongGame.ball.y < pongGame.playerY + pongGame.paddleHeight) {
            pongGame.ball.dx *= -1;
            // Speed up slightly
            pongGame.ball.dx = pongGame.ball.dx > 0 ? pongGame.ball.dx + 0.5 : pongGame.ball.dx - 0.5;
        } else if (pongGame.ball.x < 0) {
            // AI Point
            pongGame.score.ai++;
            resetBall();
        }
    }
    // AI (Right)
    if (pongGame.ball.x > pongGame.canvas.width - pongGame.paddleWidth) {
        if (pongGame.ball.y > pongGame.aiY && pongGame.ball.y < pongGame.aiY + pongGame.paddleHeight) {
            pongGame.ball.dx *= -1;
        } else if (pongGame.ball.x > pongGame.canvas.width) {
            // Player Point
            pongGame.score.player++;
            resetBall();
        }
    }

    drawPong();
}

function drawPong() {
    // Clear
    pongGame.ctx.fillStyle = 'black';
    pongGame.ctx.fillRect(0, 0, pongGame.canvas.width, pongGame.canvas.height);

    // Net
    pongGame.ctx.fillStyle = 'white';
    for (let i = 0; i < pongGame.canvas.height; i += 40) {
        pongGame.ctx.fillRect(pongGame.canvas.width / 2 - 1, i, 2, 20);
    }

    // Paddles
    pongGame.ctx.fillRect(0, pongGame.playerY, pongGame.paddleWidth, pongGame.paddleHeight); // Player
    pongGame.ctx.fillRect(pongGame.canvas.width - pongGame.paddleWidth, pongGame.aiY, pongGame.paddleWidth, pongGame.paddleHeight); // AI

    // Ball
    pongGame.ctx.beginPath();
    pongGame.ctx.arc(pongGame.ball.x, pongGame.ball.y, pongGame.ball.size, 0, Math.PI * 2);
    pongGame.ctx.fill();

    // Score
    pongGame.ctx.font = "30px Consolas, monospace";
    pongGame.ctx.fillText(pongGame.score.player, pongGame.canvas.width / 4, 50);
    pongGame.ctx.fillText(pongGame.score.ai, 3 * pongGame.canvas.width / 4, 50);
}

function resetBall() {
    pongGame.ball.x = pongGame.canvas.width / 2;
    pongGame.ball.y = pongGame.canvas.height / 2;
    pongGame.ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    pongGame.ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function openPong() {
    if (!document.getElementById('pong-window')) return; // Check if exists in DOM
    openApp('pong');
    setTimeout(initPong, 100);
}

function closePong() {
    pongGame.isRunning = false;
    clearInterval(pongGame.interval);
    closeApp('pong');
}
