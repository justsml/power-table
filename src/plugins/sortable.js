import {getSorter, createElem, toArray, removeAll} from '../util'

export function Sortable({table}) {
  let sortBy = '';

  return {
    name: 'sortable',
    mixins: {
      sortByColumn,
    },
    handlers: {
      preRender:      _preRender,
      postHeader:     _postHeader,
      preHeaderField: _preHeaderField,
    },
  }

  const _columnClicked = (e) => {
    let el = e.target
    el = el.matches('th') ? el : (el.closest && el.closest('th') || el)
    let clickedSort = el.getAttribute('sort')
    sortBy = clickedSort === sortBy ? '-'.concat(clickedSort) : clickedSort
    updateView()
  }

  function updateView() {
    // set the up/down arrow in col names
    const upArrow     = '&#9650;'
    const downArrow   = '&#9660;'
    const sortIcons   = toArray(table.querySelectorAll('b.sort-arrow'))
    const el          = table.querySelector(`th[sort=${sortBy.replace(/-/, '')}]`)
    removeAll(sortIcons)
    if (el) {


    }
  }

  function _preRender({data}) {
    const dataSorter = (data, sortKey) => data.sort(getSorter(sortKey))

    if (!sortBy || sortBy.length <= 0) { return data; }

    if (data && typeof data.then === 'function') {
      return data.then(data => dataSorter(data, sortBy))
    } else if (data && Array.isArray(data)) {
      return dataSorter(data, sortBy)
    }
  }

  function _postHeader({elem, data, column, rowIndex}) {
    elem.addEventListener('click', _columnClicked)
    return arguments[0];
  }

  function sortByColumn(_sortBy) {
    sortBy = _sortBy;
  }


  function _preHeaderField({elem, data, column, rowIndex}) {
    elem.setAttribute('sort', column.sort);
    return arguments[0];
  }

  function selectAll() {
    Array.from(table.querySelectorAll('.selection-col [type="checkbox"]'))
      .map(function(el) {return el.value;})
      .map(selectItem.bind(null, true));
  }

  function selectNone() {
    Array.from(table.querySelectorAll('.selection-col [type="checkbox"]'))
      .map(function(el) {return el.value;})
      .map(selectItem.bind(null, false));
  }

  function selectItem(id, bool) {
    if (typeof bool === 'string' && typeof id === 'boolean') {
      // reverse params
      [id, bool] = [bool, id];
    }
    if (!id) {return false;}

    var chk = table.querySelector('[type="checkbox"][value="' + id + '"]');
    if (chk) {
      // see if we are in 'toggle mode'
      if (typeof bool === 'undefined' || bool === null) {
        bool = !chk.checked; // Toggle it!
      }
      if (bool) {
        chk.checked = 'checked';
        chk.setAttribute('checked', 'checked');
        chk.parentNode.parentNode.classList.add('selected');
        if (selected.indexOf(id) === -1) {selected.push(id);}
      } else {
        chk.checked = undefined;
        chk.removeAttribute('checked');
        chk.parentNode.parentNode.classList.remove('selected');
        if (selected.indexOf(id) !== -1) {selected.splice(selected.indexOf(id), 1);}
      }
    }

    this.setStatusTotals(this.users.length, selected.length);

    return {'id': id, 'checked': bool, 'elem': chk};
  }

  function getSelected() { return selected; }

  function selectToggle(id) {
    return selectItem.bind(this)(id, undefined);
  }

  function selectAdd(id) {
    return selectItem.bind(this)(id, true);
  }

  function selectRemove(id) {
    return selectItem.bind(this)(id, false);
  }

  function isSelected(id) {
    return selected.indexOf(id) > -1;
  }

  function _handleSelect(e) {
    var el, val;
    if (e.target.tagName === 'INPUT') {
      val = e.target.value;
    } else if (e.target.tagName === 'TR') {
      el = e.target.querySelector('input[type="checkbox"]');
      if (el && el.value) { val = el.value; }
    } else if (e.target.tagName === 'TD') {
      el = e.target.parentNode.querySelector('input[type="checkbox"]');
      if (el && el.value) { val = el.value; }
    }

    console.warn('_handleSelect Triggered', val, el, e);
    if (val) {
      e.preventDefault();
      this.selectToggle(val);
    }
  }


}
