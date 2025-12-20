const FileSystem = {
    // Default Structure
    structure: {
        "root": {
            "type": "dir",
            "children": {
                "docs": { "type": "dir", "children": {} },
                "notes": {
                    "type": "dir", "children": {
                        "welcome.txt": { "type": "file", "content": "Bienvenido a KevinOS v5.0.\nEste sistema de archivos es persistente." }
                    }
                },
                "secret.txt": { "type": "file", "content": "Si lees esto, eres curioso. Me agradas." }
            }
        }
    },

    currentPath: "root",

    init: function () {
        const saved = localStorage.getItem('kevinos-fs');
        if (saved) {
            try {
                this.structure = JSON.parse(saved);
            } catch (e) {
                console.error("FS Corrupted, resetting");
                this.save();
            }
        } else {
            this.save();
        }
        console.log("FileSystem Initialized");
    },

    save: function () {
        localStorage.setItem('kevinos-fs', JSON.stringify(this.structure));
    },

    // Get current directory object
    _resolvePath: function (path = this.currentPath) {
        if (path === 'root') return this.structure.root;
        // Simple implementation: flat structure for now or simplified traversal
        // For v5.0 init, let's assume we stay in root or simple subfolders
        // To keep it simple: we only support root interactions for terminal v1
        return this.structure.root;
    },

    listFiles: function () {
        const dir = this._resolvePath();
        if (!dir.children) return [];
        return Object.keys(dir.children).map(name => {
            const item = dir.children[name];
            return { name, type: item.type };
        });
    },

    createFile: function (name, content = "") {
        const dir = this._resolvePath();
        if (dir.children[name]) return false; // Exists
        dir.children[name] = { type: "file", content };
        this.save();
        return true;
    },

    createFolder: function (name) {
        const dir = this._resolvePath();
        if (dir.children[name]) return false;
        dir.children[name] = { type: "dir", children: {} };
        this.save();
        return true;
    },

    readFile: function (name) {
        const dir = this._resolvePath();
        if (!dir.children[name] || dir.children[name].type !== 'file') return null;
        return dir.children[name].content;
    },

    deleteItem: function (name) {
        const dir = this._resolvePath();
        if (!dir.children[name]) return false;
        delete dir.children[name];
        this.save();
        return true;
    }
};

// Auto Init
window.FileSystem = FileSystem;
document.addEventListener('DOMContentLoaded', () => FileSystem.init());
