import {Config} from './config'
import {renderTableHead, renderTableBody} from './render'

export default Table;

function Table(el, config) {
  let table, css;
  config = Config(config);

  function resetLayout() {
    table = document.createElement('table');
    table.classList.add('power-table');
    el.children.forEach(child => el.removeChild(child));
    el.appendChild(table)
    return table;
  }
  function injectStyles() {
    css = document.querySelector('style#horizontal-table');
    if (!css) {
      let styles = require("!css!less!../style.less");
      css = document.createElement('style');
      css.id = 'horizontal-Table';
      css.innerHTML = styles;
      document.head.appendChild(css);
    }
  }
  function init() {
    injectStyles();
    resetLayout();
    return { destroy };
  }
  function destroy() {
    if (css) { css.parentNode.removeChild(css); }
  }
  return init();
}


