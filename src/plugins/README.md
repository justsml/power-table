# Power Table: Plugins Spec

Plugins are functions which return discrete objects with the following structure:

```js
{
  name: 'selectable',
  mixins: {
    // mixins may add any functions to the main `Table` instance
    isSelected,
    select,
    unselect,
    toggleSelect
  },
  handlers: {
    // handler functions are passed {elem, data, column, rowIndex}
    preRender:          fn('preRender'),
    postRender:         fn('postRender'),
    preRow:             fn('preRow'),
    postRow:            fn('postRow'),
    preCell:            fn('preCell'),
    postCell:           fn('postCell'),
    preHeaderField:     fn('preHeaderField'),
    postHeader:         fn('postHeader'),


  },

}

```
