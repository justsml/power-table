
export function toArray() { return Array.from && Array.from(this) || ['upgrade your browser, pfft']; }

export function getSorter(name) {
  if (name[0] === '-') {
    name = name.substr(1);
    return function reverseEnglishSort(a, b) {
      return (a[name] >= b[name] ? -1 : (a[name] < b[name] ? 1 : 0));
    };
  }

  return function englishSort(a, b) {
    return (a[name] < b[name] ? -1 : (a[name] > b[name] ? 1 : 0));
  };
}

export function removeAll(_this) {
  if (this instanceof NodeList) { _this = this; }

  _this.toArray().forEach(function(el) {el.parentNode && el.parentNode.removeChild(el)});
}

