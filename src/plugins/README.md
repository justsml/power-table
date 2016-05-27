# Power Table: Plugins Spec

Plugins are functions which return discrete objects with the following structure:

```js
{
  name: 'selectable',
  handlers: {
    preRender:        fn('preRender'),
    rowBefore:        fn('rowBefore'),
    rowAfter:         fn('rowAfter'),
    cellBefore:       fn('cellBefore'),
    cellAfter:        fn('cellAfter'),
    headerColumn:     fn('headerColumn'),
    headersRendered:  fn('headersRendered'),

    rowBefore:      fn(elem, data, column, rowIndex),
    rowAfter:       fn(elem, data, column, rowIndex),
    cellBefore:     fn(elem, data, column, rowIndex),
    cellAfter:      fn(elem, data, column, rowIndex),
    headerColumn:   fn(elem, data, column, rowIndex),
    headersAdded:   fn(elem, data, column, rowIndex),

  },

}

```
