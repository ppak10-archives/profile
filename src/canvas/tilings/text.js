/**
 * text.js
 * Tiling functions to display text
 */

// Constants
import CANVAS from 'constants/canvas.json';

// Shapes
import Triangle from '../shapes/triangle';

/**
 * @this layout
 * @param {String} string
 */
export default function text(string) {
  if (this.canvas.getContext) {
    for (let j = CANVAS.marginTop; j < this.jMax; j++) {
      for (let i = CANVAS.marginLeft; i < this.iMax; i++) {
        const options = {
          fillStyle: 'red',
        };
        const orientation = (j + i) % 2 ? 'down' : 'up';
        if (this.checkTile(i, j)) {
          if (this.tiles.has(`${i}_${j}`)) {
            const triangle = this.tiles.get(`${i}_${j}`);
            triangle.draw();
          } else {
            const triangle = new Triangle(
                this.canvas,
                i,
                j,
                orientation,
                options,
            );
            triangle.draw();
            this.tiles.set(`${i}_${j}`, triangle);
          }
        }
      }
    }
  }
}
