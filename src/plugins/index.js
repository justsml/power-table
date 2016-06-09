/**
 * Utility & runner for plugins loaded in a given context:
 */
export {PluginHooks}

/**
 * Returns an object of keyed functions which will run against any `handlers` in any of the plugins given
 */
function PluginHooks({plugins}) {
  const createHook = (eventName) => ({elem, data, column, rowIndex}) => {
    return plugins.reduce((obj, p) => {
      if (!obj) { return obj; } // processing was cancelled by a plugin
      var transformed = typeof p.handlers[eventName] === 'function' ? p.handlers[eventName](obj) : obj
      return transformed
    }, {elem, data, column, rowIndex})
  }
  // Add these on the `handlers` key on your plugins
  return {
    preRender:          createHook('preRender'),
    postRender:         createHook('postRender'),
    preRow:             createHook('preRow'),
    postRow:            createHook('postRow'),
    preCell:            createHook('preCell'),
    postCell:           createHook('postCell'),
    preHeaderField:     createHook('preHeaderField'),
    postHeaderField:    createHook('postHeaderField'),
    postHeader:         createHook('postHeader'),
    destroy:            createHook('destroy'),
  }
}
