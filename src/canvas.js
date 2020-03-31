/**
 * canvas.js
 * Classes for instantiating canvas and drawing shapes
 */

// Constants
import CANVAS from 'constants/canvas.json';

const COLORS = ['red', 'oragne', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const EDGE_LENGTH = 50;

// Draws extra set of triangles past maximum index values to hide white space
const RESIZE_BUFFER = 1;

export default class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.iMax =
      2 * (window.innerWidth / EDGE_LENGTH) -
      CANVAS.marginRight +
      RESIZE_BUFFER;
    this.jMax = window.innerHeight / EDGE_LENGTH - CANVAS.marginBottom;
  }

  draw() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.iMax =
      2 * (window.innerWidth / EDGE_LENGTH) -
      CANVAS.marginRight +
      RESIZE_BUFFER;
    this.jMax = window.innerHeight / EDGE_LENGTH - CANVAS.marginBottom;

    if (this.canvas.getContext) {
      for (let j = CANVAS.marginTop; j < this.jMax; j++) {
        for (let i = CANVAS.marginLeft; i < this.iMax; i++) {
          const orientation = (j + i) % 2 ? 'down' : 'up';

          // Draw triangle
          const triangle = new Triangle(i, j, orientation);
          triangle.draw();
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
      this.x =
        (Math.floor(i / 2) + (j % 2)) * EDGE_LENGTH -
        EDGE_LENGTH / 2 ** ((j + 1) % 2);
      this.y = (j + 1) * EDGE_LENGTH;
      this.yCoefficient = -1;
    } else if (orientation === 'down') {
      this.x =
        (Math.floor(i / 2) - 1) * EDGE_LENGTH + EDGE_LENGTH / 2 ** (j % 2);
      this.y = j * EDGE_LENGTH;
      this.yCoefficient = 1;
    }
    this.i = i;
    this.j = j;
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

    // Padding
    if (
      this.i < CANVAS.paddingLeft + CANVAS.marginLeft ||
      this.j < CANVAS.paddingTop + CANVAS.marginTop ||
      this.j >= this.jMax - CANVAS.paddingBottom ||
      this.i >= this.iMax - CANVAS.paddingRight
    ) {
      ctx.fillStyle = 'black';
    } else {
      ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    ctx.fill();
  }
}
