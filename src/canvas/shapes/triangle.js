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
        (Math.floor(i / 2) + (j % 2)) * TRIANGLE.base -
        TRIANGLE.base / 2 ** ((j + 1) % 2);
      this.y = (j + 1) * TRIANGLE.height;
      this.yCoefficient = -1;
    } else if (orientation === 'down') {
      this.x =
        (Math.floor(i / 2) - 1) * TRIANGLE.base + TRIANGLE.base / 2 ** (j % 2);
      this.y = j * TRIANGLE.height;
      this.yCoefficient = 1;
    }
    this.i = i;
    this.j = j;

    this.options = {
      ...TRIANGLE,
      ...optionsParams,
    };
    // Frame variables for intiaintated Triangle class
    this.frame = {
      current: null,
      previous: null,
      initial: Date.now(),
    };
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + TRIANGLE.base, this.y);
    ctx.lineTo(
        this.x + TRIANGLE.base / 2,
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

  fall(frame, elapsed) {
    if (this.frame.previous === null) {
      this.frame.previous = frame.current;
    }
    const frameModifier = Math.min(
        (frame.current - this.frame.previous) / elapsed,
        1,
    );
    const baseModifer = (TRIANGLE.base / 2) * frameModifier;
    const heightModifier = (TRIANGLE.height / 2) * frameModifier;
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(
        this.x + baseModifer,
        this.y + this.yCoefficient * heightModifier,
    );
    ctx.lineTo(
        this.x + TRIANGLE.base - baseModifer,
        this.y + this.yCoefficient * heightModifier,
    );
    ctx.lineTo(
        this.x + TRIANGLE.base / 2,
        this.y + this.yCoefficient * (TRIANGLE.height - heightModifier),
    );
    ctx.lineTo(
        this.x + baseModifer,
        this.y + this.yCoefficient * heightModifier,
    );
    ctx.closePath();
    ctx.fillStyle = this.options.fillStyle;
    ctx.fill();
    if (frameModifier === 1) {
      this.frame.previous = null;
    }
  }
}
