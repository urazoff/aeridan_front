/**
 * Build styles
 */
require('./index.css').toString();
const katex = require('katex');

/**
 * LatexTool for Editor.js
 *
 * @author tokhichevsky (https://github.com/tokhichevsky)
 * @copyright tokhichevsky 2019
 * @license The MIT License (MIT)
 * @version 1.0.0
 */

class LatexTool {
  /**
   * Allow to press Enter inside the LatexTool textarea
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * @typedef {Object} LaTeXData — plugin saved data
   * @param {String} latex - previously saved plugin latex
   */

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {LaTeXData} data — previously saved plugin latex
   * @param {Object} config - user config for Tool
   * @param {Object} api - Editor.js API
   */
  constructor({data, config, api}) {
    this.api = api;

    this.placeholder = config.placeholder || LatexTool.DEFAULT_PLACEHOLDER;

    this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: 'ce-latex',
      textarea: 'ce-latex__textarea',
      preview: 'ce-latex__preview'
    };

    this.nodes = {
      holder: null,
      textarea: null,
      preview: null
    };

    this.data = {
      latex: data.latex || ''
    };

    this.nodes.holder = this.drawView();
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    let wrapper = document.createElement('div'),
      textarea = document.createElement('textarea'),
      preview = document.createElement('div');

    wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);
    textarea.classList.add(this.CSS.textarea, this.CSS.input);
    preview.classList.add(this.CSS.preview);
    preview.style.display = 'none';
    textarea.textContent = this.data.latex;

    textarea.placeholder = this.placeholder;

    textarea.addEventListener('blur', function (event) {
      if (textarea.value) {
        katex.render(textarea.value, preview, {
          throwOnError: false
        });
        textarea.style.display = 'none';
        preview.style.display = '';
      }
    });
    preview.addEventListener('click', function (event) {
      preview.style.display = 'none';
      textarea.style.display = '';
      textarea.focus();
    });

    wrapper.appendChild(textarea);
    wrapper.appendChild(preview);

    this.nodes.textarea = textarea;
    this.nodes.preview = preview;

    return wrapper;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement} this.nodes.holder - Latex's wrapper
   * @public
   */
  render() {
    return this.nodes.holder;
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} LatexWrapper - LatexTool's wrapper, containing textarea with Latex
   * @returns {LaTeXData} - saved plugin Latex
   * @public
   */
  save(LatexWrapper) {
    return {
      latex: LatexWrapper.querySelector('textarea').value
    };
  }

  /**
   * onPaste callback fired from Editor`s core
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(event) {
    const content = event.detail.data;
    this.data = {
      latex: content.textContent
    };
  }

  /**
   * Returns Tool`s data from private property
   * @return {*}
   */
  get data() {
    return this._data;
  }

  /**
   * Set Tool`s data to private property and update view
   * @param {LaTeXData} data
   */
  set data(data) {
    this._data = data;

    if (this.nodes.textarea) {
      this.nodes.textarea.textContent = data.latex;
    }
  }

  validate(savedData) {
    if (!savedData.latex.trim()) {
      return false;
    }
    return true;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 256.61 143.44"><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><path d="M67.76,47.45,58.58,83.68Q52.16,109.33,46,120.86t-14.32,17a32.74,32.74,0,0,1-18.78,5.53q-6.66,0-9.8-2.55a7.56,7.56,0,0,1-3.14-6,7.25,7.25,0,0,1,2.59-5.56A9.74,9.74,0,0,1,9.41,127a7.48,7.48,0,0,1,5.41,1.81,6,6,0,0,1,1.89,4.55,5.19,5.19,0,0,1-1.18,3.72c-.79.81-1.18,1.35-1.18,1.61l.39.55a1.68,1.68,0,0,0,1.1.39,5.77,5.77,0,0,0,4-1.49,22.86,22.86,0,0,0,6.2-8.94q1.41-3.61,5.41-19.06l16-62.66H36.55l2.59-9.18c3.92,0,6.77-.44,8.54-1.49s3.66-3.4,5.65-7.06Q62,13.81,71.53,6.9A35.57,35.57,0,0,1,92.86,0q7.53,0,10.94,2.9a9.45,9.45,0,0,1,3.41,7.53,9,9,0,0,1-2.27,6.47,7.47,7.47,0,0,1-5.65,2.39,7.16,7.16,0,0,1-5.18-2,6.27,6.27,0,0,1-2-4.7,8.17,8.17,0,0,1,1.3-4.16,7.89,7.89,0,0,0,1.29-3,1.85,1.85,0,0,0-.59-1.41,2.13,2.13,0,0,0-1.53-.55q-4.62,0-9.49,5.72-8,9.18-12.86,29H81.56l-2.74,9.18Z"/><path d="M149,0,147.6,4.31A76.67,76.67,0,0,0,129,22.9q-11.29,16.32-18.39,39.72t-7.1,44q0,13.1,6.2,28.24l-1.33,4.54q-21.11-28.23-21.1-56.31a77.87,77.87,0,0,1,7.06-32A95.94,95.94,0,0,1,119,18.19,106.17,106.17,0,0,1,149,0Z"/><path d="M140,40.78l27.37-4.7A78.45,78.45,0,0,1,177.87,61.8a190.69,190.69,0,0,1,11.61-15.92q5.25-6.12,8.67-8a15,15,0,0,1,7.25-1.84A8.9,8.9,0,0,1,212,38.43a8.68,8.68,0,0,1,2.31,6.35A8.51,8.51,0,0,1,212,50.94a7.73,7.73,0,0,1-5.77,2.39,21.94,21.94,0,0,1-5.76-.9,20.51,20.51,0,0,0-4.51-.9,10,10,0,0,0-6.28,2.35q-4.07,3.21-10,13.72,6.66,23.54,10.66,28.71c1.57,2,3.16,3.06,4.79,3.06a6.13,6.13,0,0,0,3.53-1q2.26-1.65,7-8.24l2.83,1.65q-6.9,11.13-13.49,15.68a17.13,17.13,0,0,1-9.88,3.53,14.71,14.71,0,0,1-8.36-2.23,18.88,18.88,0,0,1-5.92-7.3,115.33,115.33,0,0,1-6.11-16.19q-9.18,11.69-14.4,17.06t-8.66,7a17,17,0,0,1-7.37,1.64,8.81,8.81,0,0,1-6.47-2.35,8.2,8.2,0,0,1-2.4-6.12,8.86,8.86,0,0,1,9.18-9.17,11.48,11.48,0,0,1,4.78,1.25c2.62,1.26,4.5,1.88,5.65,1.88a8.64,8.64,0,0,0,4.08-.94,23.63,23.63,0,0,0,6-5.09q2.19-2.43,8.08-10.36-7.53-27.91-11.77-33.41a8.12,8.12,0,0,0-6.74-3.53,26.44,26.44,0,0,0-5.18.63Z"/><path d="M194.89,139.36l1.41-4.31a76.94,76.94,0,0,0,15.26-14.12q6.23-7.68,12.82-21.29A163.84,163.84,0,0,0,235.12,70.5a147.66,147.66,0,0,0,5.34-37.72q0-13.09-6.2-28.31L235.52,0q21.09,28.23,21.09,56.23a78.1,78.1,0,0,1-7.06,32.08,94.84,94.84,0,0,1-24.62,32.78A107.26,107.26,0,0,1,194.89,139.36Z"/></g></g></svg>',
      title: 'LaTeX'
    };
  }

  /**
   * Default placeholder for LatexTool's textarea
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_PLACEHOLDER() {
    return 'Enter LaTeX';
  }

  /**
   *  Used by Editor.js paste handling API.
   *  Provides configuration to handle Latex tag.
   *
   * @static
   * @return {{tags: string[]}}
   */
  // static get pasteConfig() {
  //   return {
  //     tags: [ 'pre' ],
  //   };
  // }
}

module.exports = LatexTool;
