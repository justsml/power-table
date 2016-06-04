import {Config} from './config'
import {renderTableHead, renderTableBody} from './render'
import {PluginHooks} from './plugins'

export {Table}

function Table(el, config) {
  let table, css, hooks;
  const ctx = { destroy }; // Plain object `ctx` will be returned - use Object.assign to extend

  config = Config(config);

  Object.assign(ctx, config);

  function _resetLayout() {
    table = document.createElement('table')
    table.classList.add('power-table')
    Object.assign(ctx, {table})
    // empty contents
    el.innerHTML = '';
    // Array.from(el.children).forEach(child => el.removeChild(child))
    el.appendChild(table)
    return table
  }
  function _injectStyles() {
    css = document.querySelector('style#horizontal-table')
    if (!css) {
      let styles = require("!css!less!./style.less")
      css = document.createElement('style')
      css.id = 'horizontal-Table'
      css.innerHTML = styles
      document.head.appendChild(css)
    }
  }
  function _loadPlugins() {
    // 'unpacks'/runs plugins
    const plugins = config.plugins ? config.plugins.map(p => p(ctx)) : []
    // extend ctx with plugin.mixins
    plugins.map(p => typeof p.mixins === 'object' ? Object.assign(ctx, p.mixins) : ctx)
    // Add `hooks` & `plugins` to return object
    Object.assign(ctx, {plugins, 'hooks': PluginHooks({plugins})})
    hooks = ctx.hooks
  }
  function _render() {

    renderTableHead(ctx)
      .then(thead => {
        table.appendChild(thead)
        hooks.postHeader({elem: thead})
      })

    renderTableBody(ctx)
      .then(tbody => {
        table.appendChild(tbody)
        hooks.postRender({elem: table})
      })
  }
  function init() {
    _injectStyles();
    _resetLayout();
    _loadPlugins();
    _render();
    return ctx;
  }
  function destroy() {
    if (css)   { css.parentNode.removeChild(css); }
    if (table) { table.parentNode.removeChild(table); }
    return ctx;
  }
  return init();
}


