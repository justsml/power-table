import {Column} from './types';

export {Config};

function Config({columns, data = Promise.resolve([]), plugins = [], debug = false}) {
  columns = columns.map(Column)
  return {columns, data, plugins, debug};
}
