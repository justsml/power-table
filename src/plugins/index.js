/**
 * Utility & runner for plugins loaded in a given context:
 */
export {Plugins};

function Plugins({plugins}) {
  const fn = (eventName) => ({elem, data, column, rowIndex}) => {
    return plugins.reduce((obj, p) => {
      if (!obj) { return obj; } // processing was cancelled by a plugin
      var transformed = typeof p.handlers[eventName] === 'function' ? p.handlers[eventName](obj) : obj;
      return transformed;
    }, {elem, data, column, rowIndex});
  }
  return {
    preRender:        fn('preRender'),
    rowBefore:        fn('rowBefore'),
    rowAfter:         fn('rowAfter'),
    cellBefore:       fn('cellBefore'),
    cellAfter:        fn('cellAfter'),
    headerColumn:     fn('headerColumn'),
    headersRendered:  fn('headersRendered'),
  }
}
