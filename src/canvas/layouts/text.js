/**
 * text.js
 * Class for text layout
 */

// Layout
import Layout from './layout';

// Tilings
import text from '../tilings/text';

export default class Text extends Layout {
  constructor(canvas) {
    super(canvas);
  }

  draw() {
    const tiling = text.bind(this);
    tiling('hello world');
  }

  start() {
    super.start();
    const draw = this.draw.bind(this);
    draw();
  }
}
