// File path: /script.js

let isMouseTrailActive = JSON.parse(localStorage.getItem('mouseTrailActive')) ?? true;
let trailElements = []; // Reusable elements for the trail
const MAX_TRAIL_COUNT = 20; // Limit number of trail elements
const TRAIL_WIDTH = 16; // Match approximate width of the cursor
const TRAIL_HEIGHT = 24; // Match approximate height of the cursor
const FADE_DURATION = 2000; // Trail fade-out duration in ms

const rainbowColors = ['red', 'yellow', 'blue', 'green', 'purple', 'orange']; // Colors to cycle through
let currentColorIndex = 0; // Index to track the current color
let trailIndex = 0; // Track the current trail element to reuse

// Initialize reusable trail elements
function initializeTrailElements() {
    for (let i = 0; i < MAX_TRAIL_COUNT; i++) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        document.body.appendChild(trail);

        // Style the trail elements
        trail.style.position = 'absolute';
        trail.style.width = `${TRAIL_WIDTH}px`;
        trail.style.height = `${TRAIL_HEIGHT}px`;
        trail.style.borderRadius = '0'; // Rectangle shape
        trail.style.opacity = '0'; // Start invisible
        trail.style.pointerEvents = 'none';
        trail.style.transition = `opacity ${FADE_DURATION}ms, background-color 1s`;
        trailElements.push(trail);
    }
}

// Change color every second and fade between colors
function changeTrailColor() {
    currentColorIndex = (currentColorIndex + 1) % rainbowColors.length;
    const newColor = rainbowColors[currentColorIndex];

    trailElements.forEach((trail) => {
        trail.style.backgroundColor = newColor;
    });
}

// Toggle mouse trail functionality
function toggleMouseTrail() {
    isMouseTrailActive = !isMouseTrailActive;
    localStorage.setItem('mouseTrailActive', JSON.stringify(isMouseTrailActive)); // Save state
    const button = document.getElementById('trail-toggle');
    button.innerText = isMouseTrailActive ? 'Disable Mouse Trail' : 'Enable Mouse Trail';

    // Play toggle sound
    playSoundEffect();
}

// Handle mouse movement for the trail effect
document.addEventListener('mousemove', (event) => {
    if (!isMouseTrailActive) return;

    const trail = trailElements[trailIndex];

    // Position the trail at the cursor location
    trail.style.left = `${event.pageX - TRAIL_WIDTH / 2}px`; // Center horizontally
    trail.style.top = `${event.pageY - TRAIL_HEIGHT / 2}px`; // Center vertically

    trail.style.opacity = '1'; // Fade in

    // Fade out the trail after a delay
    setTimeout(() => {
        trail.style.opacity = '0'; // Fade out
    }, FADE_DURATION);

    // Move to the next trail element
    trailIndex = (trailIndex + 1) % MAX_TRAIL_COUNT;
});

// Play a sound effect
function playSoundEffect() {
    const AUDIO_URL = 'https://freesound.org/data/previews/523/523012_8385276-lq.mp3'; // Sound effect URL
    const audio = new Audio(AUDIO_URL);
    audio.volume = 0.5; // Adjust volume as needed
    audio.play();
}

// Initialize the button and trail on page load
window.onload = function () {
    initializeTrailElements();
    const button = document.getElementById('trail-toggle');
    button.innerText = isMouseTrailActive ? 'Disable Mouse Trail' : 'Enable Mouse Trail';

    // Change the trail color every second
    setInterval(changeTrailColor, 1000);
};
