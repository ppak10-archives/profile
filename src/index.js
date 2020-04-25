/**
 * index.js
 * Entry file for repository
 */

// Styles
import 'styles/main.less';

// Canvas
import CanvasManager from './canvas/manager';

// Layout
import Background from './canvas/layouts/background';
import Foreground from './canvas/layouts/foreground';
import Text from './canvas/layouts/text';

// Creates canvas layers
const canvasOptions = {
  layers: ['background', 'foreground', 'text'],
};
const canvas = new CanvasManager(canvasOptions);

// Instantiate Layouts
const backgroundLayout = new Background(canvas.layers.background);
const foregroundLayout = new Foreground(canvas.layers.foreground);
const textLayout = new Text(canvas.layers.text);

// Start Layouts
backgroundLayout.start();
foregroundLayout.start();
textLayout.start();
