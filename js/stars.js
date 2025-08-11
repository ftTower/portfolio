const canvas = document.getElementById('animated-background');
const ctx = canvas.getContext('2d');
let stars = [];
let maxStars = 500;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createStars() {
  stars = [];
  for (let i = 0; i < maxStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      alphaSpeed: (Math.random() - 0.5) * 0.01,
      dx: (Math.random() - 0.5) * 0.02,
      dy: (Math.random() - 0.5) * 0.02
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    // Mouvement lent
    star.x += star.dx;
    star.y += star.dy;

    // Repositionner si hors écran
    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    // Scintillement fluide
    star.alpha += star.alphaSpeed;
    if (star.alpha > 1) {
      star.alpha = 1;
      star.alphaSpeed *= -1;
    }
    if (star.alpha < 0.2) {
      star.alpha = 0.2;
      star.alphaSpeed *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(animateStars);
}
animateStars();