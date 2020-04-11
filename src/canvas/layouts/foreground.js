/**
 * foreground.js
 * Class for foreground layout canvas layer
 */

// Layout
import Layout from './layout';

// Shapes
import Triangle from '../shapes/triangle';

// Tilings
import cursorTiling from '../tilings/triangle';

export default class Foreground extends Layout {
  constructor(canvas) {
    super(canvas);
  }

  drawCursorTile() {
    // const drawTriangle = triangle.bind(this);
    if (this.checkTile(this.mouseI, this.mouseJ)) {
      const options = {
        fillStyle: 'blue',
      };
      // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    window.requestAnimationFrame(this.drawCursorTile.bind(this));
  }

  drawCursorClick(e) {
    const tiling = cursorTiling.bind(this);
    tiling();
    this.drawCursorTile();
    window.requestAnimationFrame(this.drawCursorTile.bind(this));
  }

  start() {
    super.start();
    const draw = this.drawCursorTile.bind(this);
    const onClick = this.drawCursorClick.bind(this);
    const onMouseMove = this.mouseMove.bind(this);
    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', onMouseMove);
    window.requestAnimationFrame(draw);
  }
}
