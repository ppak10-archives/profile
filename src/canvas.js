/**
 * canvas.js
 * Classes for instantiating canvas and drawing shapes
 */

// Constants
const EDGE_LENGTH = 50;
const COLORS = ['red', 'oragne', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export default class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
  }

  draw() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const I_MAX = window.innerWidth / EDGE_LENGTH + 1;
    const J_MAX = window.innerHeight / EDGE_LENGTH + 1;

    if (this.canvas.getContext) {
      for (let j = 0; j < J_MAX; j++) {
        for (let i = 0; i < I_MAX; i++) {
          // Triangles for row A
          const triangleA = new Triangle(i, j, 'down');
          triangleA.draw();

          // Triangles for row B
          const triangleB = new Triangle(i, j, 'up');
          triangleB.draw();
        }
      }
    }
  }

  start() {
    this.draw();
    window.addEventListener('resize', this.draw.bind(this));
  }
}

export class Triangle extends Canvas {
  constructor(i, j, orientation) {
    super(document.getElementById('background'));
    if (orientation === 'up') {
      this.x = i * EDGE_LENGTH - EDGE_LENGTH / 2 ** ((j + 1) % 2);
      this.y = (j + 1) * EDGE_LENGTH;
      this.yCoefficient = -1;
    } else if (orientation === 'down') {
      this.x = i * EDGE_LENGTH - (EDGE_LENGTH / 2) * (j % 2);
      this.y = j * EDGE_LENGTH;
      this.yCoefficient = 1;
    }
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + EDGE_LENGTH, this.y);
    ctx.lineTo(
        this.x + EDGE_LENGTH / 2,
        this.y + this.yCoefficient * EDGE_LENGTH,
    );
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    ctx.stroke();
    ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    ctx.fill();
  }
}
