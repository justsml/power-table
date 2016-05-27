import {Column} from './types';

export function config({columns, data, debug, handlers}) {
  columns = columns.map(Column);
  data = data || Promise.resolve([]);
  return {columns, data, debug, handlers};
}