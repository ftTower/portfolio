const canvas = document.getElementById('animated-background');
const ctx = canvas.getContext('2d');
let frame = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawWaves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#1E3A8A'); // Bleu foncé
  gradient.addColorStop(1, '#60A5FA'); // Bleu clair

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);

  for (let i = 0; i <= canvas.width; i += 20) {
    let y = Math.sin(i * 0.01 + frame) * 50 + canvas.height / 2;
    ctx.lineTo(i, y);
  }

  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();
  
  frame += 0.01;
  requestAnimationFrame(drawWaves);
}
drawWaves();