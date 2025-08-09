const canvas = document.getElementById('animated-background');
const ctx = canvas.getContext('2d');
let stars = [];
let maxStars = 500;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createStars() {
  stars = [];
  for (let i = 0; i < maxStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random()
    });
  }
}
createStars();

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();

    // Scintillement aléatoire
    star.alpha += (Math.random() - 0.5) * 0.05;
    if (star.alpha > 1) star.alpha = 1;
    if (star.alpha < 0) star.alpha = 0;
  }
  requestAnimationFrame(animateStars);
}
animateStars();