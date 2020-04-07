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

const canvas = new CanvasManager();

const backgroundLayout = new Background(canvas.layers.background);
const foregroundLayout = new Foreground(canvas.layers.foreground);

backgroundLayout.start();
foregroundLayout.start();
