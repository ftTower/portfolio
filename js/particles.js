const canvas = document.getElementById('animated-background');
const ctx = canvas.getContext('2d');

let time = 0;
const particles = [];
const particleCount = 50; // Increased particle count
const connectionDistance = 150; // Increased connection distance

// Fonction pour créer un dégradé animé
function createAnimatedGradient(xOffset, yOffset) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width + xOffset, canvas.height + yOffset);
    gradient.addColorStop(0, '#0D1117');
    gradient.addColorStop(0.3, '#005F73');
    gradient.addColorStop(0.7, '#00C896');
    gradient.addColorStop(1, '#00C896');
    return gradient;
}

// Fonction pour redimensionner le canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-initialize particles when canvas is resized
    particles.length = 0;
    initParticles();
}
window.addEventListener('resize', resizeCanvas);

// Classe pour gérer les particules lumineuses
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 4 + 1; // Slightly bigger particles
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = `rgba(0, 200, 150, ${Math.random() * 0.8 + 0.2})`;
        // Add pulsing effect
        this.baseRadius = this.radius;
        this.pulseSpeed = Math.random() * 0.05 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen instead of bouncing
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // Pulsing effect
        this.radius = this.baseRadius + Math.sin(time * this.pulseSpeed + this.pulseOffset) * (this.baseRadius * 0.3);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.closePath();
    }
}

// Dessine des lignes entre les particules proches
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionDistance) {
                const opacity = 1 - distance / connectionDistance;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 200, 150, ${opacity * 0.4})`; // Slightly more visible connections
                ctx.lineWidth = 1.5 * opacity; // Variable line width
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Initialiser les particules
function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Fonction d'animation
function animate() {
    // Calcul des décalages pour le gradient animé
    const xOffset = Math.sin(time * 0.0003) * 600; // Slower, more dramatic gradient movement
    const yOffset = Math.cos(time * 0.0004) * 600;
    const animatedGradient = createAnimatedGradient(xOffset, yOffset);

    // Appliquer l'effet de flou sur le fond
    ctx.filter = 'blur(10px)'; // Increased blur
    ctx.fillStyle = animatedGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Réinitialiser le filtre pour dessiner les particules et les lignes
    ctx.filter = 'none';

    // Ajout d'une couche semi-transparente pour l'effet de verre
    ctx.fillStyle = 'rgba(13, 17, 23, 0.15)'; // Slightly more opaque for better contrast
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner les connexions entre particules proches
    drawConnections();
    
    // Mise à jour et dessin des particules
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    time++;
    requestAnimationFrame(animate);
}

resizeCanvas();
initParticles();
animate();