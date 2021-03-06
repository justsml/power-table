
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
    elem.column    = c;
    tr.appendChild(elem);
    hooks.postHeaderField({elem, column: c})
    return tr;
  }, document.createElement('tr'));
  thead.appendChild(tr);
  return Promise.resolve(thead);
}

function renderTableBody(ctx) {
  let {data, columns, hooks} = ctx
  if (!data) {
    console.error('Data is null. Try set { data: <Promise|Array> } in PowerTable options')
    return []
  }
  if (data && typeof data.then !== 'function') {
    data = Promise.resolve(data || [])
  }
  return data.then(function(data) {
    const before = hooks.preRender({data})
    ctx.data = (before && before.data ? before.data : data)

    console.error('renderTableBody.preRender.before =', before)

    data = (Array.isArray(before.data) ? before.data : data) || []
    return data.reduce((tbody, row, rowIndex) => {
      const pre = hooks.preRow({elem: tbody, rowIndex, data: row})
      if (!pre.data) {
        console.info('plugin skipped row', rowIndex, row)
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

