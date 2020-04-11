/**
 * background.js
 * Class for background layout
 */

// Layout
import Layout from './layout';

export default class Background extends Layout {
  constructor(canvas) {
    super(canvas);
  }

  draw() {
    super.drawTiles();
  }

  start() {
    super.start();
    const draw = this.draw.bind(this);
    draw();
  }
}
