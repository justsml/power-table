import {getId} from '../util'
import {events} from '../events'

export function Selectable({table, data}) {
  const selected        = []
  const cleanupHandlers = []

  return {
    name: 'selectable',
    mixins: {
      isSelected,
      selectAdd,
      selectAll,
      selectToggle,
      getSelected,
      selectNone,
      selectRemove
    },
    handlers: {
      destroy:          _destroy,
      preHeaderField:   _preHeaderField,
      postRender:       _postRender,
    },
  }

  const selectAllToggleClick = (e) => {
    if (e.target.checked) {
      selectAll()
    } else {
      selectNone()
    }
  }

  // const selectItemClick = (e) => {
  //   let el = e.target
  //   if (el.checked) {
  //     selectItem(el.value, true)
  //   } else {
  //     selectItem(el.value, false)
  //   }
  // }

  function _destroy() {
    return cleanupHandlers.map(rm => rm()) // should be sparse array w/ length === # of cleanup method calls
  }

  function _postRender({elem, data, column, rowIndex}) {
    elem.addEventListener('click', _handleSelect)
    cleanupHandlers.push(() => elem.removeEventListener('click', _handleSelect))
    return arguments[0]
  }

  function _preHeaderField({elem, data, column, rowIndex}) {
    if (column.selection) {
      elem.addEventListener('click', selectAllToggleClick)
      cleanupHandlers.push(() => elem.removeEventListener('click', selectAllToggleClick))
      column.title = `<input id="toggleCheckAll" type="checkbox" title="Check/Uncheck All" value="" />`;
      column.render = ({elem, column, row}) => {
        let _getId = column.getId || getId;
        return `<input type="checkbox" value="${_getId(row)}" ${isSelected(_getId(row)) ? ' checked="checked"' : ''} />`;
      }
    }
    return arguments[0];
  }

  function selectAll() {
    Array.from(table.querySelectorAll('.selection-col [type="checkbox"]'))
      .map(function(el) {return el.value;})
      .map(selectItem(true))
  }

  function selectNone() {
    Array.from(table.querySelectorAll('.selection-col [type="checkbox"]'))
      .map(function(el) {return el.value})
      .map(selectItem(false))
  }

  function selectItem(id, bool) {
    if (typeof bool === 'string' && typeof id === 'boolean') {
      // reverse params
      [id, bool] = [bool, id]
    }
    if (!id) {return false}

    var chk = table.querySelector('[type="checkbox"][value="' + id + '"]')
    if (chk) {
      // see if we are in 'toggle mode'
      if (typeof bool === 'undefined' || bool === null) {
        bool = !chk.checked // Toggle it!
      }
      if (bool) {
        chk.checked = 'checked'
        chk.setAttribute('checked', 'checked')
        chk.parentNode.parentNode.classList.add('selected')
        if (selected.indexOf(id) === -1) {selected.push(id)}
      } else {
        chk.checked = undefined
        chk.removeAttribute('checked')
        chk.parentNode.parentNode.classList.remove('selected')
        if (selected.indexOf(id) !== -1) {selected.splice(selected.indexOf(id), 1)}
      }
    }

    // setStatusTotals(users.length, selected.length)
    table.dispatchEvent(events.createStatusEvent({selected, data}))
    table.dispatchEvent(events.createSelectEvent({selected}))

    return {'id': id, 'checked': bool, 'elem': chk}
  }

  function selectToggle(id) {   return selectItem(id, undefined) }
  function selectAdd(id) {      return selectItem(id, true) }
  function selectRemove(id) {   return selectItem(id, false) }
  function isSelected(id) {     return selected.indexOf(id) > -1 }
  function getSelected() {      return selected }

  function _handleSelect(e) {
    var el, val
    if (e.target.tagName === 'INPUT') {
      val = e.target.value
    } else if (e.target.tagName === 'TR') {
      el = e.target.querySelector('input[type="checkbox"]')
      if (el && el.value) { val = el.value }
    } else if (e.target.tagName === 'TD') {
      el = e.target.parentNode.querySelector('input[type="checkbox"]')
      if (el && el.value) { val = el.value }
    }

    console.warn('_handleSelect Triggered', val, el, e)
    if (val) {
      e.preventDefault()
      selectToggle(val)
    }
  }
}
