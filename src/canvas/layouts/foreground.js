/**
 * foreground.js
 * Class for foreground layout canvas layer
 */

// Layout
import Layout from './layout';

// Shapes
import Triangle from '../shapes/triangle';

export default class Foreground extends Layout {
  constructor(canvas) {
    super(canvas);
  }

  drawCursorTile() {
    // const drawTriangle = triangle.bind(this);
    if (this.canvas.getContext) {
      if (this.checkTile(this.mouseI, this.mouseJ)) {
        const options = {
          fillStyle: 'blue',
        };
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const orientation = (this.mouseJ + this.mouseI) % 2 ? 'down' : 'up';
        const triangle = new Triangle(
            this.canvas,
            this.mouseI,
            this.mouseJ,
            orientation,
            options,
        );
        triangle.draw();
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
