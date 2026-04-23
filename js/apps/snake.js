const SnakeGame = {
    canvas: null,
    ctx: null,
    box: 20,
    snake: [],
    food: {},
    score: 0,
    gameInterval: null,
    direction: 'RIGHT',
    isPaused: false,
    speed: 150,

    init: () => {
        SnakeGame.canvas = document.getElementById('snake-canvas');
        if (!SnakeGame.canvas) return;
        SnakeGame.ctx = SnakeGame.canvas.getContext('2d');
        
        // Reset state
        SnakeGame.snake = [{ x: 9 * SnakeGame.box, y: 10 * SnakeGame.box }];
        SnakeGame.score = 0;
        SnakeGame.highScore = localStorage.getItem('snake-high-score') || 0;
        SnakeGame.direction = 'RIGHT';
        SnakeGame.speed = 150;
        SnakeGame.isPaused = false;
        
        document.getElementById('snake-score').innerText = SnakeGame.score;
        const hsElem = document.getElementById('snake-high-score');
        if(hsElem) hsElem.innerText = SnakeGame.highScore;

        SnakeGame.spawnFood();
        
        if (SnakeGame.gameInterval) clearInterval(SnakeGame.gameInterval);
        SnakeGame.gameInterval = setInterval(SnakeGame.draw, SnakeGame.speed);
        
        document.addEventListener('keydown', SnakeGame.handleKey);
    },

    spawnFood: () => {
        SnakeGame.food = {
            x: Math.floor(Math.random() * 19 + 1) * SnakeGame.box,
            y: Math.floor(Math.random() * 19 + 1) * SnakeGame.box
        };
    },

    handleKey: (e) => {
        if (e.keyCode === 37 && SnakeGame.direction !== 'RIGHT') SnakeGame.direction = 'LEFT';
        else if (e.keyCode === 38 && SnakeGame.direction !== 'DOWN') SnakeGame.direction = 'UP';
        else if (e.keyCode === 39 && SnakeGame.direction !== 'LEFT') SnakeGame.direction = 'RIGHT';
        else if (e.keyCode === 40 && SnakeGame.direction !== 'UP') SnakeGame.direction = 'DOWN';
    },

    draw: () => {
        if (SnakeGame.isPaused) return;

        const ctx = SnakeGame.ctx;
        const box = SnakeGame.box;

        // Background (Neon Grid)
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, SnakeGame.canvas.width, SnakeGame.canvas.height);
        
        // Grid lines (subtle)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        for(let i=0; i<SnakeGame.canvas.width; i+=box) {
            ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,400); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(400,i); ctx.stroke();
        }

        // Draw Snake
        for (let i = 0; i < SnakeGame.snake.length; i++) {
            ctx.fillStyle = (i === 0) ? '#3b82f6' : '#60a5fa';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#3b82f6';
            ctx.fillRect(SnakeGame.snake[i].x, SnakeGame.snake[i].y, box, box);
            ctx.shadowBlur = 0;
            
            // Border
            ctx.strokeStyle = '#1e3a8a';
            ctx.strokeRect(SnakeGame.snake[i].x, SnakeGame.snake[i].y, box, box);
        }

        // Draw Food (Glow effect)
        ctx.fillStyle = '#f43f5e';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#f43f5e';
        ctx.beginPath();
        ctx.arc(SnakeGame.food.x + box/2, SnakeGame.food.y + box/2, box/2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Old head position
        let snakeX = SnakeGame.snake[0].x;
        let snakeY = SnakeGame.snake[0].y;

        // Direction
        if (SnakeGame.direction === 'LEFT') snakeX -= box;
        if (SnakeGame.direction === 'UP') snakeY -= box;
        if (SnakeGame.direction === 'RIGHT') snakeX += box;
        if (SnakeGame.direction === 'DOWN') snakeY += box;

        // Check if snake eats food
        if (snakeX === SnakeGame.food.x && snakeY === SnakeGame.food.y) {
            SnakeGame.score++;
            SnakeGame.spawnFood();
            // Increase speed slightly
            if (SnakeGame.speed > 50) {
                clearInterval(SnakeGame.gameInterval);
                SnakeGame.speed -= 2;
                SnakeGame.gameInterval = setInterval(SnakeGame.draw, SnakeGame.speed);
            }
            document.getElementById('snake-score').innerText = SnakeGame.score;
            if (SnakeGame.score > SnakeGame.highScore) {
                SnakeGame.highScore = SnakeGame.score;
                localStorage.setItem('snake-high-score', SnakeGame.highScore);
                const hsElem = document.getElementById('snake-high-score');
                if(hsElem) hsElem.innerText = SnakeGame.highScore;
            }
        } else {
            SnakeGame.snake.pop();
        }

        // New head
        let newHead = { x: snakeX, y: snakeY };

        // Game Over
        if (snakeX < 0 || snakeX >= SnakeGame.canvas.width || snakeY < 0 || snakeY >= SnakeGame.canvas.height || SnakeGame.collision(newHead, SnakeGame.snake)) {
            clearInterval(SnakeGame.gameInterval);
            SnakeGame.gameOver();
        }

        SnakeGame.snake.unshift(newHead);
    },

    collision: (head, array) => {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) return true;
        }
        return false;
    },

    gameOver: () => {
        const ctx = SnakeGame.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, SnakeGame.canvas.width, SnakeGame.canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '30px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', 200, 180);
        
        ctx.font = '16px Inter, sans-serif';
        ctx.fillText('¡Nuevo Récord!', 200, 220);
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText('Presiona REINICIAR para jugar de nuevo', 200, 250);
    },

    close: () => {
        clearInterval(SnakeGame.gameInterval);
        document.removeEventListener('keydown', SnakeGame.handleKey);
    }
};

window.SnakeGame = SnakeGame;
