// DATA DE INÍCIO
const startDate = new Date(2025, 0, 1, 0, 0, 0); 

const audioPlayer = document.getElementById('audioPlayer');
const playIconMain = document.getElementById('play-icon-main');
const introScreen = document.getElementById('intro-screen');
const mainApp = document.getElementById('main-app');
const lyricsContainer = document.getElementById('lyrics-container');
const timerDisplay = document.getElementById('live-timer');
const progressFill = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

function startExperience() {
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainApp.style.display = 'flex';
        audioPlayer.play().then(() => { updatePlayIconState(true); }).catch((e) => { updatePlayIconState(false); });
    }, 500);
}

function togglePlayPause() {
    if (audioPlayer.paused) { audioPlayer.play(); updatePlayIconState(true); } 
    else { audioPlayer.pause(); updatePlayIconState(false); }
}

function updatePlayIconState(isPlaying) {
    playIconMain.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audioPlayer.addEventListener('timeupdate', () => {
    const current = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    if (!isNaN(duration)) {
        const percent = (current / duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeEl.innerText = formatTime(current);
        totalDurationEl.innerText = formatTime(duration);
    }
});

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
        obj.innerHTML = currentVal.toLocaleString();
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