
export {renderTableHead, renderTableBody};

function renderTableHead({columns, hooks}) {
  const thead    = document.createElement('thead');
  const tr       = columns.reduce((tr, c) => {
    let elem = document.createElement('th');
    hooks.preHeaderField({elem, column: c})
    elem.classList.add(...c.classes);
    elem.innerHTML = c.title;
    elem.render    = c.render;
    elem.opts      = c.opts;
    tr.appendChild(elem);
    return tr;
  }, document.createElement('tr'));
  thead.appendChild(tr);
  return Promise.resolve(thead);
}

function renderTableBody({data, columns, hooks}) {
  if (!data) {
    console.error('Data is null. Try set { data: <Promise|Array> } in PowerTable options')
    return []
  }
  if (data && typeof data.then !== 'function') {
    data = Promise.resolve(data || [])
  }
  return data.then(function(data) {
    const before = hooks.preRender({data})
    data = Array.isArray(before.data) ? before.data : data || []
    return data.reduce((tbody, row, rowIndex) => {
      const pre = hooks.preRow({elem: tbody, rowIndex, data: row})
      if (!pre.data) {
        console.error('plugin skipped row', rowIndex, row)
        return tbody
      }
      const tblRow = columns.reduce((tr, column) => {
        const elem = document.createElement('td')
        tr.appendChild(elem)
        elem.classList.add(...column.classes)
        elem.innerHTML = typeof column.render === 'function' ? column.render({row, elem, column}) : row[column.key]
        hooks.postCell({elem, column, rowIndex, data: row})
        return tr
      }, document.createElement('tr'))
      hooks.postRow({elem: tblRow, rowIndex, data: row})
      tbody.appendChild(tblRow)
      return tbody
    }, document.createElement('tbody'))
  });
}

