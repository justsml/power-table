import {Config} from './config'
import {PluginHooks} from './plugins'
import {renderTableHead, renderTableBody} from './render'
import {events} from './events'

/**
 * Table class - start here.
 *
 * ```js
 * let powerTable = Table(document.querySelector('#user-table'), {
 *   columns: [
 *     {title: 'Col #1', render: 'column_1', sort: 'column_1', cols: 3},
 *     {title: 'Col #2', render: 'column_2', sort: 'column_2', cols: 3},
 *   ],
 *   data: [
 *     {column_1: 'row 1 - col 1', column_2: 'row 1 - col 2'},
 *     {column_1: 'row 2 - col 1', column_2: 'row 2 - col 2'},
 *     {column_1: 'row 3 - col 1', column_2: 'row 3 - col 2'},
 *   ],
 *   plugins: null,
 *   debug: false
 * })
 * // Added a PowerTable to `document.querySelector('#user-table')`
 * ```
 *
 * @param  {Element} el - Wrapper/root element
 * @param  {object} config - Define plugins in here, see tests/examples
 */
export function Table(el, config) {
  let table, css, hooks
  const ctx = { destroy } // Plain object `ctx` will be returned - use Object.assign to extend

  config = Config(config)
  Object.assign(ctx, config)

  function _resetLayout() {
    table = document.createElement('table')
    table.classList.add('power-table')
    Object.assign(ctx, {table})
    el.innerHTML = '' // empty contents
    el.appendChild(table)
    return table
  }
  function _injectStyles() {
    css = document.querySelector('style#power-table')
    if (!css) {
      const styles  = require('!css!less!./style.less')
      css           = document.createElement('style')
      css.id        = 'power-Table'
      css.innerHTML = styles
      document.head.appendChild(css)
    }
  }
  function _loadPlugins() {
    // run plugins - 'unpacks' their interfaces
    const plugins = config.plugins ? config.plugins.map(p => p(ctx)) : []
    // extend ctx with plugin.mixins methods
    plugins.map(p => {
      if (p.name) {
        ctx[p.name] = ctx[p.name] ? ctx[p.name] : {}
      } else {
        throw new Error('Plugin must have a `name` property')
      }

      if (typeof p.mixins === 'object') {
        Object.assign(ctx[p.name], p.mixins)
      }

      return p
    })
    // ;; // Add `hooks` && `plugins` to return object
    Object.assign(ctx, {plugins, 'hooks': PluginHooks({plugins})})
    hooks = ctx.hooks
  }

  function _render() {
    hooks.preRender(Object.assign({'elem': table}, ctx))

    renderTableHead(ctx)
      .then(thead => {
        table.appendChild(thead)
        hooks.postHeader({'elem': thead})
      })

    renderTableBody(ctx)
      .then(tbody => {
        table.appendChild(tbody)
        hooks.postRender({'elem': table})
      })
  }
  function _customEvents() {
    table.addEventListener(events.createRenderEvent.eventName, e => {
      console.warn(`Table CustEvent Fired: ${events.createRenderEvent.eventName}`, e)
      let {data} = e.details;
      ctx.data = data;
      console.warn(`Table CustEvent render: BEFORE ${events.createRenderEvent.eventName}`, data)
      destroy()
      init()
    })
  }
  function init() {
    _injectStyles()
    _resetLayout()
    _customEvents()
    _loadPlugins()
    _render()
    return ctx
  }
  function destroy() {
    hooks.destroy(Object.assign({'elem': table}, ctx))
    if (css)   { css.parentNode.removeChild(css)     }
    if (table) { table.parentNode.removeChild(table) }
    return ctx
  }

  return init()
}


