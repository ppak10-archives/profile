/**
 * triangle.js
 * Function for drawing triangle element
 */

// Constants
import TRIANGLE from 'constants/triangle.json';

export default class Triangle {
  constructor(canvas, i, j, orientation, optionsParams = {}) {
    this.canvas = canvas;
    if (orientation === 'up') {
      this.x =
        (Math.floor(i / 2) + (j % 2)) * TRIANGLE.height -
        TRIANGLE.height / 2 ** ((j + 1) % 2);
      this.y = (j + 1) * TRIANGLE.height;
      this.yCoefficient = -1;
    } else if (orientation === 'down') {
      this.x =
        (Math.floor(i / 2) - 1) * TRIANGLE.height +
        TRIANGLE.height / 2 ** (j % 2);
      this.y = j * TRIANGLE.height;
      this.yCoefficient = 1;
    }
    this.i = i;
    this.j = j;

    this.options = {
      ...TRIANGLE,
      ...optionsParams,
    };
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + TRIANGLE.height, this.y);
    ctx.lineTo(
        this.x + TRIANGLE.height / 2,
        this.y + this.yCoefficient * TRIANGLE.height,
    );
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.lineWidth = this.options.lineWidth;
    ctx.strokeStyle = this.options.strokeStyle;
    ctx.fillStyle = this.options.fillStyle;
    ctx.fill();
    ctx.stroke();
  }
}
