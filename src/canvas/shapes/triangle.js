/**
 * triangle.js
 * Function for drawing triangle element
 */

// Constants
import CANVAS from 'constants/canvas.json';
import TRIANGLE from 'constants/triangle.json';

/**
 * @this Layout
 * @param {Number} i
 * @param {Number} j
 * @param {String} orientation
 * @param {Object} optionsParams
 */
export default function triangle(i, j, orientation, optionsParams = {}) {
  let x;
  let y;
  let yCoefficient;

  if (orientation === 'up') {
    x =
      (Math.floor(i / 2) + (j % 2)) * TRIANGLE.height -
      TRIANGLE.height / 2 ** ((j + 1) % 2);
    y = (j + 1) * TRIANGLE.height;
    yCoefficient = -1;
  } else if (orientation === 'down') {
    x =
      (Math.floor(i / 2) - 1) * TRIANGLE.height +
      TRIANGLE.height / 2 ** (j % 2);
    y = j * TRIANGLE.height;
    yCoefficient = 1;
  }

  const options = {
    ...TRIANGLE,
    ...optionsParams,
  };

  const ctx = this.canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + TRIANGLE.height, y);
  ctx.lineTo(x + TRIANGLE.height / 2, y + yCoefficient * TRIANGLE.height);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.lineWidth = options.lineWidth;
  ctx.strokeStyle = options.strokeStyle;
  ctx.stroke();

  // Padding
  if (
    i < CANVAS.paddingLeft + CANVAS.marginLeft ||
    j < CANVAS.paddingTop + CANVAS.marginTop ||
    j >= this.jMax - CANVAS.paddingBottom ||
    i >= this.iMax - CANVAS.paddingRight
  ) {
    ctx.fillStyle = 'white';
  } else {
    ctx.fillStyle = options.fillStyle;
  }
  ctx.fill();
}
