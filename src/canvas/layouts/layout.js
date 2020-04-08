/**
 * layout.js
 * Class for base canvas layer layout and binds event listeners to methods
 */

// Constants
import CANVAS from 'constants/canvas.json';
import TRIANGLE from 'constants/triangle.json';

// Shapes
import Triangle from '../shapes/triangle';

// Draws extra set of triangles past maximum index values to hide white space
const RESIZE_BUFFER = 1;

export default class Layout {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouseI = null;
    this.mouseJ = null;
    this.resize();
  }

  /**
   * Checks indicies of tiles to make sure that tile placement is valid
   * @param {Number} i
   * @param {Number} j
   * @return {Boolean}
   */
  checkTile(i, j) {
    if (i !== null && j !== null) {
      if (
        !(
          i < CANVAS.paddingLeft + CANVAS.marginLeft ||
          j < CANVAS.paddingTop + CANVAS.marginTop ||
          j >= this.jMax - CANVAS.paddingBottom ||
          i >= this.iMax - CANVAS.paddingRight
        )
      ) {
        return true;
      }
    }
    return false;
  }

  drawTiles() {
    if (this.canvas.getContext) {
      for (let j = CANVAS.marginTop; j < this.jMax; j++) {
        for (let i = CANVAS.marginLeft; i < this.iMax; i++) {
          const orientation = (j + i) % 2 ? 'down' : 'up';
          if (this.checkTile(i, j)) {
            const triangle = new Triangle(this.canvas, i, j, orientation);
            triangle.draw();
          }
        }
      }
    }
  }

  mouseMove(e) {
    if (!CANVAS.coordinateType) {
      this.mouseX = e.x;
      this.mouseY = e.y;
    } else {
      this.mouseX = e[`${CANVAS.coordinateType}X`];
      this.mouseY = e[`${CANVAS.coordinateType}Y`];
    }

    // Calculates i and j values for triangle tiling
    this.mouseJ = Math.floor(this.mouseY / TRIANGLE.height);
    const xDown = (TRIANGLE.height - (this.mouseY % TRIANGLE.height)) / 2;
    const xUp = (this.mouseY % TRIANGLE.height) / 2;
    const xFirstOffset =
      ((this.mouseJ + 1) % 2) * xUp + (this.mouseJ % 2) * xDown;
    const xFirstPairTriangle =
      2 * ((this.mouseJ % 2) * xUp + ((this.mouseJ + 1) % 2) * xDown);
    if (this.mouseX - xFirstOffset <= 0) {
      this.mouseI = 0;
    } else {
      const xCompletePairs = Math.floor(
          (this.mouseX - xFirstOffset) / (2 * (xDown + xUp)),
      );
      const xRemainder =
        this.mouseX - xFirstOffset - xCompletePairs * (2 * (xDown + xUp));
      const xRemainderTriangles = xRemainder - xFirstPairTriangle <= 0 ? 1 : 2;
      this.mouseI = 2 * xCompletePairs + xRemainderTriangles;
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.iMax =
      2 * (window.innerWidth / TRIANGLE.height) -
      CANVAS.marginRight +
      RESIZE_BUFFER;
    this.jMax = window.innerHeight / TRIANGLE.height - CANVAS.marginBottom;
  }

  start() {
    const onResize = this.resize.bind(this);
    const onMouseMove = this.mouseMove.bind(this);
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
  }
}
