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

// Constants
const TRANISITION = 1000;

export default class Foreground extends Layout {
  constructor(canvas) {
    super(canvas, true);
    this.animatedTiles = new Set();
  }

  draw() {
    this.animatedTiles.forEach((key) => {
      const triangle = this.tiles.get(key);
      if (this.frame.current - triangle.frame.previous < TRANISITION) {
        triangle.fall(this.frame, TRANISITION);
      } else {
        this.animatedTiles.delete(key);
      }
    });
    if (this.checkTile(this.mouseI, this.mouseJ)) {
      const options = {
        fillStyle: 'blue',
      };
      if (this.tiles.has(`${this.mouseI}_${this.mouseJ}`)) {
        const triangle = this.tiles.get(`${this.mouseI}_${this.mouseJ}`);
        triangle.setOptions(options);
        triangle.fall(this.frame, TRANISITION);
      } else {
        const orientation = (this.mouseJ + this.mouseI) % 2 ? 'down' : 'up';
        const triangle = new Triangle(
            this.canvas,
            this.mouseI,
            this.mouseJ,
            orientation,
            options,
        );
        this.tiles.set(`${this.mouseI}_${this.mouseJ}`, triangle);
        triangle.fall(this.frame, TRANISITION);
      }
      this.animatedTiles.add(`${this.mouseI}_${this.mouseJ}`);
    }
  }

  drawCursorClick(e) {
    const tiling = cursorTiling.bind(this);
    tiling();
    this.draw();
  }

  start() {
    super.start();
    const onClick = this.drawCursorClick.bind(this);
    const onMouseMove = this.mouseMove.bind(this);
    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', onMouseMove);
  }
}
