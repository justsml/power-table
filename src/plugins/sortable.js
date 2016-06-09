import {getSorter, createElem, toArray, removeAll} from '../util'
import {events} from '../events'

export function Sortable({table, config}) {
  const cleanupHandlers = []
  let sortBy = '';

  return {
    name: 'sortable',
    mixins: {
      sortByColumn,
    },
    handlers: {
      destroy:        _destroy,
      preRender:      _preRender,
      postRender:     _postRender,
      preHeaderField: _preHeaderField,
    },
  }

  const _columnClicked = (e) => {
    let el = e.target
    el = el.matches('th') ? el : (el.closest && el.closest('th') || el)
    let clickedSort = el.getAttribute('sort')
    console.info('sort clicked?, ELEM: ', el, '\nSORT.REQUESTED:', clickedSort)
    if (clickedSort) {
      sortBy = clickedSort === sortBy ? '-'.concat(clickedSort) : clickedSort
      sortByColumn(sortBy)
    } else {
      console.warn('skipping sort, ELEM: ', el, '\nEVENT:', e)
    }
  }

  function triggerRender(data) {
    table.dispatchEvent(events.createRenderEvent({data, table}))
  }

  function triggerSorted() {
    table.dispatchEvent(events.createSortedEvent({sortBy}))
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

  function _destroy() {
    return cleanupHandlers.map(rm => rm()) // should be sparse array w/ length === # of cleanup method calls
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

  function _postRender({elem, data, column, rowIndex}) {
    let thead = table.querySelector('thead');
    if (!thead) { throw new Error('No table head found!!!!!') }
    thead.addEventListener('click', _columnClicked)
    cleanupHandlers.push(() => thead.removeEventListener('click', _columnClicked))
    return arguments[0]
  }

  // function _postHeader({elem, data, column, rowIndex}) {
  //   elem.addEventListener('click', _columnClicked)
  //   return arguments[0]
  // }

  function sortByColumn(_sortBy) {
    sortBy = _sortBy
    updateView()
    triggerRender()
    triggerSorted()
  }

  function _preHeaderField({elem, data, column, rowIndex}) {
    elem.setAttribute('sort', column.sort)
    return arguments[0]
  }

}
