/**
 * canvas.js
 * Classes for instantiating canvas and drawing shapes
 */

// Constants
import CANVAS from 'constants/canvas.json';
import TRIANGLE from 'constants/triangle.json';

const EDGE_LENGTH = 25;

// Draws extra set of triangles past maximum index values to hide white space
const RESIZE_BUFFER = 1;

export default class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.iMax =
      2 * (window.innerWidth / EDGE_LENGTH) -
      CANVAS.marginRight +
      RESIZE_BUFFER;
    this.jMax = window.innerHeight / EDGE_LENGTH - CANVAS.marginBottom;
    this.i = null;
    this.j = null;
  }

  drawTiling() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.iMax =
      2 * (window.innerWidth / EDGE_LENGTH) -
      CANVAS.marginRight +
      RESIZE_BUFFER;
    this.jMax = window.innerHeight / EDGE_LENGTH - CANVAS.marginBottom;

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
            const triangle = new Triangle(i, j, orientation, options);
            triangle.draw();
          } else {
            // Draw triangle
            const triangle = new Triangle(i, j, orientation);
            triangle.draw();
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
    this.j = Math.floor(this.mouseY / EDGE_LENGTH);
    const xDown = (EDGE_LENGTH - (this.mouseY % EDGE_LENGTH)) / 2;
    const xUp = (this.mouseY % EDGE_LENGTH) / 2;
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
    // this.drawTiling();
  }

  start() {
    const draw = this.drawTiling.bind(this);
    const onMouseMove = this.onMouseMove.bind(this);
    window.addEventListener('resize', draw);
    window.addEventListener('mousemove', onMouseMove);
    window.requestAnimationFrame(draw);
  }
}

export class Triangle extends Canvas {
  constructor(i, j, orientation, options = {}) {
    super(document.getElementById('background'));
    if (orientation === 'up') {
      this.x =
        (Math.floor(i / 2) + (j % 2)) * EDGE_LENGTH -
        EDGE_LENGTH / 2 ** ((j + 1) % 2);
      this.y = (j + 1) * EDGE_LENGTH;
      this.yCoefficient = -1;
    } else if (orientation === 'down') {
      this.x =
        (Math.floor(i / 2) - 1) * EDGE_LENGTH + EDGE_LENGTH / 2 ** (j % 2);
      this.y = j * EDGE_LENGTH;
      this.yCoefficient = 1;
    }
    this.options = {
      ...TRIANGLE,
      ...options,
    };
    this.i = i;
    this.j = j;
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + EDGE_LENGTH, this.y);
    ctx.lineTo(
        this.x + EDGE_LENGTH / 2,
        this.y + this.yCoefficient * EDGE_LENGTH,
    );
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.lineWidth = this.options.lineWidth;
    ctx.strokeStyle = this.options.strokeStyle;
    ctx.stroke();

    // Padding
    if (
      this.i < CANVAS.paddingLeft + CANVAS.marginLeft ||
      this.j < CANVAS.paddingTop + CANVAS.marginTop ||
      this.j >= this.jMax - CANVAS.paddingBottom ||
      this.i >= this.iMax - CANVAS.paddingRight
    ) {
      ctx.fillStyle = 'white';
    } else {
      ctx.fillStyle = this.options.fillStyle;
    }
    ctx.fill();
  }
}
