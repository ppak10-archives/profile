/**
 * index.js
 * Entry file for repository
 */

// Styles
import 'styles/main.less';

const intialize = () => {
  const canvas = document.getElementById('background');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 250);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
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
