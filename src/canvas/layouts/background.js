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

  drawTiles() {
    super.drawTiles();
    window.requestAnimationFrame(this.drawTiles.bind(this));
  }

  start() {
    super.start();
    const draw = this.drawTiles.bind(this);
    window.requestAnimationFrame(draw);
  }
}
