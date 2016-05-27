import {Column} from './types';

export function config({columns, data = Promise.resolve([]), plugins = [], debug = false, handlers = []}) {
  columns = columns.map(Column)
  return {columns, data, plugins, debug, handlers};
}
