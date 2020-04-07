/**
 * foreground.js
 * Class for foreground layout canvas layer
 */

// Layout
import Layout from './layout';

// Shapes
import triangle from '../shapes/triangle';

export default class Foreground extends Layout {
  constructor(canvas) {
    super(canvas);
  }

  drawCursorTile() {
    const drawTriangle = triangle.bind(this);
    if (this.canvas.getContext) {
      const options = {
        fillStyle: 'blue',
      };
      if (this.i !== null && this.j !== null) {
        const orientation = (this.j + this.i) % 2 ? 'down' : 'up';
        drawTriangle(this.i, this.j, orientation, options);
      }
    }
    window.requestAnimationFrame(this.drawCursorTile.bind(this));
  }

  start() {
    super.start();
    const draw = this.drawCursorTile.bind(this);
    window.requestAnimationFrame(draw);
  }
}
