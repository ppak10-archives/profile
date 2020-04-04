/**
 * manager.js
 * Class for managing canvas elements that are used as a layers
 */

// Constants
const DEFAULT_OPTIONS = {
  layers: ['background', 'foreground'],
  parentElement: document.body,
};

export default class CanvasManager {
  constructor(options = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.layers = this.constructor.createLayers(
        this.options.layers,
        this.options.parentElement,
    );
  }

  static createLayers(
      layers = DEFAULT_OPTIONS.layers,
      parentElement = DEFAULT_OPTIONS.parentElement,
  ) {
    const layersObject = {};
    if (typeof layers === 'number') {
      for (let i = 0; i < layers; i++) {
        const layerId = `layer${i}`;
        const canvas = document.createElement('CANVAS');
        canvas.setAttribute('class', 'canvas-layer');
        canvas.setAttribute('id', layerId);
        canvas.setAttribute('style', `z-index: ${i}`);
        parentElement.appendChild(canvas);
        layersObject[layerId] = canvas;
      }
    } else if (Array.isArray(layers)) {
      for (const [index, layerName] of layers.entries()) {
        const canvas = document.createElement('CANVAS');
        canvas.setAttribute('class', 'canvas-layer');
        canvas.setAttribute('id', layerName);
        canvas.setAttribute('style', `z-index: ${index}`);
        parentElement.appendChild(canvas);
        layersObject[layerName] = canvas;
      }
    }
    return layersObject;
  }
}
