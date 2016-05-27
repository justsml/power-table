
export function Selectable() {
  return {
    name: 'selectable',
    mixins: {
      isSelected,
      select,
      unselect,
      toggleSelect
    },
    handlers: {
      // preRender:        fn('preRender'),
      // postRender:       fn('postRender'),
      // rowBefore:        fn('rowBefore'),
      // rowAfter:         fn('rowAfter'),
      // cellBefore:       fn('cellBefore'),
      // cellAfter:        fn('cellAfter'),
      preHeaderField:   _preHeaderField,
      postHeader:       _postHeader,

    },
  }

  function _postHeader({elem, data, column, rowIndex}) {

  }

  function _preHeaderField({elem, data, column, rowIndex}) {
// <input id="toggleCheckAll" type="checkbox" title="Check/Uncheck All" value="" />
  }

  function isSelected(item) {

  }

  function select(items) {

  }

  function unselect(items) {

  }

  function toggleSelect(items) {

  }
}
