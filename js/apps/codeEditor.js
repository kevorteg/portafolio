const CodeEditor = {
    currentFile: 'about.js',
    files: {
        'about.js': `const me = {
    name: "Kevin",
    role: "Creative Developer",
    skills: ["JS", "React", "Design"],
    status: "Coding..."
};

console.log("Hello World!");`,
        'style.css': `body {
    background: #000;
    color: #fff;
}

.creative {
    display: flex;
    justify-content: center;
}`,
        'skills.json': `{
    "frontend": ["HTML", "CSS", "JS"],
    "backend": ["Node", "Python"],
    "tools": ["Git", "Figma"]
}`,
        'contact.txt': `Email: contact@kevin.dev
Phone: +00 123 456 789
Location: Cali, Colombia`
    },

    init: () => {
        // Render Files
        const sidebar = document.getElementById('code-sidebar');
        if (!sidebar) return;

        sidebar.innerHTML = Object.keys(CodeEditor.files).map(f => `
            <div class="code-file ${f === CodeEditor.currentFile ? 'active' : ''}" 
                 onclick="CodeEditor.loadFile('${f}')">
                <i class="fas ${CodeEditor.getFileIcon(f)} mr-2 opacity-70"></i> ${f}
            </div>
        `).join('');

        CodeEditor.loadFile(CodeEditor.currentFile);
    },

    loadFile: (filename) => {
        CodeEditor.currentFile = filename;
        const content = CodeEditor.files[filename];
        const editor = document.getElementById('code-content');
        if (editor) editor.innerHTML = CodeEditor.highlight(content, filename);

        // Update active class
        const files = document.querySelectorAll('.code-file');
        files.forEach(el => el.classList.remove('active'));
        // Find the one with text
        files.forEach(el => {
            if (el.innerText.trim() === filename) el.classList.add('active');
        });
    },

    getFileIcon: (filename) => {
        if (filename.endsWith('.js')) return 'fa-js text-yellow-400';
        if (filename.endsWith('.css')) return 'fa-css3 text-blue-400';
        if (filename.endsWith('.json')) return 'fa-code text-green-400';
        return 'fa-file-alt text-gray-400';
    },

    highlight: (code, filename) => {
        // Very basic mock highlighting
        let html = code
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/(".*?")/g, '<span style="color: #ce9178;">$1</span>')
            .replace(/\b(const|let|var|function|return|class)\b/g, '<span style="color: #569cd6;">$1</span>')
            .replace(/\b(console|log|document|window)\b/g, '<span style="color: #4ec9b0;">$1</span>')
            .replace(/(\{|\}|\(|\)|\[|\])/g, '<span style="color: #ffd700;">$1</span>');

        return `<pre style="font-family: 'Fira Code', monospace; line-height: 1.5;">${html}</pre>`;
    }
};
