import {Table as T} from './src/table'
import {Selectable} from './src/plugins/selectable'
import {Sortable}   from './src/plugins/sortable'

export function Table(elem, config) {
  if (!elem)   { throw new Error('Table instance requires 1st param `elem`') }
  if (!config) { throw new Error('Table instance requires 2nd param `config`') }
  if (!config.plugins) {config.plugins = []}

  // default plugins
  config.plugins.push(Sortable)
  // config.plugins.push(Selectable)

  return T(elem, config)
}
