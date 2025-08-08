const canvas = document.getElementById('animated-background');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 180 };

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2; // Très lent
        this.vy = (Math.random() - 0.5) * 0.2;
        this.color = 'rgba(150, 150, 150, 0.4)';
        this.activeColor = 'rgba(0, 255, 255, 0.8)';
        this.radius = 0.8;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            // Ralentit et change de couleur
            let factor = (mouse.radius - distance) / mouse.radius;
            this.x += this.vx * (1 - factor);
            this.y += this.vy * (1 - factor);
            this.color = `rgba(0, 255, 255, ${0.4 + factor * 0.6})`;
        } else {
            // Mouvement normal
            this.x += this.vx;
            this.y += this.vy;
            this.color = 'rgba(150, 150, 150, 0.4)';
        }

        // Boucle les particules à l'écran
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 150; i++) { // Moins de particules
        particles.push(new Particle());
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function animate() {
    // Effet de traînée très subtil
    ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }
    
    requestAnimationFrame(animate);
}

resizeCanvas();
animate();