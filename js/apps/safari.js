const Safari = {
    currentUrl: 'https://kevin.dev',
    // These could be your real projects
    favorites: [
        { name: 'Github', url: 'https://github.com', icon: 'fa-github' },
        { name: 'Portfolio', url: 'index.html', icon: 'fa-user' },
        { name: 'Google', url: 'https://google.com', icon: 'fa-google' },
        { name: 'Dribbble', url: 'https://dribbble.com', icon: 'fa-basketball-ball' }
    ],

    open: (url) => {
        openApp('safari');
        const input = document.getElementById('safari-url-input');
        const content = document.getElementById('safari-content-area');

        if (input && url) input.value = url;

        if (url) {
            if (content) content.innerHTML = `<iframe src="${url}" class="w-full h-full border-none bg-white"></iframe>`;
        } else {
            Safari.renderHome();
        }
    },

    go: () => {
        const input = document.getElementById('safari-url-input');
        if (input) Safari.open(input.value);
    },

    renderHome: () => {
        const content = document.getElementById('safari-content-area');
        if (!content) return;

        let grid = Safari.favorites.map(site => `
            <div class="flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-100 p-4 rounded-xl transition"
                 onclick="Safari.open('${site.url}')">
                <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-3xl text-gray-600">
                    <i class="fab ${site.icon}"></i>
                </div>
                <span class="text-xs font-medium text-gray-600">${site.name}</span>
            </div>
        `).join('');

        content.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full">
                <h1 class="text-4xl font-bold text-gray-300 mb-10">Favoritos</h1>
                <div class="grid grid-cols-4 gap-8">
                    ${grid}
                </div>
            </div>
        `;
    }
};
