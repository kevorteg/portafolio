const SnakeApp = {
    title: 'Snake',
    icon: '🐍',
    color: '#22c55e',
    action: () => {
        openApp('snake');
        SnakeGame.init();
    }
};

window.SnakeApp = SnakeApp;
