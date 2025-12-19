// --- CONFIGURATION ---
const birthdayName = "Yoganta";

// --- ELEMENTS ---
const nameElement = document.getElementById('birthday-name');
const celebrateBtn = document.getElementById('celebrate-btn');
const audio = document.getElementById('birthday-tune');
const shinchanImg = document.getElementById('shinchan-img');
const bubbleText = document.getElementById('bubble-text');

// --- ASSETS ---
// Images in the sequence we want to show them
const characterImages = [
    'shinchan_wave.png', // Start
    'shinchan_cool.png', // 1st Click
    'shinchan_heart.png' // 2nd Click
];
let currentImageIndex = 0;

// Messages to cycle through (optional)
const funnyMessages = [
    "Hehehe 😆 <br> Happy Birthday <span class='highlight'>Yoganta</span>!! 🎉",
    " 🎂🎈Smile karti raho 😄<br>Masti karti raho 😜<br>Aur hamesha khush raho 💖✨",
    " 🍕Stay happy and healthy ❤️"
];

// --- CELEBRATION LOGIC ---
const triggerCelebration = () => {
    // 1. Play Audio
    playAudio();

    // 2. Trigger Confetti
    launchCartoonConfetti();

    // 3. Cycle Character Image & Message
    currentImageIndex = (currentImageIndex + 1) % characterImages.length;

    // Animate transition
    shinchanImg.style.transform = "scale(0.1) rotate(360deg)"; // Shrink
    setTimeout(() => {
        shinchanImg.src = characterImages[currentImageIndex];
        shinchanImg.style.transform = "scale(1) rotate(0deg)"; // Pop back

        // Update speech bubble text
        bubbleText.innerHTML = funnyMessages[currentImageIndex];
    }, 300);

    // 4. Change Button Text
    const originalText = celebrateBtn.innerHTML;
    celebrateBtn.innerHTML = "Again! Again! 🔄";
    celebrateBtn.disabled = true;

    setTimeout(() => {
        celebrateBtn.innerHTML = originalText;
        celebrateBtn.disabled = false;
    }, 2000);
};

// Function to handle audio playback
const playAudio = () => {
    if (audio) {
        audio.volume = 0.5;
        // Try to play a random funny sound if available, otherwise just play the track
        audio.currentTime = 0;
        audio.play().catch(console.error);
    }
};

// Function to launch confetti
const launchCartoonConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    // Shinchan colors (Red shirt, yellow shorts, skin tone)
    const colors = ['#ff3f34', '#ffd32a', '#fbc531', '#0be881', '#18dcff'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
            shapes: ['circle', 'square'], // Comic style
            scalar: 1.2
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
            shapes: ['circle', 'square'],
            scalar: 1.2
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
};

// --- EVENT LISTENERS ---
if (celebrateBtn) {
    celebrateBtn.addEventListener('click', triggerCelebration);
}
// --- CLICK POP EFFECT (CUTE!) ---
// Add little sparkles wherever the user clicks
window.addEventListener('click', (e) => {
    // Don't trigger if clicking the button (avoid double effect)
    if (e.target === celebrateBtn) return;

    const sparkle = document.createElement('div');
    sparkle.innerHTML = ['✨', '🌸', '🍭', '⚡', '💫'][Math.floor(Math.random() * 5)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.fontSize = '2rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'popOut 0.8s ease-out forwards';
    sparkle.style.zIndex = '9999';

    document.body.appendChild(sparkle);

    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, 800);
});

// Optional: Add a localized console message
console.log(`Ready to celebrate ${birthdayName}'s birthday! 🎂`);
