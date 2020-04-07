/**
 * background.js
 * Class for background layout
 */

// Constants
import CANVAS from 'constants/canvas.json';

// Layout
import Layout from './layout';

// Shapes
import triangle from '../shapes/triangle';

export default class Background extends Layout {
  constructor(canvas) {
    super(canvas);
  }

  drawTiling() {
    const drawTriangle = triangle.bind(this);
    if (this.canvas.getContext) {
      for (let j = CANVAS.marginTop; j < this.jMax; j++) {
        for (let i = CANVAS.marginLeft; i < this.iMax; i++) {
          const orientation = (j + i) % 2 ? 'down' : 'up';
          drawTriangle(i, j, orientation);
        }
      }
    }
    window.requestAnimationFrame(this.drawTiling.bind(this));
  }

  start() {
    super.start();
    const draw = this.drawTiling.bind(this);
    window.requestAnimationFrame(draw);
  }
}
