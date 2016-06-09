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
      let sort = el.getAttribute('sort')
      let desc = sort.indexOf('-') === 0
      let icon = createElem(`<b class='sort-arrow'>${desc ? downArrow : upArrow}</b>`)
      el.appendChild(icon)
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

}
