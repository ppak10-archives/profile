/**
 * index.js
 * Entry file for repository
 */

// Styles
import 'styles/main.less';

// Constants
const EDGE_LENGTH = 25;
const COLORS = ['red', 'oragne', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const drawTriangle = (canvas, x, y, orientation) => {
  let yCoefficient = 1;
  if (orientation === 'up') {
    yCoefficient = -1;
  } else if (orientation === 'down') {
    yCoefficient = 1;
  }
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + EDGE_LENGTH, y);
  ctx.lineTo(x + EDGE_LENGTH / 2, y + yCoefficient * EDGE_LENGTH);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
  ctx.stroke();
  ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
  ctx.fill();
};

const intialize = () => {
  const canvas = document.getElementById('background');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const I_MAX = window.innerWidth / EDGE_LENGTH + 1;
  const J_MAX = window.innerHeight / EDGE_LENGTH + 1;

  if (canvas.getContext) {
    for (let j = 0; j < J_MAX; j++) {
      for (let i = 0; i < I_MAX; i++) {
        // Triangles for row A
        const xRowA = i * EDGE_LENGTH - (EDGE_LENGTH / 2) * (j % 2);
        const yRowA = j * EDGE_LENGTH;
        drawTriangle(canvas, xRowA, yRowA, 'down');

        // Triangles for row B
        const xRowB = i * EDGE_LENGTH - EDGE_LENGTH / 2 ** ((j + 1) % 2);
        const yRowB = (j + 1) * EDGE_LENGTH;
        drawTriangle(canvas, xRowB, yRowB, 'up');
      }
    }
  }
};

function draw() {
  const canvas = document.createElement('CANVAS');
  canvas.setAttribute('id', 'background');
  document.body.appendChild(canvas);
  intialize();
  window.addEventListener('resize', intialize);
}

draw();
