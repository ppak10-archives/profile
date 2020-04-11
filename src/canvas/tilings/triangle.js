/**
 * triangle.js
 * Tiling functions to use with shapes and layouts
 */

// Shapes
import Triangle from '../shapes/triangle';

/**
 * @this layout
 */
export default function cursor() {
  const cursorOrientation = (this.mouseI + this.mouseJ) % 2 ? 'down' : 'up';
  let leftModifier = (this.mouseI + this.mouseJ + 1) % 2;
  let rightModifier = (this.mouseI + this.mouseJ) % 2;
  for (let j = this.mouseJ - 1; j < this.mouseJ + 2; j++) {
    for (
      let i = this.mouseI - 2 + leftModifier;
      i < this.mouseI + 2 + rightModifier;
      i++
    ) {
      if (this.checkTile(i, j)) {
        const options = {
          fillStyle: 'red',
        };
        const orientation = (i + j) % 2 ? 'down' : 'up';
        const triangle = new Triangle(this.canvas, i, j, orientation, options);
        triangle.draw();
      }
    }
    if (
      (cursorOrientation === 'up' && j < this.mouseJ) ||
      (cursorOrientation === 'down' && j !== this.mouseJ - 1)
    ) {
      leftModifier += (-1) ** ((this.mouseI + this.mouseJ + 1) % 2);
      rightModifier += (-1) ** ((this.mouseI + this.mouseJ) % 2);
    }
  }
}