/**
 * index.js
 * Entry file for repository
 */

// Styles
import 'styles/main.less';

// Canvas
import Canvas from './canvas';

// Creates canvas element and passes reference to class
const canvasElement = document.createElement('CANVAS');
canvasElement.setAttribute('id', 'background');
document.body.appendChild(canvasElement);

const canvas = new Canvas(canvasElement);
canvas.start();
