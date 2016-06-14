
/**
 * Utility arrayify method
 * Add to .prototype of Iterators, ArrayBuffer, Arguments, NodeList, Set/WeakSet, whatever #YOLO
 *
 * ... Or just use as util, as needed, #JustDoIt
 *
 */
export function toArray(list) {
  list = Array.isArray(list) ? list : this
  list = !list ? [] : list
  return Array.from && Array.from(list) || ['upgrade your browser, pfft']
}

/**
 * Get `Array.sort` function for key name comparisons (supports reverse)
 *
 * When name === 'email   --- Sort email ascending.
 *
 * When name === '-email  --- Sort email descending
 *
 * @returns [function] comparer used in `Array.sort()`
 *
 */
export function getSorter(key) {
  const _englishSort         = (a, b) => (a[key] < b[key] ? -1 : (a[key] > b[key] ? 1 : 0))
  const _englishSortReversed = (a, b) => (a[key] >= b[key] ? -1 : (a[key] < b[key] ? 1 : 0))

  if (key[0] === '-') {
    key = key.substr(1);
    return _englishSortReversed;
  }
  return _englishSort;
}

/**
 * Accepts elements from `document.querySelectorAll`
 *
 * Removes all children of @node
 *
 */
export function removeAll(node) {
  if (this instanceof NodeList) { node = this; }

  toArray(node)
    .forEach(el => el.parentNode && el.parentNode.removeChild(el))
  return node
}

/**
 * Totes obvi
 */
export function getId({id, _id, key}) { return id || _id || key; }


/**
 * Warning: Private/local use only. Do not hoist.
 * *** Unsafe HTML/string handling ***
 */
export const createElem = html => {
  const container = document.createDocumentFragment()
  const div = document.createElement('div')
  div.innerHTML = html // Potential Security Exploit Vector!!!!!!
  container.appendChild(div)
  return container
}