/**
 * layout.js
 * Classes for layout styles for canvas layer
 */

// Constants
import CANVAS from 'constants/canvas.json';
import TRIANGLE from 'constants/triangle.json';

// Shapes
import triangle from './shapes/triangle';

// Draws extra set of triangles past maximum index values to hide white space
const RESIZE_BUFFER = 1;

export default class Layout {
  constructor(canvas) {
    this.canvas = canvas;
    this.iMax =
      2 * (window.innerWidth / TRIANGLE.height) -
      CANVAS.marginRight +
      RESIZE_BUFFER;
    this.jMax = window.innerHeight / TRIANGLE.height - CANVAS.marginBottom;
    this.i = null;
    this.j = null;
  }

  drawTiling() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.iMax =
      2 * (window.innerWidth / TRIANGLE.height) -
      CANVAS.marginRight +
      RESIZE_BUFFER;
    this.jMax = window.innerHeight / TRIANGLE.height - CANVAS.marginBottom;

    const drawTriangle = triangle.bind(this);
    if (this.canvas.getContext) {
      for (let j = CANVAS.marginTop; j < this.jMax; j++) {
        for (let i = CANVAS.marginLeft; i < this.iMax; i++) {
          const orientation = (j + i) % 2 ? 'down' : 'up';

          if (
            this.i !== null &&
            this.j !== null &&
            this.i === i &&
            this.j === j
          ) {
            // Draw triangle
            const options = {
              fillStyle: 'blue',
            };
            drawTriangle(i, j, orientation, options);
          } else {
            // Draw triangle
            drawTriangle(i, j, orientation);
          }
        }
      }
    }

    window.requestAnimationFrame(this.drawTiling.bind(this));
  }

  onMouseMove(e) {
    if (!CANVAS.coordinateType) {
      this.mouseX = e.x;
      this.mouseY = e.y;
    } else {
      this.mouseX = e[`${CANVAS.coordinateType}X`];
      this.mouseY = e[`${CANVAS.coordinateType}Y`];
    }

    // Calculates i and j values for triangle tiling
    this.j = Math.floor(this.mouseY / TRIANGLE.height);
    const xDown = (TRIANGLE.height - (this.mouseY % TRIANGLE.height)) / 2;
    const xUp = (this.mouseY % TRIANGLE.height) / 2;
    const xFirstOffset = ((this.j + 1) % 2) * xUp + (this.j % 2) * xDown;
    const xFirstPairTriangle =
      2 * ((this.j % 2) * xUp + ((this.j + 1) % 2) * xDown);
    if (this.mouseX - xFirstOffset <= 0) {
      this.i = 0;
    } else {
      const xCompletePairs = Math.floor(
          (this.mouseX - xFirstOffset) / (2 * (xDown + xUp)),
      );
      const xRemainder =
        this.mouseX - xFirstOffset - xCompletePairs * (2 * (xDown + xUp));
      const xRemainderTriangles = xRemainder - xFirstPairTriangle <= 0 ? 1 : 2;
      this.i = 2 * xCompletePairs + xRemainderTriangles;
    }
  }

  start() {
    const draw = this.drawTiling.bind(this);
    const onMouseMove = this.onMouseMove.bind(this);
    // window.addEventListener('resize', draw);
    window.addEventListener('mousemove', onMouseMove);
    window.requestAnimationFrame(draw);
  }
}
