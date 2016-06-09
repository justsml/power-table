(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PowerTable"] = factory();
	else
		root["PowerTable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["PowerTable"] = __webpack_require__(1);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Table = Table;
	
	var _table = __webpack_require__(2);
	
	var _selectable = __webpack_require__(9);
	
	function Table(elem, config) {
	  if (!elem) {
	    throw new Error('Table instance requires 1st param `elem`');
	  }
	  if (!config) {
	    throw new Error('Table instance requires 2nd param `config`');
	  }
	  if (!config.plugins) {
	    config.plugins = [];
	  }
	  config.plugins.push(_selectable.Selectable);
	  return (0, _table.Table)(elem, config);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Table = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _config = __webpack_require__(3);
	
	var _render2 = __webpack_require__(5);
	
	var _plugins = __webpack_require__(6);
	
	exports.Table = Table;
	
	
	function Table(el, config) {
	  var table = void 0,
	      css = void 0,
	      hooks = void 0;
	  var ctx = { destroy: destroy }; // Plain object `ctx` will be returned - use Object.assign to extend
	
	  config = (0, _config.Config)(config);
	
	  Object.assign(ctx, config);
	
	  function _resetLayout() {
	    table = document.createElement('table');
	    table.classList.add('power-table');
	    Object.assign(ctx, { table: table });
	    // empty contents
	    el.innerHTML = '';
	    // Array.from(el.children).forEach(child => el.removeChild(child))
	    el.appendChild(table);
	    return table;
	  }
	  function _injectStyles() {
	    css = document.querySelector('style#horizontal-table');
	    if (!css) {
	      var styles = __webpack_require__(7);
	      css = document.createElement('style');
	      css.id = 'horizontal-Table';
	      css.innerHTML = styles;
	      document.head.appendChild(css);
	    }
	  }
	  function _loadPlugins() {
	    // 'unpacks'/runs plugins
	    var plugins = config.plugins ? config.plugins.map(function (p) {
	      return p(ctx);
	    }) : [];
	    // extend ctx with plugin.mixins
	    plugins.map(function (p) {
	      return _typeof(p.mixins) === 'object' ? Object.assign(ctx, p.mixins) : ctx;
	    });
	    // Add `hooks` & `plugins` to return object
	    Object.assign(ctx, { plugins: plugins, 'hooks': (0, _plugins.PluginHooks)({ plugins: plugins }) });
	    hooks = ctx.hooks;
	  }
	  function _render() {
	
	    (0, _render2.renderTableHead)(ctx).then(function (thead) {
	      table.appendChild(thead);
	      hooks.postHeader({ elem: thead });
	    });
	
	    (0, _render2.renderTableBody)(ctx).then(function (tbody) {
	      table.appendChild(tbody);
	      hooks.postRender({ elem: table });
	    });
	  }
	  function init() {
	    _injectStyles();
	    _resetLayout();
	    _loadPlugins();
	    _render();
	    return ctx;
	  }
	  function destroy() {
	    if (css) {
	      css.parentNode.removeChild(css);
	    }
	    if (table) {
	      table.parentNode.removeChild(table);
	    }
	    return ctx;
	  }
	  return init();
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Config = undefined;
	
	var _types = __webpack_require__(4);
	
	exports.Config = Config;
	
	
	function Config(_ref) {
	  var columns = _ref.columns;
	  var _ref$data = _ref.data;
	  var data = _ref$data === undefined ? Promise.resolve([]) : _ref$data;
	  var _ref$plugins = _ref.plugins;
	  var plugins = _ref$plugins === undefined ? [] : _ref$plugins;
	  var _ref$debug = _ref.debug;
	  var debug = _ref$debug === undefined ? false : _ref$debug;
	  var _ref$handlers = _ref.handlers;
	  var handlers = _ref$handlers === undefined ? [] : _ref$handlers;
	
	  columns = columns.map(_types.Column);
	  return { columns: columns, data: data, plugins: plugins, debug: debug, handlers: handlers };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Column = Column;
	
	// <input id="toggleCheckAll" type="checkbox" title="Check/Uncheck All" value="" />
	
	function Column(opts) {
	  var key = (typeof opts.render === 'string' ? opts.render : opts.key ? opts.key : opts.sort) || null,
	      classes = opts.class || opts.classes || '',
	      title = opts.title || key,
	      sort = opts.sort || key,
	      cols = opts.cols || 2,
	      render = opts.render;
	  classes = Array.isArray(classes) ? classes : typeof classes === 'string' && classes.indexOf(' ') > -1 ? classes.split(' ') : typeof classes === 'string' && classes.length >= 1 ? [classes] : [];
	  if (classes.length <= 0) {
	    classes.push('tbl-xs-' + cols);
	  }
	  return Object.assign(opts, { key: key, title: title, classes: classes, sort: sort, render: render });
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.renderTableHead = renderTableHead;
	exports.renderTableBody = renderTableBody;
	
	
	function renderTableHead(_ref) {
	  var columns = _ref.columns;
	  var hooks = _ref.hooks;
	
	  var thead = document.createElement('thead');
	  var tr = columns.reduce(function (tr, c) {
	    var _elem$classList;
	
	    var elem = document.createElement('th');
	    hooks.preHeaderField({ elem: elem, column: c });
	    (_elem$classList = elem.classList).add.apply(_elem$classList, _toConsumableArray(c.classes));
	    elem.innerHTML = c.title;
	    elem.render = c.render;
	    elem.opts = c.opts;
	    tr.appendChild(elem);
	    return tr;
	  }, document.createElement('tr'));
	  thead.appendChild(tr);
	  return Promise.resolve(thead);
	}
	
	function renderTableBody(_ref2) {
	  var data = _ref2.data;
	  var columns = _ref2.columns;
	  var hooks = _ref2.hooks;
	
	  if (!data) {
	    console.error('Data is null. Try set { data: <Promise|Array> } in PowerTable options');
	    return [];
	  }
	  if (data && typeof data.then !== 'function') {
	    data = Promise.resolve(data || []);
	  }
	  return data.then(function (data) {
	    var before = hooks.preRender({ data: data });
	    data = Array.isArray(before.data) ? before.data : data || [];
	    return data.reduce(function (tbody, row, rowIndex) {
	      var pre = hooks.preRow({ elem: tbody, rowIndex: rowIndex, data: row });
	      if (!pre.data) {
	        console.error('plugin skipped row', rowIndex, row);
	        return tbody;
	      }
	      var tblRow = columns.reduce(function (tr, column) {
	        var _elem$classList2;
	
	        var elem = document.createElement('td');
	        tr.appendChild(elem);
	        (_elem$classList2 = elem.classList).add.apply(_elem$classList2, _toConsumableArray(column.classes));
	        elem.innerHTML = typeof column.render === 'function' ? column.render({ row: row, elem: elem, column: column }) : row[column.key];
	        hooks.postCell({ elem: elem, column: column, rowIndex: rowIndex, data: row });
	        return tr;
	      }, document.createElement('tr'));
	      hooks.postRow({ elem: tblRow, rowIndex: rowIndex, data: row });
	      tbody.appendChild(tblRow);
	      return tbody;
	    }, document.createElement('tbody'));
	  });
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Utility & runner for plugins loaded in a given context:
	 */
	exports.PluginHooks = PluginHooks;
	
	/**
	 * Returns an object of keyed functions which will run against any `handlers` in any of the plugins given
	 */
	
	function PluginHooks(_ref) {
	  var plugins = _ref.plugins;
	
	  var createHook = function createHook(eventName) {
	    return function (_ref2) {
	      var elem = _ref2.elem;
	      var data = _ref2.data;
	      var column = _ref2.column;
	      var rowIndex = _ref2.rowIndex;
	
	      return plugins.reduce(function (obj, p) {
	        if (!obj) {
	          return obj;
	        } // processing was cancelled by a plugin
	        var transformed = typeof p.handlers[eventName] === 'function' ? p.handlers[eventName](obj) : obj;
	        return transformed;
	      }, { elem: elem, data: data, column: column, rowIndex: rowIndex });
	    };
	  };
	  // Add these on the `handlers` key on your plugins
	  return {
	    preRender: createHook('preRender'),
	    postRender: createHook('postRender'),
	    preRow: createHook('preRow'),
	    postRow: createHook('postRow'),
	    preCell: createHook('preCell'),
	    postCell: createHook('postCell'),
	    preHeaderField: createHook('preHeaderField'),
	    postHeader: createHook('postHeader')
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".unselectable {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.tbl-xs-1,\n.tbl-xs-2,\n.tbl-xs-3,\n.tbl-xs-4,\n.tbl-xs-5,\n.tbl-xs-6,\n.tbl-xs-7,\n.tbl-xs-8,\n.tbl-xs-9,\n.tbl-xs-10,\n.tbl-xs-11,\n.tbl-xs-12 {\n  display: inline-block;\n  box-sizing: border-box;\n}\n.tbl-xs-1 {\n  width: 8.3333%;\n}\n.tbl-xs-2 {\n  width: 16.6666%;\n}\n.tbl-xs-3 {\n  width: 24.9999%;\n}\n.tbl-xs-4 {\n  width: 33.3332%;\n}\n.tbl-xs-5 {\n  width: 41.6665%;\n}\n.tbl-xs-6 {\n  width: 49.9998%;\n}\n.tbl-xs-7 {\n  width: 58.3331%;\n}\n.tbl-xs-8 {\n  width: 66.6664%;\n}\n.tbl-xs-9 {\n  width: 74.9997%;\n}\n.tbl-xs-10 {\n  width: 83.3331%;\n}\n.tbl-xs-11 {\n  width: 91.6663%;\n}\n.tbl-xs-12 {\n  width: 99.9996%;\n}\n.power-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.power-table tr {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  display: inline-block;\n  width: 100%;\n}\n.power-table thead {\n  display: block;\n  position: relative;\n  width: 100%;\n}\n.power-table thead th {\n  /* dgrid-ish */\n  background: #f2f2f2;\n  color: #626262;\n  border: 0;\n  border-bottom: 1px solid #AAA;\n  display: inline-block;\n  font-weight: 900;\n  font-size: 1.31em;\n  padding: 6px 0;\n  cursor: pointer;\n  max-height: 35px;\n  overflow: hidden;\n}\n.power-table tbody {\n  border-color: #dddddd;\n  border-style: solid;\n  border-width: 0px 0px 0px 1px;\n  padding: 6px 3px;\n  overflow-y: hidden;\n  display: block;\n  overflow-y: scroll;\n  height: 250px;\n  width: 100%;\n}\n.power-table tbody td {\n  display: inline-block;\n  text-align: left;\n  margin: 0;\n}\n.power-table tbody .row-odd {\n  background-color: #ececec !important;\n}\n.power-table tbody tr {\n  cursor: pointer;\n  width: 100%;\n  display: inline-block;\n  transition: background-color 0.2s ease-out;\n}\n.power-table tbody tr.disabled {\n  text-decoration: line-through !important;\n  cursor: none;\n}\n.power-table tbody tr.disabled input[type=\"checkbox\"] {\n  display: none;\n  -ms-user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n.power-table tbody tr:hover .name {\n  font-style: italic;\n}\n.power-table tbody tr.selected {\n  background-color: #B0B0B0 !important;\n  font-weight: 700;\n}\n.power-table tbody tr.selected .name {\n  padding-left: 4px;\n  font-weight: 700;\n}\n.power-table .text-left {\n  text-align: left    !important;\n}\n.power-table .text-center {\n  text-align: center  !important;\n}\n.power-table .text-right {\n  text-align: right   !important;\n}\n.power-table .text-justify {\n  text-align: justify !important;\n}\n", ""]);
	
	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Selectable = Selectable;
	
	var _util = __webpack_require__(10);
	
	function Selectable(_ref) {
	  var table = _ref.table;
	
	  var selected = [];
	  return {
	    name: 'selectable',
	    mixins: {
	      isSelected: isSelected,
	      selectAdd: selectAdd,
	      selectAll: selectAll,
	      selectToggle: selectToggle,
	      getSelected: getSelected,
	      selectNone: selectNone,
	      selectRemove: selectRemove
	    },
	    handlers: {
	      preHeaderField: _preHeaderField,
	      postHeader: _postHeader
	
	    }
	  };
	
	  var selectAllToggleClick = function selectAllToggleClick(e) {
	    if (e.target.checked) {
	      selectAll();
	    } else {
	      selectNone();
	    }
	  };
	
	  var selectItemClick = function selectItemClick(e) {
	    var el = e.target;
	    if (el.checked) {
	      selectItem(el.value, true);
	    } else {
	      selectItem(el.value, false);
	    }
	  };
	
	  function _postHeader(_ref2) {
	    var elem = _ref2.elem;
	    var data = _ref2.data;
	    var column = _ref2.column;
	    var rowIndex = _ref2.rowIndex;
	
	    elem.addEventListener('click', _handleSelect);
	    return arguments[0];
	  }
	
	  function _preHeaderField(_ref3) {
	    var elem = _ref3.elem;
	    var data = _ref3.data;
	    var column = _ref3.column;
	    var rowIndex = _ref3.rowIndex;
	
	    if (column.selection) {
	      column.title = '<input id="toggleCheckAll" type="checkbox" title="Check/Uncheck All" value="" />';
	      column.render = function (_ref4) {
	        var elem = _ref4.elem;
	        var column = _ref4.column;
	        var row = _ref4.row;
	
	        var _getId = column.getId || _util.getId;
	        return '<input type="checkbox" value="' + _getId(row) + '" ' + (isSelected(_getId(row)) ? ' checked="checked"' : '') + ' />';
	      };
	    }
	    return arguments[0];
	  }
	
	  function selectAll() {
	    Array.from(table.querySelectorAll('.selection-col [type="checkbox"]')).map(function (el) {
	      return el.value;
	    }).map(selectItem.bind(null, true));
	  }
	
	  function selectNone() {
	    Array.from(table.querySelectorAll('.selection-col [type="checkbox"]')).map(function (el) {
	      return el.value;
	    }).map(selectItem.bind(null, false));
	  }
	
	  function selectItem(id, bool) {
	    if (typeof bool === 'string' && typeof id === 'boolean') {
	      var _ref5 = [bool, id];
	      // reverse params
	
	      id = _ref5[0];
	      bool = _ref5[1];
	    }
	    if (!id) {
	      return false;
	    }
	
	    var chk = table.querySelector('[type="checkbox"][value="' + id + '"]');
	    if (chk) {
	      // see if we are in 'toggle mode'
	      if (typeof bool === 'undefined' || bool === null) {
	        bool = !chk.checked; // Toggle it!
	      }
	      if (bool) {
	        chk.checked = 'checked';
	        chk.setAttribute('checked', 'checked');
	        chk.parentNode.parentNode.classList.add('selected');
	        if (selected.indexOf(id) === -1) {
	          selected.push(id);
	        }
	      } else {
	        chk.checked = undefined;
	        chk.removeAttribute('checked');
	        chk.parentNode.parentNode.classList.remove('selected');
	        if (selected.indexOf(id) !== -1) {
	          selected.splice(selected.indexOf(id), 1);
	        }
	      }
	    }
	
	    this.setStatusTotals(this.users.length, selected.length);
	
	    return { 'id': id, 'checked': bool, 'elem': chk };
	  }
	
	  function getSelected() {
	    return selected;
	  }
	
	  function selectToggle(id) {
	    return selectItem.bind(this)(id, undefined);
	  }
	
	  function selectAdd(id) {
	    return selectItem.bind(this)(id, true);
	  }
	
	  function selectRemove(id) {
	    return selectItem.bind(this)(id, false);
	  }
	
	  function isSelected(id) {
	    return selected.indexOf(id) > -1;
	  }
	
	  function _handleSelect(e) {
	    var el, val;
	    if (e.target.tagName === 'INPUT') {
	      val = e.target.value;
	    } else if (e.target.tagName === 'TR') {
	      el = e.target.querySelector('input[type="checkbox"]');
	      if (el && el.value) {
	        val = el.value;
	      }
	    } else if (e.target.tagName === 'TD') {
	      el = e.target.parentNode.querySelector('input[type="checkbox"]');
	      if (el && el.value) {
	        val = el.value;
	      }
	    }
	
	    console.warn('_handleSelect Triggered', val, el, e);
	    if (val) {
	      e.preventDefault();
	      this.selectToggle(val);
	    }
	  }
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArray = toArray;
	exports.getSorter = getSorter;
	exports.removeAll = removeAll;
	exports.getId = getId;
	
	/**
	 * Utility arrayify method
	 * Add to .prototype of Iterators, ArrayBuffer, Arguments, NodeList, Set/WeakSet, whatever #YOLO
	 *
	 * ... Or just use as util, as needed, #JustDoIt
	 *
	 */
	function toArray(list) {
	  list = Array.isArray(list) ? list : this;
	  return Array.from && Array.from(list) || ['upgrade your browser, pfft'];
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
	function getSorter(key) {
	  var _englishSort = function _englishSort(a, b) {
	    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
	  };
	  var _englishSortReversed = function _englishSortReversed(a, b) {
	    return a[key] >= b[key] ? -1 : a[key] < b[key] ? 1 : 0;
	  };
	
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
	function removeAll(node) {
	  if (this instanceof NodeList) {
	    node = this;
	  }
	
	  toArray(node).forEach(function (el) {
	    return el.parentNode && el.parentNode.removeChild(el);
	  });
	  return node;
	}
	
	/**
	 * Totes obvi
	 */
	function getId(_ref) {
	  var id = _ref.id;
	  var _id = _ref._id;
	  return id || _id;
	}
	
	/**
	 * Warning: Private/local use only. Do not hoist.
	 * *** Unsafe HTML/string handling ***
	 */
	var createElem = exports.createElem = function createElem(html) {
	  var container = document.createDocumentFragment();
	  var div = document.createElement('div');
	  div.innerHTML = html; // Potential Security Exploit Vector!!!!!!
	  toArray(div.children).forEach(function (el) {
	    return container.appendChild(el);
	  });
	  return container;
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyMWQ0OGRjNDZkNDEyNTVhNjQ2NSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz85NDg4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsNEdBQWtKLEU7Ozs7Ozs7Ozs7OztTQ0dsSSxLLEdBQUEsSzs7QUFIaEI7O0FBQ0E7O0FBRU8sVUFBUyxLQUFULENBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QjtBQUNsQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQThEO0FBQzdFLE9BQUksQ0FBQyxN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VUFBYSxDQUFDLElBQUQsRUFBVTtBQUNsQyxPQUFNLFlBQVksU0FBUyxzQkFBVCxFQUFsQjtBQUNBLE9BQU0sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLE9BQUksU0FBSixHQUFnQixJQUFoQixDO0FBQ0EsV0FBUSxJQUFJLFFBQVosRUFDRyxPQURILENBQ1c7QUFBQSxZQUFNLFVBQVUsV0FBVixDQUFzQixFQUF0QixDQUFOO0FBQUEsSUFEWDtBQUVBLFVBQU8sU0FBUDtBQUNELEVBUE0sQyIsImZpbGUiOiJwb3dlci10YWJsZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJQb3dlclRhYmxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBvd2VyVGFibGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDIxZDQ4ZGM0NmQ0MTI1NWE2NDY1XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJQb3dlclRhYmxlXCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL3Bvd2VyLXRhYmxlL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJwcmVzZXRzXFxcIjpbXFxcImVzMjAxNVxcXCJdfSEvVXNlcnMvZGxldnkvY29kZS9vc3MvcG93ZXItdGFibGUvaW5kZXguanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtUYWJsZSBhcyBUfSBmcm9tICcuL3NyYy90YWJsZSc7XG5pbXBvcnQge1NlbGVjdGFibGV9IGZyb20gJy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBUYWJsZShlbGVtLCBjb25maWcpIHtcbiAgaWYgKCFlbGVtKSAgIHsgdGhyb3cgbmV3IEVycm9yKCdUYWJsZSBpbnN0YW5jZSByZXF1aXJlcyAxc3QgcGFyYW0gYGVsZW1gJyk7IH1cbiAgaWYgKCFjb25maWcpIHsgdGhyb3cgbmV3IEVycm9yKCdUYWJsZSBpbnN0YW5jZSByZXF1aXJlcyAybmQgcGFyYW0gYGNvbmZpZ2AnKTsgfVxuICBpZiAoIWNvbmZpZy5wbHVnaW5zKSB7Y29uZmlnLnBsdWdpbnMgPSBbXTt9XG4gIGNvbmZpZy5wbHVnaW5zLnB1c2goU2VsZWN0YWJsZSk7XG4gIHJldHVybiBUKGVsZW0sIGNvbmZpZyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHtyZW5kZXJUYWJsZUhlYWQsIHJlbmRlclRhYmxlQm9keX0gZnJvbSAnLi9yZW5kZXInXG5pbXBvcnQge1BsdWdpbkhvb2tzfSBmcm9tICcuL3BsdWdpbnMnXG5cbmV4cG9ydCB7VGFibGV9XG5cbmZ1bmN0aW9uIFRhYmxlKGVsLCBjb25maWcpIHtcbiAgbGV0IHRhYmxlLCBjc3MsIGhvb2tzO1xuICBjb25zdCBjdHggPSB7IGRlc3Ryb3kgfTsgLy8gUGxhaW4gb2JqZWN0IGBjdHhgIHdpbGwgYmUgcmV0dXJuZWQgLSB1c2UgT2JqZWN0LmFzc2lnbiB0byBleHRlbmRcblxuICBjb25maWcgPSBDb25maWcoY29uZmlnKTtcblxuICBPYmplY3QuYXNzaWduKGN0eCwgY29uZmlnKTtcblxuICBmdW5jdGlvbiBfcmVzZXRMYXlvdXQoKSB7XG4gICAgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgdGFibGUuY2xhc3NMaXN0LmFkZCgncG93ZXItdGFibGUnKVxuICAgIE9iamVjdC5hc3NpZ24oY3R4LCB7dGFibGV9KVxuICAgIC8vIGVtcHR5IGNvbnRlbnRzXG4gICAgZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8gQXJyYXkuZnJvbShlbC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiBlbC5yZW1vdmVDaGlsZChjaGlsZCkpXG4gICAgZWwuYXBwZW5kQ2hpbGQodGFibGUpXG4gICAgcmV0dXJuIHRhYmxlXG4gIH1cbiAgZnVuY3Rpb24gX2luamVjdFN0eWxlcygpIHtcbiAgICBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNob3Jpem9udGFsLXRhYmxlJylcbiAgICBpZiAoIWNzcykge1xuICAgICAgY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnIWNzcyFsZXNzIS4vc3R5bGUubGVzcycpXG4gICAgICBjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgICBjc3MuaWQgPSAnaG9yaXpvbnRhbC1UYWJsZSdcbiAgICAgIGNzcy5pbm5lckhUTUwgPSBzdHlsZXNcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzKVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBfbG9hZFBsdWdpbnMoKSB7XG4gICAgLy8gJ3VucGFja3MnL3J1bnMgcGx1Z2luc1xuICAgIGNvbnN0IHBsdWdpbnMgPSBjb25maWcucGx1Z2lucyA/IGNvbmZpZy5wbHVnaW5zLm1hcChwID0+IHAoY3R4KSkgOiBbXVxuICAgIC8vIGV4dGVuZCBjdHggd2l0aCBwbHVnaW4ubWl4aW5zXG4gICAgcGx1Z2lucy5tYXAocCA9PiB0eXBlb2YgcC5taXhpbnMgPT09ICdvYmplY3QnID8gT2JqZWN0LmFzc2lnbihjdHgsIHAubWl4aW5zKSA6IGN0eClcbiAgICAvLyBBZGQgYGhvb2tzYCAmIGBwbHVnaW5zYCB0byByZXR1cm4gb2JqZWN0XG4gICAgT2JqZWN0LmFzc2lnbihjdHgsIHtwbHVnaW5zLCAnaG9va3MnOiBQbHVnaW5Ib29rcyh7cGx1Z2luc30pfSlcbiAgICBob29rcyA9IGN0eC5ob29rc1xuICB9XG4gIGZ1bmN0aW9uIF9yZW5kZXIoKSB7XG5cbiAgICByZW5kZXJUYWJsZUhlYWQoY3R4KVxuICAgICAgLnRoZW4odGhlYWQgPT4ge1xuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0aGVhZClcbiAgICAgICAgaG9va3MucG9zdEhlYWRlcih7ZWxlbTogdGhlYWR9KVxuICAgICAgfSlcblxuICAgIHJlbmRlclRhYmxlQm9keShjdHgpXG4gICAgICAudGhlbih0Ym9keSA9PiB7XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRib2R5KVxuICAgICAgICBob29rcy5wb3N0UmVuZGVyKHtlbGVtOiB0YWJsZX0pXG4gICAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgX2luamVjdFN0eWxlcygpO1xuICAgIF9yZXNldExheW91dCgpO1xuICAgIF9sb2FkUGx1Z2lucygpO1xuICAgIF9yZW5kZXIoKTtcbiAgICByZXR1cm4gY3R4O1xuICB9XG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaWYgKGNzcykgICB7IGNzcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNzcyk7IH1cbiAgICBpZiAodGFibGUpIHsgdGFibGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWJsZSk7IH1cbiAgICByZXR1cm4gY3R4O1xuICB9XG4gIHJldHVybiBpbml0KCk7XG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGFibGUuanNcbiAqKi8iLCJpbXBvcnQge0NvbHVtbn0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCB7Q29uZmlnfTtcblxuZnVuY3Rpb24gQ29uZmlnKHtjb2x1bW5zLCBkYXRhID0gUHJvbWlzZS5yZXNvbHZlKFtdKSwgcGx1Z2lucyA9IFtdLCBkZWJ1ZyA9IGZhbHNlLCBoYW5kbGVycyA9IFtdfSkge1xuICBjb2x1bW5zID0gY29sdW1ucy5tYXAoQ29sdW1uKVxuICByZXR1cm4ge2NvbHVtbnMsIGRhdGEsIHBsdWdpbnMsIGRlYnVnLCBoYW5kbGVyc307XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCJcbmV4cG9ydCB7Q29sdW1ufTtcblxuLy8gPGlucHV0IGlkPVwidG9nZ2xlQ2hlY2tBbGxcIiB0eXBlPVwiY2hlY2tib3hcIiB0aXRsZT1cIkNoZWNrL1VuY2hlY2sgQWxsXCIgdmFsdWU9XCJcIiAvPlxuXG5mdW5jdGlvbiBDb2x1bW4ob3B0cykge1xuICB2YXIga2V5ID0gKHR5cGVvZiBvcHRzLnJlbmRlciA9PT0gJ3N0cmluZycgPyBvcHRzLnJlbmRlclxuICAgICAgICAgICAgOiBvcHRzLmtleSA/IG9wdHMua2V5XG4gICAgICAgICAgICA6IG9wdHMuc29ydCkgfHwgbnVsbCxcbiAgICAgIGNsYXNzZXMgID0gb3B0cy5jbGFzcyB8fCBvcHRzLmNsYXNzZXMgfHwgJycsXG4gICAgICB0aXRsZSAgICA9IG9wdHMudGl0bGUgfHwga2V5LFxuICAgICAgc29ydCAgICAgPSBvcHRzLnNvcnQgIHx8IGtleSxcbiAgICAgIGNvbHMgICAgID0gb3B0cy5jb2xzICB8fCAyLFxuICAgICAgcmVuZGVyICAgPSBvcHRzLnJlbmRlcjtcbiAgY2xhc3NlcyA9IEFycmF5LmlzQXJyYXkoY2xhc3NlcykgPyBjbGFzc2VzXG4gICAgICAgICAgICA6IHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJyAmJiBjbGFzc2VzLmluZGV4T2YoJyAnKSA+IC0xID8gY2xhc3Nlcy5zcGxpdCgnICcpXG4gICAgICAgICAgICA6IHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJyAmJiBjbGFzc2VzLmxlbmd0aCA+PSAxID8gW2NsYXNzZXNdIDogW107XG4gIGlmIChjbGFzc2VzLmxlbmd0aCA8PSAwKSB7XG4gICAgY2xhc3Nlcy5wdXNoKGB0YmwteHMtJHtjb2xzfWApO1xuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG9wdHMsIHtrZXksIHRpdGxlLCBjbGFzc2VzLCBzb3J0LCByZW5kZXJ9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdHlwZXMuanNcbiAqKi8iLCJcbmV4cG9ydCB7cmVuZGVyVGFibGVIZWFkLCByZW5kZXJUYWJsZUJvZHl9O1xuXG5mdW5jdGlvbiByZW5kZXJUYWJsZUhlYWQoe2NvbHVtbnMsIGhvb2tzfSkge1xuICBjb25zdCB0aGVhZCAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJyk7XG4gIGNvbnN0IHRyICAgICAgID0gY29sdW1ucy5yZWR1Y2UoKHRyLCBjKSA9PiB7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgIGhvb2tzLnByZUhlYWRlckZpZWxkKHtlbGVtLCBjb2x1bW46IGN9KVxuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCguLi5jLmNsYXNzZXMpO1xuICAgIGVsZW0uaW5uZXJIVE1MID0gYy50aXRsZTtcbiAgICBlbGVtLnJlbmRlciAgICA9IGMucmVuZGVyO1xuICAgIGVsZW0ub3B0cyAgICAgID0gYy5vcHRzO1xuICAgIHRyLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIHJldHVybiB0cjtcbiAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gIHRoZWFkLmFwcGVuZENoaWxkKHRyKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGVhZCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhYmxlQm9keSh7ZGF0YSwgY29sdW1ucywgaG9va3N9KSB7XG4gIGlmICghZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGEgaXMgbnVsbC4gVHJ5IHNldCB7IGRhdGE6IDxQcm9taXNlfEFycmF5PiB9IGluIFBvd2VyVGFibGUgb3B0aW9ucycpXG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEudGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoZGF0YSB8fCBbXSlcbiAgfVxuICByZXR1cm4gZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBiZWZvcmUgPSBob29rcy5wcmVSZW5kZXIoe2RhdGF9KVxuICAgIGRhdGEgPSBBcnJheS5pc0FycmF5KGJlZm9yZS5kYXRhKSA/IGJlZm9yZS5kYXRhIDogZGF0YSB8fCBbXVxuICAgIHJldHVybiBkYXRhLnJlZHVjZSgodGJvZHksIHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHByZSA9IGhvb2tzLnByZVJvdyh7ZWxlbTogdGJvZHksIHJvd0luZGV4LCBkYXRhOiByb3d9KVxuICAgICAgaWYgKCFwcmUuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdwbHVnaW4gc2tpcHBlZCByb3cnLCByb3dJbmRleCwgcm93KVxuICAgICAgICByZXR1cm4gdGJvZHlcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRibFJvdyA9IGNvbHVtbnMucmVkdWNlKCh0ciwgY29sdW1uKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgIHRyLmFwcGVuZENoaWxkKGVsZW0pXG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCguLi5jb2x1bW4uY2xhc3NlcylcbiAgICAgICAgZWxlbS5pbm5lckhUTUwgPSB0eXBlb2YgY29sdW1uLnJlbmRlciA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5yZW5kZXIoe3JvdywgZWxlbSwgY29sdW1ufSkgOiByb3dbY29sdW1uLmtleV1cbiAgICAgICAgaG9va3MucG9zdENlbGwoe2VsZW0sIGNvbHVtbiwgcm93SW5kZXgsIGRhdGE6IHJvd30pXG4gICAgICAgIHJldHVybiB0clxuICAgICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSlcbiAgICAgIGhvb2tzLnBvc3RSb3coe2VsZW06IHRibFJvdywgcm93SW5kZXgsIGRhdGE6IHJvd30pXG4gICAgICB0Ym9keS5hcHBlbmRDaGlsZCh0YmxSb3cpXG4gICAgICByZXR1cm4gdGJvZHlcbiAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKVxuICB9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyLmpzXG4gKiovIiwiLyoqXG4gKiBVdGlsaXR5ICYgcnVubmVyIGZvciBwbHVnaW5zIGxvYWRlZCBpbiBhIGdpdmVuIGNvbnRleHQ6XG4gKi9cbmV4cG9ydCB7UGx1Z2luSG9va3N9XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3Qgb2Yga2V5ZWQgZnVuY3Rpb25zIHdoaWNoIHdpbGwgcnVuIGFnYWluc3QgYW55IGBoYW5kbGVyc2AgaW4gYW55IG9mIHRoZSBwbHVnaW5zIGdpdmVuXG4gKi9cbmZ1bmN0aW9uIFBsdWdpbkhvb2tzKHtwbHVnaW5zfSkge1xuICBjb25zdCBjcmVhdGVIb29rID0gKGV2ZW50TmFtZSkgPT4gKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkgPT4ge1xuICAgIHJldHVybiBwbHVnaW5zLnJlZHVjZSgob2JqLCBwKSA9PiB7XG4gICAgICBpZiAoIW9iaikgeyByZXR1cm4gb2JqOyB9IC8vIHByb2Nlc3Npbmcgd2FzIGNhbmNlbGxlZCBieSBhIHBsdWdpblxuICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHlwZW9mIHAuaGFuZGxlcnNbZXZlbnROYW1lXSA9PT0gJ2Z1bmN0aW9uJyA/IHAuaGFuZGxlcnNbZXZlbnROYW1lXShvYmopIDogb2JqXG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWRcbiAgICB9LCB7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pXG4gIH1cbiAgLy8gQWRkIHRoZXNlIG9uIHRoZSBgaGFuZGxlcnNgIGtleSBvbiB5b3VyIHBsdWdpbnNcbiAgcmV0dXJuIHtcbiAgICBwcmVSZW5kZXI6ICAgICAgICAgIGNyZWF0ZUhvb2soJ3ByZVJlbmRlcicpLFxuICAgIHBvc3RSZW5kZXI6ICAgICAgICAgY3JlYXRlSG9vaygncG9zdFJlbmRlcicpLFxuICAgIHByZVJvdzogICAgICAgICAgICAgY3JlYXRlSG9vaygncHJlUm93JyksXG4gICAgcG9zdFJvdzogICAgICAgICAgICBjcmVhdGVIb29rKCdwb3N0Um93JyksXG4gICAgcHJlQ2VsbDogICAgICAgICAgICBjcmVhdGVIb29rKCdwcmVDZWxsJyksXG4gICAgcG9zdENlbGw6ICAgICAgICAgICBjcmVhdGVIb29rKCdwb3N0Q2VsbCcpLFxuICAgIHByZUhlYWRlckZpZWxkOiAgICAgY3JlYXRlSG9vaygncHJlSGVhZGVyRmllbGQnKSxcbiAgICBwb3N0SGVhZGVyOiAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RIZWFkZXInKSxcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGx1Z2lucy9pbmRleC5qc1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnVuc2VsZWN0YWJsZSB7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4udGJsLXhzLTEsXFxuLnRibC14cy0yLFxcbi50YmwteHMtMyxcXG4udGJsLXhzLTQsXFxuLnRibC14cy01LFxcbi50YmwteHMtNixcXG4udGJsLXhzLTcsXFxuLnRibC14cy04LFxcbi50YmwteHMtOSxcXG4udGJsLXhzLTEwLFxcbi50YmwteHMtMTEsXFxuLnRibC14cy0xMiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4udGJsLXhzLTEge1xcbiAgd2lkdGg6IDguMzMzMyU7XFxufVxcbi50YmwteHMtMiB7XFxuICB3aWR0aDogMTYuNjY2NiU7XFxufVxcbi50YmwteHMtMyB7XFxuICB3aWR0aDogMjQuOTk5OSU7XFxufVxcbi50YmwteHMtNCB7XFxuICB3aWR0aDogMzMuMzMzMiU7XFxufVxcbi50YmwteHMtNSB7XFxuICB3aWR0aDogNDEuNjY2NSU7XFxufVxcbi50YmwteHMtNiB7XFxuICB3aWR0aDogNDkuOTk5OCU7XFxufVxcbi50YmwteHMtNyB7XFxuICB3aWR0aDogNTguMzMzMSU7XFxufVxcbi50YmwteHMtOCB7XFxuICB3aWR0aDogNjYuNjY2NCU7XFxufVxcbi50YmwteHMtOSB7XFxuICB3aWR0aDogNzQuOTk5NyU7XFxufVxcbi50YmwteHMtMTAge1xcbiAgd2lkdGg6IDgzLjMzMzElO1xcbn1cXG4udGJsLXhzLTExIHtcXG4gIHdpZHRoOiA5MS42NjYzJTtcXG59XFxuLnRibC14cy0xMiB7XFxuICB3aWR0aDogOTkuOTk5NiU7XFxufVxcbi5wb3dlci10YWJsZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxufVxcbi5wb3dlci10YWJsZSB0ciB7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5wb3dlci10YWJsZSB0aGVhZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ucG93ZXItdGFibGUgdGhlYWQgdGgge1xcbiAgLyogZGdyaWQtaXNoICovXFxuICBiYWNrZ3JvdW5kOiAjZjJmMmYyO1xcbiAgY29sb3I6ICM2MjYyNjI7XFxuICBib3JkZXI6IDA7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0FBQTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBmb250LXNpemU6IDEuMzFlbTtcXG4gIHBhZGRpbmc6IDZweCAwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgbWF4LWhlaWdodDogMzVweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB7XFxuICBib3JkZXItY29sb3I6ICNkZGRkZGQ7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLXdpZHRoOiAwcHggMHB4IDBweCAxcHg7XFxuICBwYWRkaW5nOiA2cHggM3B4O1xcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxuICBoZWlnaHQ6IDI1MHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ZCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgbWFyZ2luOiAwO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgLnJvdy1vZGQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWNlYyAhaW1wb3J0YW50O1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgZWFzZS1vdXQ7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5kaXNhYmxlZCB7XFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCAhaW1wb3J0YW50O1xcbiAgY3Vyc29yOiBub25lO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuZGlzYWJsZWQgaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0cjpob3ZlciAubmFtZSB7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQjBCMEIwICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuc2VsZWN0ZWQgLm5hbWUge1xcbiAgcGFkZGluZy1sZWZ0OiA0cHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG4ucG93ZXItdGFibGUgLnRleHQtbGVmdCB7XFxuICB0ZXh0LWFsaWduOiBsZWZ0ICAgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1jZW50ZXIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyICAhaW1wb3J0YW50O1xcbn1cXG4ucG93ZXItdGFibGUgLnRleHQtcmlnaHQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQgICAhaW1wb3J0YW50O1xcbn1cXG4ucG93ZXItdGFibGUgLnRleHQtanVzdGlmeSB7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5ICFpbXBvcnRhbnQ7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2xlc3MtbG9hZGVyIS4vc3JjL3N0eWxlLmxlc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge2dldElkfSBmcm9tICcuLi91dGlsJ1xuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0YWJsZSh7dGFibGV9KSB7XG4gIGNvbnN0IHNlbGVjdGVkID0gW107XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3NlbGVjdGFibGUnLFxuICAgIG1peGluczoge1xuICAgICAgaXNTZWxlY3RlZCxcbiAgICAgIHNlbGVjdEFkZCxcbiAgICAgIHNlbGVjdEFsbCxcbiAgICAgIHNlbGVjdFRvZ2dsZSxcbiAgICAgIGdldFNlbGVjdGVkLFxuICAgICAgc2VsZWN0Tm9uZSxcbiAgICAgIHNlbGVjdFJlbW92ZVxuICAgIH0sXG4gICAgaGFuZGxlcnM6IHtcbiAgICAgIHByZUhlYWRlckZpZWxkOiAgIF9wcmVIZWFkZXJGaWVsZCxcbiAgICAgIHBvc3RIZWFkZXI6ICAgICAgIF9wb3N0SGVhZGVyLFxuXG4gICAgfSxcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdEFsbFRvZ2dsZUNsaWNrID0gKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgc2VsZWN0QWxsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdE5vbmUoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBzZWxlY3RJdGVtQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGxldCBlbCA9IGUudGFyZ2V0O1xuICAgIGlmIChlbC5jaGVja2VkKSB7XG4gICAgICBzZWxlY3RJdGVtKGVsLnZhbHVlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0SXRlbShlbC52YWx1ZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9wb3N0SGVhZGVyKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfaGFuZGxlU2VsZWN0KVxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gIH1cblxuICBmdW5jdGlvbiBfcHJlSGVhZGVyRmllbGQoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSB7XG4gICAgaWYgKGNvbHVtbi5zZWxlY3Rpb24pIHtcbiAgICAgIGNvbHVtbi50aXRsZSA9IGA8aW5wdXQgaWQ9XCJ0b2dnbGVDaGVja0FsbFwiIHR5cGU9XCJjaGVja2JveFwiIHRpdGxlPVwiQ2hlY2svVW5jaGVjayBBbGxcIiB2YWx1ZT1cIlwiIC8+YDtcbiAgICAgIGNvbHVtbi5yZW5kZXIgPSAoe2VsZW0sIGNvbHVtbiwgcm93fSkgPT4ge1xuICAgICAgICBsZXQgX2dldElkID0gY29sdW1uLmdldElkIHx8IGdldElkO1xuICAgICAgICByZXR1cm4gYDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIiR7X2dldElkKHJvdyl9XCIgJHtpc1NlbGVjdGVkKF9nZXRJZChyb3cpKSA/ICcgY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJ30gLz5gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICAgIEFycmF5LmZyb20odGFibGUucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdGlvbi1jb2wgW3R5cGU9XCJjaGVja2JveFwiXScpKVxuICAgICAgLm1hcChmdW5jdGlvbihlbCkge3JldHVybiBlbC52YWx1ZTt9KVxuICAgICAgLm1hcChzZWxlY3RJdGVtLmJpbmQobnVsbCwgdHJ1ZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0Tm9uZSgpIHtcbiAgICBBcnJheS5mcm9tKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rpb24tY29sIFt0eXBlPVwiY2hlY2tib3hcIl0nKSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oZWwpIHtyZXR1cm4gZWwudmFsdWU7fSlcbiAgICAgIC5tYXAoc2VsZWN0SXRlbS5iaW5kKG51bGwsIGZhbHNlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RJdGVtKGlkLCBib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgaWQgPT09ICdib29sZWFuJykge1xuICAgICAgLy8gcmV2ZXJzZSBwYXJhbXNcbiAgICAgIFtpZCwgYm9vbF0gPSBbYm9vbCwgaWRdO1xuICAgIH1cbiAgICBpZiAoIWlkKSB7cmV0dXJuIGZhbHNlO31cblxuICAgIHZhciBjaGsgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1cImNoZWNrYm94XCJdW3ZhbHVlPVwiJyArIGlkICsgJ1wiXScpO1xuICAgIGlmIChjaGspIHtcbiAgICAgIC8vIHNlZSBpZiB3ZSBhcmUgaW4gJ3RvZ2dsZSBtb2RlJ1xuICAgICAgaWYgKHR5cGVvZiBib29sID09PSAndW5kZWZpbmVkJyB8fCBib29sID09PSBudWxsKSB7XG4gICAgICAgIGJvb2wgPSAhY2hrLmNoZWNrZWQ7IC8vIFRvZ2dsZSBpdCFcbiAgICAgIH1cbiAgICAgIGlmIChib29sKSB7XG4gICAgICAgIGNoay5jaGVja2VkID0gJ2NoZWNrZWQnO1xuICAgICAgICBjaGsuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgY2hrLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQuaW5kZXhPZihpZCkgPT09IC0xKSB7c2VsZWN0ZWQucHVzaChpZCk7fVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hrLmNoZWNrZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNoay5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICAgICAgY2hrLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQuaW5kZXhPZihpZCkgIT09IC0xKSB7c2VsZWN0ZWQuc3BsaWNlKHNlbGVjdGVkLmluZGV4T2YoaWQpLCAxKTt9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0dXNUb3RhbHModGhpcy51c2Vycy5sZW5ndGgsIHNlbGVjdGVkLmxlbmd0aCk7XG5cbiAgICByZXR1cm4geydpZCc6IGlkLCAnY2hlY2tlZCc6IGJvb2wsICdlbGVtJzogY2hrfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNlbGVjdGVkKCkgeyByZXR1cm4gc2VsZWN0ZWQ7IH1cblxuICBmdW5jdGlvbiBzZWxlY3RUb2dnbGUoaWQpIHtcbiAgICByZXR1cm4gc2VsZWN0SXRlbS5iaW5kKHRoaXMpKGlkLCB1bmRlZmluZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0QWRkKGlkKSB7XG4gICAgcmV0dXJuIHNlbGVjdEl0ZW0uYmluZCh0aGlzKShpZCwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RSZW1vdmUoaWQpIHtcbiAgICByZXR1cm4gc2VsZWN0SXRlbS5iaW5kKHRoaXMpKGlkLCBmYWxzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1NlbGVjdGVkKGlkKSB7XG4gICAgcmV0dXJuIHNlbGVjdGVkLmluZGV4T2YoaWQpID4gLTE7XG4gIH1cblxuICBmdW5jdGlvbiBfaGFuZGxlU2VsZWN0KGUpIHtcbiAgICB2YXIgZWwsIHZhbDtcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgdmFsID0gZS50YXJnZXQudmFsdWU7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVFInKSB7XG4gICAgICBlbCA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuICAgICAgaWYgKGVsICYmIGVsLnZhbHVlKSB7IHZhbCA9IGVsLnZhbHVlOyB9XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVEQnKSB7XG4gICAgICBlbCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG4gICAgICBpZiAoZWwgJiYgZWwudmFsdWUpIHsgdmFsID0gZWwudmFsdWU7IH1cbiAgICB9XG5cbiAgICBjb25zb2xlLndhcm4oJ19oYW5kbGVTZWxlY3QgVHJpZ2dlcmVkJywgdmFsLCBlbCwgZSk7XG4gICAgaWYgKHZhbCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZWxlY3RUb2dnbGUodmFsKTtcbiAgICB9XG4gIH1cblxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL3NlbGVjdGFibGUuanNcbiAqKi8iLCJcbi8qKlxuICogVXRpbGl0eSBhcnJheWlmeSBtZXRob2RcbiAqIEFkZCB0byAucHJvdG90eXBlIG9mIEl0ZXJhdG9ycywgQXJyYXlCdWZmZXIsIEFyZ3VtZW50cywgTm9kZUxpc3QsIFNldC9XZWFrU2V0LCB3aGF0ZXZlciAjWU9MT1xuICpcbiAqIC4uLiBPciBqdXN0IHVzZSBhcyB1dGlsLCBhcyBuZWVkZWQsICNKdXN0RG9JdFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuICBsaXN0ID0gQXJyYXkuaXNBcnJheShsaXN0KSA/IGxpc3QgOiB0aGlzXG4gIHJldHVybiBBcnJheS5mcm9tICYmIEFycmF5LmZyb20obGlzdCkgfHwgWyd1cGdyYWRlIHlvdXIgYnJvd3NlciwgcGZmdCddXG59XG5cbi8qKlxuICogR2V0IGBBcnJheS5zb3J0YCBmdW5jdGlvbiBmb3Iga2V5IG5hbWUgY29tcGFyaXNvbnMgKHN1cHBvcnRzIHJldmVyc2UpXG4gKlxuICogV2hlbiBuYW1lID09PSAnZW1haWwgICAtLS0gU29ydCBlbWFpbCBhc2NlbmRpbmcuXG4gKlxuICogV2hlbiBuYW1lID09PSAnLWVtYWlsICAtLS0gU29ydCBlbWFpbCBkZXNjZW5kaW5nXG4gKlxuICogQHJldHVybnMgW2Z1bmN0aW9uXSBjb21wYXJlciB1c2VkIGluIGBBcnJheS5zb3J0KClgXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U29ydGVyKGtleSkge1xuICBjb25zdCBfZW5nbGlzaFNvcnQgICAgICAgICA9IChhLCBiKSA9PiAoYVtrZXldIDwgYltrZXldID8gLTEgOiAoYVtrZXldID4gYltrZXldID8gMSA6IDApKVxuICBjb25zdCBfZW5nbGlzaFNvcnRSZXZlcnNlZCA9IChhLCBiKSA9PiAoYVtrZXldID49IGJba2V5XSA/IC0xIDogKGFba2V5XSA8IGJba2V5XSA/IDEgOiAwKSlcblxuICBpZiAoa2V5WzBdID09PSAnLScpIHtcbiAgICBrZXkgPSBrZXkuc3Vic3RyKDEpO1xuICAgIHJldHVybiBfZW5nbGlzaFNvcnRSZXZlcnNlZDtcbiAgfVxuICByZXR1cm4gX2VuZ2xpc2hTb3J0O1xufVxuXG4vKipcbiAqIEFjY2VwdHMgZWxlbWVudHMgZnJvbSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbGBcbiAqXG4gKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBvZiBAbm9kZVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFsbChub2RlKSB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgTm9kZUxpc3QpIHsgbm9kZSA9IHRoaXM7IH1cblxuICB0b0FycmF5KG5vZGUpXG4gICAgLmZvckVhY2goZWwgPT4gZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKSlcbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBUb3RlcyBvYnZpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZCh7aWQsIF9pZH0pIHsgcmV0dXJuIGlkIHx8IF9pZDsgfVxuXG5cbi8qKlxuICogV2FybmluZzogUHJpdmF0ZS9sb2NhbCB1c2Ugb25seS4gRG8gbm90IGhvaXN0LlxuICogKioqIFVuc2FmZSBIVE1ML3N0cmluZyBoYW5kbGluZyAqKipcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW0gPSAoaHRtbCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZGl2LmlubmVySFRNTCA9IGh0bWwgLy8gUG90ZW50aWFsIFNlY3VyaXR5IEV4cGxvaXQgVmVjdG9yISEhISEhXG4gIHRvQXJyYXkoZGl2LmNoaWxkcmVuKVxuICAgIC5mb3JFYWNoKGVsID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbCkpXG4gIHJldHVybiBjb250YWluZXJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==