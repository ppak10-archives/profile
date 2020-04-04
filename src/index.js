/**
 * index.js
 * Entry file for repository
 */

// Styles
import 'styles/main.less';

// Canvas
import CanvasManager from './canvas/manager';
import Layout from './canvas/layout';

const canvas = new CanvasManager();
const tileLayout = new Layout(canvas.layers.background);
tileLayout.start();
