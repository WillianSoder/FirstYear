// DATA DE INÍCIO
const startDate = new Date(2025, 0, 1, 0, 0, 0); 

// === LISTA DE MÚSICAS (PLAYLIST) ===
const playlist = [
    {
        title: "Feliz 1º ano",
        artist: "365 dias de nós",
        cover: "beijo.jpg",
        file: "musica.mp3"
    },
    {
        title: "Nossa Jornada",
        artist: "Momentos Inesquecíveis",
        cover: "foto4.jpg",
        file: "musica2.mp3"
    },
    {
        title: "Amor Infinito",
        artist: "Eu & Você",
        cover: "foto2.jpg",
        file: "musica3.mp3"
    }
];

let currentSongIndex = 0; // Começa na primeira música

const audioPlayer = document.getElementById('audioPlayer');
const playIconMain = document.getElementById('play-icon-main');
const introScreen = document.getElementById('intro-screen');
const mainApp = document.getElementById('main-app');
const lyricsContainer = document.getElementById('lyrics-container');
const timerDisplay = document.getElementById('live-timer');
const progressFill = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

// Elementos da interface do player que vão mudar
const trackTitleEl = document.getElementById('track-title');
const artistNameEl = document.getElementById('artist-name');
const albumCoverEl = document.getElementById('album-cover');

// Função para Carregar a música
function loadSong(index) {
    const song = playlist[index];
    audioPlayer.src = song.file;
    trackTitleEl.innerText = song.title;
    artistNameEl.innerText = song.artist;
    albumCoverEl.src = song.cover;
    
    // Resetar barra de progresso visualmente
    progressFill.style.width = '0%';
    currentTimeEl.innerText = "0:00";
    // O total duration será atualizado automaticamente pelo evento 'loadedmetadata'
}

// Carrega a primeira música ao iniciar o script (mas não toca ainda)
loadSong(currentSongIndex);

function startExperience() {
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainApp.style.display = 'flex';
        // Tenta tocar a música atual
        audioPlayer.play().then(() => { updatePlayIconState(true); }).catch((e) => { updatePlayIconState(false); });
    }, 500);
}

function togglePlayPause() {
    if (audioPlayer.paused) { 
        audioPlayer.play(); 
        updatePlayIconState(true); 
    } else { 
        audioPlayer.pause(); 
        updatePlayIconState(false); 
    }
}

function updatePlayIconState(isPlaying) {
    playIconMain.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

// === FUNÇÕES DE NAVEGAÇÃO (AVANÇAR / VOLTAR) ===

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > playlist.length - 1) {
        currentSongIndex = 0; // Volta para a primeira se acabar
    }
    loadSong(currentSongIndex);
    audioPlayer.play();
    updatePlayIconState(true);
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1; // Vai para a última se estiver na primeira
    }
    loadSong(currentSongIndex);
    audioPlayer.play();
    updatePlayIconState(true);
}

// Avançar automaticamente quando a música acabar
audioPlayer.addEventListener('ended', nextSong);

// === CONTROLES DE TEMPO E BARRA ===

function formatTime(seconds) {
    if(isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audioPlayer.addEventListener('timeupdate', () => {
    const current = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    if (!isNaN(duration) && duration > 0) {
        const percent = (current / duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeEl.innerText = formatTime(current);
        // Garante que o total esteja correto caso o carregamento tenha atrasado
        totalDurationEl.innerText = formatTime(duration);
    }
});

// Quando a música carrega os metadados (duração), atualiza o texto de tempo total
audioPlayer.addEventListener('loadedmetadata', () => {
    totalDurationEl.innerText = formatTime(audioPlayer.duration);
});

function toggleLyrics() {
    lyricsContainer.classList.toggle('expanded');
    const btn = document.querySelector('.show-more-lyrics-btn');
    btn.textContent = lyricsContainer.classList.contains('expanded') ? "MOSTRAR MENOS" : "MOSTRAR MAIS";
}

function updateTimer() {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) { months--; const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate(); days += prevMonthLastDay; }
    if (months < 0) { months += 12; years--; }

    const formattedTime = `${years} anos, ${months} meses, ${days} dias\n${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
    timerDisplay.innerText = formattedTime;
}
setInterval(updateTimer, 1000);
updateTimer();

/* --- DAILY MIX & TICKET --- */

// Daily Mix do Amor
const reasons = [
    "O jeito que você sorri ao me ver.",
    "Nossas conversas sobre futuro.",
    "Seu abraço é meu lugar seguro.",
    "Você me inspira a ser melhor.",
    "Amo o som da sua risada.",
    "Seu cabelo cacheado.",
    "Sua boquinha linda.",
    "Sua determinação.",
    "Você faz eu me sentir homem.",
    "Seu cheirinho que fica na minha roupa.",
    "Como você me apoia em tudo.",
    "Nossos planos para o futuro.",
    "Até o seu mau humor é fofo (às vezes).",
    "Simplesmente por você existir."
];

function showReason() {
    const textEl = document.getElementById('reason-text');
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    textEl.style.opacity = 0;
    setTimeout(() => {
        textEl.innerText = randomReason;
        textEl.style.opacity = 1;
    }, 200);
}

// Lógica do Ticket Modal
function openTicket() {
    const modal = document.getElementById('ticket-modal');
    modal.style.display = 'flex';
}

function closeTicket() {
    const modal = document.getElementById('ticket-modal');
    modal.style.display = 'none';
}

/* --- FUNÇÕES NOVAS: CRÉDITOS --- */
function toggleCredits() {
    const details = document.querySelector('.credits-details');
    const label = document.querySelector('.show-credits');
    if(details.style.display === 'none') {
        details.style.display = 'block';
        label.innerText = 'Ocultar';
    } else {
        details.style.display = 'none';
        label.innerText = 'Exibir';
    }
}

// RETROSPECTIVA
let currentSlide = 1;
const totalSlides = 9; 

function openWrapped() {
    document.getElementById('wrapped-overlay').style.display = 'flex';
    calculateTotalHours();
    showSlide(1);
}

function closeWrapped() {
    document.getElementById('wrapped-overlay').style.display = 'none';
}

function calculateTotalHours() {
    const now = new Date();
    const diffMs = now - startDate;
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    document.getElementById('total-hours').setAttribute('data-final-value', totalHours);
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuad = (t) => t * (2 - t); 
        let currentVal = Math.floor(easeOutQuad(progress) * (end - start) + start);
        obj.innerHTML = currentVal.toLocaleString() + (obj.id === 'match-percent' ? '%' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.classList.remove('animating');
        }
    };
    obj.classList.add('animating');
    window.requestAnimationFrame(step);
}

function showSlide(slideIndex) {
    for (let i = 1; i <= totalSlides; i++) {
        document.getElementById(`slide-${i}`).classList.remove('active');
        const bar = document.getElementById(`bar-${i}`);
        bar.style.width = '0%';
        bar.classList.remove('finished');
    }

    const currentSlideEl = document.getElementById(`slide-${slideIndex}`);
    currentSlideEl.classList.add('active');
    currentSlide = slideIndex;

    if (slideIndex === 1) {
        const hoursEl = document.getElementById('total-hours');
        const finalValue = parseInt(hoursEl.getAttribute('data-final-value'));
        animateValue(hoursEl, 0, finalValue, 2500);
    }

    for (let i = 1; i < slideIndex; i++) {
        document.getElementById(`bar-${i}`).classList.add('finished');
        document.getElementById(`bar-${i}`).style.width = '100%';
    }
    
    setTimeout(() => {
        document.getElementById(`bar-${slideIndex}`).style.width = '100%';
    }, 50);
}

function nextSlide() {
    if (currentSlide < totalSlides) { showSlide(currentSlide + 1); } else { closeWrapped(); }
}

function prevSlide() {
    if (currentSlide > 1) { showSlide(currentSlide - 1); }
}

/* --- ANIMAÇÃO DO MATCH --- */
const matchObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            document.getElementById('match-fill').style.width = '999%'; 
            animateValue(document.getElementById('match-percent'), 0, 999, 2000);
            matchObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const matchCard = document.querySelector('.match-card');
    if(matchCard) matchObserver.observe(matchCard);
});