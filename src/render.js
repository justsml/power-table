import {Plugins} from './plugins';

export {renderTableHead, renderTableBody};

function renderTableHead({columns, plugins}) {
  const handlers = Plugins({plugins});
  const thead    = document.createElement('thead');
  const tr       = columns.reduce((tr, c) => {
    let elem = document.createElement('th');
    elem.classList.add.apply(elem, c.classes);
    elem.innerHTML = c.title;
    elem.render    = c.render;
    elem.opts      = c.opts;
    handlers.headerColumn({elem, column: c})
    tr.appendChild(elem);
    return tr;
  }, document.createElement('tr'));
  thead.appendChild(tr);
  return thead;
}

function renderTableBody({data, columns, plugins}) {
  const handlers = Plugins({plugins});
  const before = handlers.preRender({data});
  data = Array.isArray(before.data) ? before.data : data;
  return data.reduce((tbody, row, rowIndex) => {
    const pre = handlers.rowBefore({elem: tbody, rowIndex, data: row});
    if (!pre.data) {
      console.error('plugin skipped row', rowIndex, row);
      return tbody;
    }
    const tblRow = columns.reduce((tr, column) => {
      const elem = document.createElement('td');
      tr.appendChild(elem);
      elem.classList.add.apply(elem, column.classes);
      elem.innerHTML = typeof column.render === 'function' ? column.render(row, tr) : row[column.key];
      handlers.cellAfter({elem, column, rowIndex, data: row})
      return tr;
    }, document.createElement('tr'));
    handlers.rowAfter({elem: tblRow, rowIndex, data: row})
    tbody.appendChild(tblRow);
    return tbody;
  }, document.createElement('tbody'));
}

