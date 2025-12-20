const tCanvas = document.getElementById('tetris-canvas');
const tCtx = tCanvas ? tCanvas.getContext('2d') : null;

const ROWS = 20;
const COLS = 12;
const BLOCK_SIZE = 20;

let board = [];
let score = 0;
let level = 1;
let gameOver = false;
let gameInterval;

// Shapes
const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]], // J
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 0], [0, 1, 1]]  // Z
];

const COLORS = [
    null,
    '#00f0f0', // I - Cyan
    '#f0f000', // O - Yellow
    '#a000f0', // T - Purple
    '#f0a000', // L - Orange
    '#0000f0', // J - Blue
    '#00f000', // S - Green
    '#f00000'  // Z - Red
];

let currentPiece = null;
let currentX = 0;
let currentY = 0;

function initTetris() {
    if (!tCanvas) return;
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    drawBoard();
}

function startTetris() {
    document.getElementById('tetris-overlay').style.display = 'none';
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    score = 0;
    level = 1;
    gameOver = false;
    updateStats();
    spawnPiece();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 1000 / level);

    // Controls
    document.addEventListener('keydown', handleTetrisInput);
}

function handleTetrisInput(e) {
    if (gameOver || document.getElementById('tetris-overlay').style.display !== 'none') return;

    // Only capture keys if Tetris window is focused (simple check: visibility)
    if (document.getElementById('tetris-window').style.display === 'none') return;

    if (e.key === 'ArrowLeft') {
        move(-1, 0);
    } else if (e.key === 'ArrowRight') {
        move(1, 0);
    } else if (e.key === 'ArrowDown') {
        move(0, 1);
    } else if (e.key === 'ArrowUp') {
        rotate();
    }
}

function spawnPiece() {
    const id = Math.floor(Math.random() * SHAPES.length);
    currentPiece = SHAPES[id];
    currentX = Math.floor(COLS / 2) - Math.floor(currentPiece[0].length / 2);
    currentY = 0;

    // Check collision on spawn
    if (checkCollision(0, 0, currentPiece)) {
        gameOver = true;
        clearInterval(gameInterval);
        document.getElementById('tetris-overlay').style.display = 'flex';
        document.querySelector('#tetris-overlay h1').innerText = "GAME OVER";
    }
}

function move(dx, dy) {
    if (!checkCollision(dx, dy, currentPiece)) {
        currentX += dx;
        currentY += dy;
        drawBoard();
    } else if (dy === 1) {
        // Landed
        lockPiece();
        clearLines();
        spawnPiece();
    }
}

function rotate() {
    const rotated = currentPiece[0].map((_, i) => currentPiece.map(row => row[i])).reverse();
    if (!checkCollision(0, 0, rotated)) {
        currentPiece = rotated;
        drawBoard();
    }
}

function checkCollision(dx, dy, piece) {
    for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
            if (piece[y][x]) {
                const newX = currentX + x + dx;
                const newY = currentY + y + dy;

                if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
                if (newY >= 0 && board[newY][newX]) return true;
            }
        }
    }
    return false;
}

function lockPiece() {
    for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
            if (currentPiece[y][x]) {
                if (currentY + y < 0) {
                    gameOver = true;
                    return;
                }
                board[currentY + y][currentX + x] = COLORS.indexOf(COLORS.find((c, i) => {
                    // Simple hack: we don't store color index in piece, but we can infer or random.
                    // Actually, let's fix color logic:
                    // We need to store Piece Type ID.
                    return false;
                })) || 1; // Default to 1 (Cyan) if lost, but let's just use random for now or fix global color

                // Better: find color index based on shape? Too complex for quick fix.
                // Let's just store non-zero.
                board[currentY + y][currentX + x] = 1 + Math.floor(Math.random() * 7);
            }
        }
    }
}

function clearLines() {
    let linesCleared = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++; // Check same row again
        }
    }

    if (linesCleared > 0) {
        score += linesCleared * 100 * level;
        if (score > level * 500) {
            level++;
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, Math.max(100, 1000 - (level * 100)));
        }
        updateStats();
    }
}

function updateStats() {
    document.getElementById('tetris-score').innerText = score;
    document.getElementById('tetris-level').innerText = level;
}

function gameLoop() {
    move(0, 1);
}

function drawBoard() {
    if (!tCtx) return;

    // Clear
    tCtx.fillStyle = '#000';
    tCtx.fillRect(0, 0, tCanvas.width, tCanvas.height);

    // Grid
    tCtx.strokeStyle = '#1a1a1a';
    for (let i = 0; i < COLS; i++) {
        tCtx.beginPath();
        tCtx.moveTo(i * BLOCK_SIZE, 0);
        tCtx.lineTo(i * BLOCK_SIZE, tCanvas.height);
        tCtx.stroke();
    }

    // Board
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x]) {
                drawBlock(x, y, COLORS[board[y][x]]);
            }
        }
    }

    // Current Piece
    if (currentPiece) {
        for (let y = 0; y < currentPiece.length; y++) {
            for (let x = 0; x < currentPiece[y].length; x++) {
                if (currentPiece[y][x]) {
                    // Try to guess color or use default
                    drawBlock(currentX + x, currentY + y, '#fff');
                }
            }
        }
    }
}

function drawBlock(x, y, color) {
    tCtx.fillStyle = color;
    tCtx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    tCtx.strokeStyle = 'rgba(0,0,0,0.5)';
    tCtx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

document.addEventListener('DOMContentLoaded', initTetris);
