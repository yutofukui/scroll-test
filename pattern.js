const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);


const shapes = [];
const shapeCount = 120;
const colors = ['#00f5d4', '#00bbf9', '#8338ec', '#ff006e', '#ffbe0b'];

for (let i = 0; i < shapeCount; i++) {
  shapes.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * 5000,
    size: 10 + Math.random() * 100,
    type: Math.random() > 0.5 ? 'circle' : 'triangle',
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

function drawShapes(offsetY = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shapes.forEach(shape => {
    const screenY = shape.y - offsetY;
    if (screenY < -50 || screenY > canvas.height + 50) return; // 範囲外は非表示

    ctx.fillStyle = shape.color;
    ctx.beginPath();

    if (shape.type === 'circle') {
      ctx.arc(shape.x, screenY, shape.size / 2, 0, Math.PI * 2);
    } else if (shape.type === 'triangle') {
      ctx.moveTo(shape.x, screenY - shape.size / 2);
      ctx.lineTo(shape.x - shape.size / 2, screenY + shape.size / 2);
      ctx.lineTo(shape.x + shape.size / 2, screenY + shape.size / 2);
      ctx.closePath();
    }

    ctx.fill();
  });
}

function updatePatternScroll(scrollY) {
  drawShapes(scrollY);
}