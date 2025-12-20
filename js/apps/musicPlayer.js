const musicData = [
    {
        title: "Lofi Study 1",
        artist: "KevinOS Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Public domain placeholder
        color: "from-purple-500 to-pink-600"
    },
    {
        title: "Synthwave Night",
        artist: "Retro Systems",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        color: "from-cyan-500 to-blue-600"
    },
    {
        title: "Coding Vibes",
        artist: "Null Pointer",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        color: "from-green-400 to-emerald-600"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio();

function initMusicPlayer() {
    renderPlaylist();
    loadTrack(0, false);

    // Viz bars
    const vizContainer = document.getElementById('viz-bars');
    if (vizContainer) {
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'w-2 bg-white/20 rounded-t-sm transition-all duration-100 ease-in-out';
            bar.style.height = '10%';
            vizContainer.appendChild(bar);
        }
        setInterval(updateViz, 100);
    }

    // Audio events
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextTrack);
    audio.addEventListener('loadedmetadata', () => {
        document.getElementById('music-total-time').innerText = formatTime(audio.duration);
    });
}

function renderPlaylist() {
    const list = document.getElementById('playlist-container');
    if (!list) return;

    list.innerHTML = musicData.map((track, index) => `
        <div class="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition group ${index === currentTrackIndex ? 'bg-white/10' : ''}" 
             onclick="loadTrack(${index}, true)">
            <div class="text-xs text-gray-500 w-4">${index + 1}</div>
            <div class="flex-1">
                <div class="text-sm font-bold text-gray-200 group-hover:text-white">${track.title}</div>
                <div class="text-[10px] text-gray-500">${track.artist}</div>
            </div>
            ${index === currentTrackIndex && isPlaying ? '<i class="fas fa-volume-high text-cyan-400 text-xs animate-pulse"></i>' : ''}
        </div>
    `).join('');
}

function loadTrack(index, playNow) {
    currentTrackIndex = index;
    const track = musicData[index];

    audio.src = track.src;
    document.getElementById('music-title').innerText = track.title;
    document.getElementById('music-artist').innerText = track.artist;

    // Update Vinyl Gradient
    const vinyl = document.getElementById('music-vinyl');
    vinyl.className = `w-32 h-32 mx-auto bg-gradient-to-tr ${track.color} rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center mb-4 animate-[spin_10s_linear_infinite]`;
    vinyl.style.animationPlayState = 'paused';

    if (playNow) playTrack();
    renderPlaylist(); // Update active state
}

function togglePlay() {
    if (isPlaying) pauseTrack();
    else playTrack();
}

function playTrack() {
    isPlaying = true;
    audio.play();
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-pause text-xs"></i>';
    document.getElementById('music-vinyl').style.animationPlayState = 'running';
    renderPlaylist();
}

function pauseTrack() {
    isPlaying = false;
    audio.pause();
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-play text-xs"></i>';
    document.getElementById('music-vinyl').style.animationPlayState = 'paused';
    renderPlaylist();
}

function nextTrack() {
    let next = currentTrackIndex + 1;
    if (next >= musicData.length) next = 0;
    loadTrack(next, true);
}

function prevTrack() {
    let prev = currentTrackIndex - 1;
    if (prev < 0) prev = musicData.length - 1;
    loadTrack(prev, true);
}

function updateProgress() {
    const progress = document.getElementById('music-progress');
    const currTime = document.getElementById('music-current-time');
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    currTime.innerText = formatTime(audio.currentTime);
}

function seekMusic(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function formatTime(s) {
    if (isNaN(s)) return "0:00";
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

function updateViz() {
    if (!isPlaying) return;
    const bars = document.querySelectorAll('#viz-bars div');
    bars.forEach(bar => {
        const h = Math.random() * 80 + 10;
        bar.style.height = `${h}%`;
    });
}

document.addEventListener('DOMContentLoaded', initMusicPlayer);
