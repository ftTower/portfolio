const canvas = document.getElementById('animated-background');
const ctx = canvas.getContext('2d');

let time = 0;

function createAnimatedGradient(xOffset, yOffset) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width + xOffset, canvas.height + yOffset);
    
    // Dégradé avec des couleurs professionnelles
    gradient.addColorStop(0, '#101726');    // Bleu très foncé
    gradient.addColorStop(0.3, '#1D274A');   // Bleu-violet
    gradient.addColorStop(0.7, '#0C4E7E');   // Bleu plus clair
    gradient.addColorStop(1, '#0C4E7E');     // S'assure que la dernière couleur est la même pour un effet de boucle

    return gradient;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

function animate() {
    // Fait bouger le dégradé très lentement
    const xOffset = Math.sin(time * 0.0005) * 500;
    const yOffset = Math.cos(time * 0.0005) * 500;
    
    const animatedGradient = createAnimatedGradient(xOffset, yOffset);
    
    ctx.fillStyle = animatedGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    time++;
    requestAnimationFrame(animate);
}

resizeCanvas();
animate();