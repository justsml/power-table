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
	        console.info('plugin skipped row', rowIndex, row);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzZTExMTczODllOTUzYTcxYTI5ZSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz85NDg4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsNEdBQWtKLEU7Ozs7Ozs7Ozs7OztTQ0dsSSxLLEdBQUEsSzs7QUFIaEI7O0FBQ0E7O0FBRU8sVUFBUyxLQUFULENBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QjtBQUNsQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQThEO0FBQzdFLE9BQUksQ0FBQyxN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VUFBYSxPQUFRO0FBQ2hDLE9BQU0sWUFBWSxTQUFTLHNCQUFULEVBQWxCO0FBQ0EsT0FBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0EsT0FBSSxTQUFKLEdBQWdCLElBQWhCLEM7QUFDQSxXQUFRLElBQUksUUFBWixFQUNHLE9BREgsQ0FDVztBQUFBLFlBQU0sVUFBVSxXQUFWLENBQXNCLEVBQXRCLENBQU47QUFBQSxJQURYO0FBRUEsVUFBTyxTQUFQO0FBQ0QsRUFQTSxDIiwiZmlsZSI6InBvd2VyLXRhYmxlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlBvd2VyVGFibGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiUG93ZXJUYWJsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgM2UxMTE3Mzg5ZTk1M2E3MWEyOWVcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIlBvd2VyVGFibGVcIl0gPSByZXF1aXJlKFwiLSEvVXNlcnMvZGxldnkvY29kZS9vc3MvcG93ZXItdGFibGUvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInByZXNldHNcXFwiOltcXFwiZXMyMDE1XFxcIl19IS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9wb3dlci10YWJsZS9pbmRleC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge1RhYmxlIGFzIFR9IGZyb20gJy4vc3JjL3RhYmxlJztcbmltcG9ydCB7U2VsZWN0YWJsZX0gZnJvbSAnLi9zcmMvcGx1Z2lucy9zZWxlY3RhYmxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlKGVsZW0sIGNvbmZpZykge1xuICBpZiAoIWVsZW0pICAgeyB0aHJvdyBuZXcgRXJyb3IoJ1RhYmxlIGluc3RhbmNlIHJlcXVpcmVzIDFzdCBwYXJhbSBgZWxlbWAnKTsgfVxuICBpZiAoIWNvbmZpZykgeyB0aHJvdyBuZXcgRXJyb3IoJ1RhYmxlIGluc3RhbmNlIHJlcXVpcmVzIDJuZCBwYXJhbSBgY29uZmlnYCcpOyB9XG4gIGlmICghY29uZmlnLnBsdWdpbnMpIHtjb25maWcucGx1Z2lucyA9IFtdO31cbiAgY29uZmlnLnBsdWdpbnMucHVzaChTZWxlY3RhYmxlKTtcbiAgcmV0dXJuIFQoZWxlbSwgY29uZmlnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQge3JlbmRlclRhYmxlSGVhZCwgcmVuZGVyVGFibGVCb2R5fSBmcm9tICcuL3JlbmRlcidcbmltcG9ydCB7UGx1Z2luSG9va3N9IGZyb20gJy4vcGx1Z2lucydcblxuZXhwb3J0IHtUYWJsZX1cblxuZnVuY3Rpb24gVGFibGUoZWwsIGNvbmZpZykge1xuICBsZXQgdGFibGUsIGNzcywgaG9va3M7XG4gIGNvbnN0IGN0eCA9IHsgZGVzdHJveSB9OyAvLyBQbGFpbiBvYmplY3QgYGN0eGAgd2lsbCBiZSByZXR1cm5lZCAtIHVzZSBPYmplY3QuYXNzaWduIHRvIGV4dGVuZFxuXG4gIGNvbmZpZyA9IENvbmZpZyhjb25maWcpO1xuXG4gIE9iamVjdC5hc3NpZ24oY3R4LCBjb25maWcpO1xuXG4gIGZ1bmN0aW9uIF9yZXNldExheW91dCgpIHtcbiAgICB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcbiAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKCdwb3dlci10YWJsZScpXG4gICAgT2JqZWN0LmFzc2lnbihjdHgsIHt0YWJsZX0pXG4gICAgLy8gZW1wdHkgY29udGVudHNcbiAgICBlbC5pbm5lckhUTUwgPSAnJztcbiAgICAvLyBBcnJheS5mcm9tKGVsLmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IGVsLnJlbW92ZUNoaWxkKGNoaWxkKSlcbiAgICBlbC5hcHBlbmRDaGlsZCh0YWJsZSlcbiAgICByZXR1cm4gdGFibGVcbiAgfVxuICBmdW5jdGlvbiBfaW5qZWN0U3R5bGVzKCkge1xuICAgIGNzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlI2hvcml6b250YWwtdGFibGUnKVxuICAgIGlmICghY3NzKSB7XG4gICAgICBjb25zdCBzdHlsZXMgPSByZXF1aXJlKCchY3NzIWxlc3MhLi9zdHlsZS5sZXNzJylcbiAgICAgIGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICAgIGNzcy5pZCA9ICdob3Jpem9udGFsLVRhYmxlJ1xuICAgICAgY3NzLmlubmVySFRNTCA9IHN0eWxlc1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjc3MpXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9sb2FkUGx1Z2lucygpIHtcbiAgICAvLyAndW5wYWNrcycvcnVucyBwbHVnaW5zXG4gICAgY29uc3QgcGx1Z2lucyA9IGNvbmZpZy5wbHVnaW5zID8gY29uZmlnLnBsdWdpbnMubWFwKHAgPT4gcChjdHgpKSA6IFtdXG4gICAgLy8gZXh0ZW5kIGN0eCB3aXRoIHBsdWdpbi5taXhpbnNcbiAgICBwbHVnaW5zLm1hcChwID0+IHR5cGVvZiBwLm1peGlucyA9PT0gJ29iamVjdCcgPyBPYmplY3QuYXNzaWduKGN0eCwgcC5taXhpbnMpIDogY3R4KVxuICAgIC8vIEFkZCBgaG9va3NgICYgYHBsdWdpbnNgIHRvIHJldHVybiBvYmplY3RcbiAgICBPYmplY3QuYXNzaWduKGN0eCwge3BsdWdpbnMsICdob29rcyc6IFBsdWdpbkhvb2tzKHtwbHVnaW5zfSl9KVxuICAgIGhvb2tzID0gY3R4Lmhvb2tzXG4gIH1cbiAgZnVuY3Rpb24gX3JlbmRlcigpIHtcblxuICAgIHJlbmRlclRhYmxlSGVhZChjdHgpXG4gICAgICAudGhlbih0aGVhZCA9PiB7XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRoZWFkKVxuICAgICAgICBob29rcy5wb3N0SGVhZGVyKHtlbGVtOiB0aGVhZH0pXG4gICAgICB9KVxuXG4gICAgcmVuZGVyVGFibGVCb2R5KGN0eClcbiAgICAgIC50aGVuKHRib2R5ID0+IHtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGJvZHkpXG4gICAgICAgIGhvb2tzLnBvc3RSZW5kZXIoe2VsZW06IHRhYmxlfSlcbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBfaW5qZWN0U3R5bGVzKCk7XG4gICAgX3Jlc2V0TGF5b3V0KCk7XG4gICAgX2xvYWRQbHVnaW5zKCk7XG4gICAgX3JlbmRlcigpO1xuICAgIHJldHVybiBjdHg7XG4gIH1cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAoY3NzKSAgIHsgY3NzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3NzKTsgfVxuICAgIGlmICh0YWJsZSkgeyB0YWJsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhYmxlKTsgfVxuICAgIHJldHVybiBjdHg7XG4gIH1cbiAgcmV0dXJuIGluaXQoKTtcbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90YWJsZS5qc1xuICoqLyIsImltcG9ydCB7Q29sdW1ufSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHtDb25maWd9O1xuXG5mdW5jdGlvbiBDb25maWcoe2NvbHVtbnMsIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoW10pLCBwbHVnaW5zID0gW10sIGRlYnVnID0gZmFsc2UsIGhhbmRsZXJzID0gW119KSB7XG4gIGNvbHVtbnMgPSBjb2x1bW5zLm1hcChDb2x1bW4pXG4gIHJldHVybiB7Y29sdW1ucywgZGF0YSwgcGx1Z2lucywgZGVidWcsIGhhbmRsZXJzfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbmZpZy5qc1xuICoqLyIsIlxuZXhwb3J0IHtDb2x1bW59O1xuXG4vLyA8aW5wdXQgaWQ9XCJ0b2dnbGVDaGVja0FsbFwiIHR5cGU9XCJjaGVja2JveFwiIHRpdGxlPVwiQ2hlY2svVW5jaGVjayBBbGxcIiB2YWx1ZT1cIlwiIC8+XG5cbmZ1bmN0aW9uIENvbHVtbihvcHRzKSB7XG4gIHZhciBrZXkgPSAodHlwZW9mIG9wdHMucmVuZGVyID09PSAnc3RyaW5nJyA/IG9wdHMucmVuZGVyXG4gICAgICAgICAgICA6IG9wdHMua2V5ID8gb3B0cy5rZXlcbiAgICAgICAgICAgIDogb3B0cy5zb3J0KSB8fCBudWxsLFxuICAgICAgY2xhc3NlcyAgPSBvcHRzLmNsYXNzIHx8IG9wdHMuY2xhc3NlcyB8fCAnJyxcbiAgICAgIHRpdGxlICAgID0gb3B0cy50aXRsZSB8fCBrZXksXG4gICAgICBzb3J0ICAgICA9IG9wdHMuc29ydCAgfHwga2V5LFxuICAgICAgY29scyAgICAgPSBvcHRzLmNvbHMgIHx8IDIsXG4gICAgICByZW5kZXIgICA9IG9wdHMucmVuZGVyO1xuICBjbGFzc2VzID0gQXJyYXkuaXNBcnJheShjbGFzc2VzKSA/IGNsYXNzZXNcbiAgICAgICAgICAgIDogdHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnICYmIGNsYXNzZXMuaW5kZXhPZignICcpID4gLTEgPyBjbGFzc2VzLnNwbGl0KCcgJylcbiAgICAgICAgICAgIDogdHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnICYmIGNsYXNzZXMubGVuZ3RoID49IDEgPyBbY2xhc3Nlc10gOiBbXTtcbiAgaWYgKGNsYXNzZXMubGVuZ3RoIDw9IDApIHtcbiAgICBjbGFzc2VzLnB1c2goYHRibC14cy0ke2NvbHN9YCk7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3B0cywge2tleSwgdGl0bGUsIGNsYXNzZXMsIHNvcnQsIHJlbmRlcn0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90eXBlcy5qc1xuICoqLyIsIlxuZXhwb3J0IHtyZW5kZXJUYWJsZUhlYWQsIHJlbmRlclRhYmxlQm9keX07XG5cbmZ1bmN0aW9uIHJlbmRlclRhYmxlSGVhZCh7Y29sdW1ucywgaG9va3N9KSB7XG4gIGNvbnN0IHRoZWFkICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgY29uc3QgdHIgICAgICAgPSBjb2x1bW5zLnJlZHVjZSgodHIsIGMpID0+IHtcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gICAgaG9va3MucHJlSGVhZGVyRmllbGQoe2VsZW0sIGNvbHVtbjogY30pXG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKC4uLmMuY2xhc3Nlcyk7XG4gICAgZWxlbS5pbm5lckhUTUwgPSBjLnRpdGxlO1xuICAgIGVsZW0ucmVuZGVyICAgID0gYy5yZW5kZXI7XG4gICAgZWxlbS5vcHRzICAgICAgPSBjLm9wdHM7XG4gICAgdHIuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgcmV0dXJuIHRyO1xuICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgdGhlYWQuYXBwZW5kQ2hpbGQodHIpO1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoZWFkKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFibGVCb2R5KHtkYXRhLCBjb2x1bW5zLCBob29rc30pIHtcbiAgaWYgKCFkYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcignRGF0YSBpcyBudWxsLiBUcnkgc2V0IHsgZGF0YTogPFByb21pc2V8QXJyYXk+IH0gaW4gUG93ZXJUYWJsZSBvcHRpb25zJylcbiAgICByZXR1cm4gW11cbiAgfVxuICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YS50aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgZGF0YSA9IFByb21pc2UucmVzb2x2ZShkYXRhIHx8IFtdKVxuICB9XG4gIHJldHVybiBkYXRhLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnN0IGJlZm9yZSA9IGhvb2tzLnByZVJlbmRlcih7ZGF0YX0pXG4gICAgZGF0YSA9IEFycmF5LmlzQXJyYXkoYmVmb3JlLmRhdGEpID8gYmVmb3JlLmRhdGEgOiBkYXRhIHx8IFtdXG4gICAgcmV0dXJuIGRhdGEucmVkdWNlKCh0Ym9keSwgcm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgY29uc3QgcHJlID0gaG9va3MucHJlUm93KHtlbGVtOiB0Ym9keSwgcm93SW5kZXgsIGRhdGE6IHJvd30pXG4gICAgICBpZiAoIXByZS5kYXRhKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbygncGx1Z2luIHNraXBwZWQgcm93Jywgcm93SW5kZXgsIHJvdylcbiAgICAgICAgcmV0dXJuIHRib2R5XG4gICAgICB9XG4gICAgICBjb25zdCB0YmxSb3cgPSBjb2x1bW5zLnJlZHVjZSgodHIsIGNvbHVtbikgPT4ge1xuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICB0ci5hcHBlbmRDaGlsZChlbGVtKVxuICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoLi4uY29sdW1uLmNsYXNzZXMpXG4gICAgICAgIGVsZW0uaW5uZXJIVE1MID0gdHlwZW9mIGNvbHVtbi5yZW5kZXIgPT09ICdmdW5jdGlvbicgPyBjb2x1bW4ucmVuZGVyKHtyb3csIGVsZW0sIGNvbHVtbn0pIDogcm93W2NvbHVtbi5rZXldXG4gICAgICAgIGhvb2tzLnBvc3RDZWxsKHtlbGVtLCBjb2x1bW4sIHJvd0luZGV4LCBkYXRhOiByb3d9KVxuICAgICAgICByZXR1cm4gdHJcbiAgICAgIH0sIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpXG4gICAgICBob29rcy5wb3N0Um93KHtlbGVtOiB0YmxSb3csIHJvd0luZGV4LCBkYXRhOiByb3d9KVxuICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQodGJsUm93KVxuICAgICAgcmV0dXJuIHRib2R5XG4gICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSlcbiAgfSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlbmRlci5qc1xuICoqLyIsIi8qKlxuICogVXRpbGl0eSAmIHJ1bm5lciBmb3IgcGx1Z2lucyBsb2FkZWQgaW4gYSBnaXZlbiBjb250ZXh0OlxuICovXG5leHBvcnQge1BsdWdpbkhvb2tzfVxuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IG9mIGtleWVkIGZ1bmN0aW9ucyB3aGljaCB3aWxsIHJ1biBhZ2FpbnN0IGFueSBgaGFuZGxlcnNgIGluIGFueSBvZiB0aGUgcGx1Z2lucyBnaXZlblxuICovXG5mdW5jdGlvbiBQbHVnaW5Ib29rcyh7cGx1Z2luc30pIHtcbiAgY29uc3QgY3JlYXRlSG9vayA9IChldmVudE5hbWUpID0+ICh7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pID0+IHtcbiAgICByZXR1cm4gcGx1Z2lucy5yZWR1Y2UoKG9iaiwgcCkgPT4ge1xuICAgICAgaWYgKCFvYmopIHsgcmV0dXJuIG9iajsgfSAvLyBwcm9jZXNzaW5nIHdhcyBjYW5jZWxsZWQgYnkgYSBwbHVnaW5cbiAgICAgIHZhciB0cmFuc2Zvcm1lZCA9IHR5cGVvZiBwLmhhbmRsZXJzW2V2ZW50TmFtZV0gPT09ICdmdW5jdGlvbicgPyBwLmhhbmRsZXJzW2V2ZW50TmFtZV0ob2JqKSA6IG9ialxuICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkXG4gICAgfSwge2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KVxuICB9XG4gIC8vIEFkZCB0aGVzZSBvbiB0aGUgYGhhbmRsZXJzYCBrZXkgb24geW91ciBwbHVnaW5zXG4gIHJldHVybiB7XG4gICAgcHJlUmVuZGVyOiAgICAgICAgICBjcmVhdGVIb29rKCdwcmVSZW5kZXInKSxcbiAgICBwb3N0UmVuZGVyOiAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RSZW5kZXInKSxcbiAgICBwcmVSb3c6ICAgICAgICAgICAgIGNyZWF0ZUhvb2soJ3ByZVJvdycpLFxuICAgIHBvc3RSb3c6ICAgICAgICAgICAgY3JlYXRlSG9vaygncG9zdFJvdycpLFxuICAgIHByZUNlbGw6ICAgICAgICAgICAgY3JlYXRlSG9vaygncHJlQ2VsbCcpLFxuICAgIHBvc3RDZWxsOiAgICAgICAgICAgY3JlYXRlSG9vaygncG9zdENlbGwnKSxcbiAgICBwcmVIZWFkZXJGaWVsZDogICAgIGNyZWF0ZUhvb2soJ3ByZUhlYWRlckZpZWxkJyksXG4gICAgcG9zdEhlYWRlcjogICAgICAgICBjcmVhdGVIb29rKCdwb3N0SGVhZGVyJyksXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BsdWdpbnMvaW5kZXguanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi51bnNlbGVjdGFibGUge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnRibC14cy0xLFxcbi50YmwteHMtMixcXG4udGJsLXhzLTMsXFxuLnRibC14cy00LFxcbi50YmwteHMtNSxcXG4udGJsLXhzLTYsXFxuLnRibC14cy03LFxcbi50YmwteHMtOCxcXG4udGJsLXhzLTksXFxuLnRibC14cy0xMCxcXG4udGJsLXhzLTExLFxcbi50YmwteHMtMTIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLnRibC14cy0xIHtcXG4gIHdpZHRoOiA4LjMzMzMlO1xcbn1cXG4udGJsLXhzLTIge1xcbiAgd2lkdGg6IDE2LjY2NjYlO1xcbn1cXG4udGJsLXhzLTMge1xcbiAgd2lkdGg6IDI0Ljk5OTklO1xcbn1cXG4udGJsLXhzLTQge1xcbiAgd2lkdGg6IDMzLjMzMzIlO1xcbn1cXG4udGJsLXhzLTUge1xcbiAgd2lkdGg6IDQxLjY2NjUlO1xcbn1cXG4udGJsLXhzLTYge1xcbiAgd2lkdGg6IDQ5Ljk5OTglO1xcbn1cXG4udGJsLXhzLTcge1xcbiAgd2lkdGg6IDU4LjMzMzElO1xcbn1cXG4udGJsLXhzLTgge1xcbiAgd2lkdGg6IDY2LjY2NjQlO1xcbn1cXG4udGJsLXhzLTkge1xcbiAgd2lkdGg6IDc0Ljk5OTclO1xcbn1cXG4udGJsLXhzLTEwIHtcXG4gIHdpZHRoOiA4My4zMzMxJTtcXG59XFxuLnRibC14cy0xMSB7XFxuICB3aWR0aDogOTEuNjY2MyU7XFxufVxcbi50YmwteHMtMTIge1xcbiAgd2lkdGg6IDk5Ljk5OTYlO1xcbn1cXG4ucG93ZXItdGFibGUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbn1cXG4ucG93ZXItdGFibGUgdHIge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ucG93ZXItdGFibGUgdGhlYWQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRoZWFkIHRoIHtcXG4gIC8qIGRncmlkLWlzaCAqL1xcbiAgYmFja2dyb3VuZDogI2YyZjJmMjtcXG4gIGNvbG9yOiAjNjI2MjYyO1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNBQUE7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgZm9udC1zaXplOiAxLjMxZW07XFxuICBwYWRkaW5nOiA2cHggMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1heC1oZWlnaHQ6IDM1cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkge1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkZGRkO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci13aWR0aDogMHB4IDBweCAwcHggMXB4O1xcbiAgcGFkZGluZzogNnB4IDNweDtcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcbiAgaGVpZ2h0OiAyNTBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdGQge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIG1hcmdpbjogMDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IC5yb3ctb2RkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlY2VjZWMgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzIGVhc2Utb3V0O1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuZGlzYWJsZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2ggIWltcG9ydGFudDtcXG4gIGN1cnNvcjogbm9uZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLmRpc2FibGVkIGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHI6aG92ZXIgLm5hbWUge1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0IwQjBCMCAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLnNlbGVjdGVkIC5uYW1lIHtcXG4gIHBhZGRpbmctbGVmdDogNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWxlZnQge1xcbiAgdGV4dC1hbGlnbjogbGVmdCAgICAhaW1wb3J0YW50O1xcbn1cXG4ucG93ZXItdGFibGUgLnRleHQtY2VudGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlciAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LXJpZ2h0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0ICAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWp1c3RpZnkge1xcbiAgdGV4dC1hbGlnbjoganVzdGlmeSAhaW1wb3J0YW50O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3NyYy9zdHlsZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtnZXRJZH0gZnJvbSAnLi4vdXRpbCdcblxuZXhwb3J0IGZ1bmN0aW9uIFNlbGVjdGFibGUoe3RhYmxlfSkge1xuICBjb25zdCBzZWxlY3RlZCA9IFtdO1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdzZWxlY3RhYmxlJyxcbiAgICBtaXhpbnM6IHtcbiAgICAgIGlzU2VsZWN0ZWQsXG4gICAgICBzZWxlY3RBZGQsXG4gICAgICBzZWxlY3RBbGwsXG4gICAgICBzZWxlY3RUb2dnbGUsXG4gICAgICBnZXRTZWxlY3RlZCxcbiAgICAgIHNlbGVjdE5vbmUsXG4gICAgICBzZWxlY3RSZW1vdmVcbiAgICB9LFxuICAgIGhhbmRsZXJzOiB7XG4gICAgICBwcmVIZWFkZXJGaWVsZDogICBfcHJlSGVhZGVyRmllbGQsXG4gICAgICBwb3N0SGVhZGVyOiAgICAgICBfcG9zdEhlYWRlcixcblxuICAgIH0sXG4gIH1cblxuICBjb25zdCBzZWxlY3RBbGxUb2dnbGVDbGljayA9IChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgIHNlbGVjdEFsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3ROb25lKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2VsZWN0SXRlbUNsaWNrID0gKGUpID0+IHtcbiAgICBsZXQgZWwgPSBlLnRhcmdldDtcbiAgICBpZiAoZWwuY2hlY2tlZCkge1xuICAgICAgc2VsZWN0SXRlbShlbC52YWx1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdEl0ZW0oZWwudmFsdWUsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfcG9zdEhlYWRlcih7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pIHtcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2hhbmRsZVNlbGVjdClcbiAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICB9XG5cbiAgZnVuY3Rpb24gX3ByZUhlYWRlckZpZWxkKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGlmIChjb2x1bW4uc2VsZWN0aW9uKSB7XG4gICAgICBjb2x1bW4udGl0bGUgPSBgPGlucHV0IGlkPVwidG9nZ2xlQ2hlY2tBbGxcIiB0eXBlPVwiY2hlY2tib3hcIiB0aXRsZT1cIkNoZWNrL1VuY2hlY2sgQWxsXCIgdmFsdWU9XCJcIiAvPmA7XG4gICAgICBjb2x1bW4ucmVuZGVyID0gKHtlbGVtLCBjb2x1bW4sIHJvd30pID0+IHtcbiAgICAgICAgbGV0IF9nZXRJZCA9IGNvbHVtbi5nZXRJZCB8fCBnZXRJZDtcbiAgICAgICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCIke19nZXRJZChyb3cpfVwiICR7aXNTZWxlY3RlZChfZ2V0SWQocm93KSkgPyAnIGNoZWNrZWQ9XCJjaGVja2VkXCInIDogJyd9IC8+YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdEFsbCgpIHtcbiAgICBBcnJheS5mcm9tKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rpb24tY29sIFt0eXBlPVwiY2hlY2tib3hcIl0nKSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oZWwpIHtyZXR1cm4gZWwudmFsdWU7fSlcbiAgICAgIC5tYXAoc2VsZWN0SXRlbS5iaW5kKG51bGwsIHRydWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdE5vbmUoKSB7XG4gICAgQXJyYXkuZnJvbSh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0aW9uLWNvbCBbdHlwZT1cImNoZWNrYm94XCJdJykpXG4gICAgICAubWFwKGZ1bmN0aW9uKGVsKSB7cmV0dXJuIGVsLnZhbHVlO30pXG4gICAgICAubWFwKHNlbGVjdEl0ZW0uYmluZChudWxsLCBmYWxzZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0SXRlbShpZCwgYm9vbCkge1xuICAgIGlmICh0eXBlb2YgYm9vbCA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGlkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIC8vIHJldmVyc2UgcGFyYW1zXG4gICAgICBbaWQsIGJvb2xdID0gW2Jvb2wsIGlkXTtcbiAgICB9XG4gICAgaWYgKCFpZCkge3JldHVybiBmYWxzZTt9XG5cbiAgICB2YXIgY2hrID0gdGFibGUucXVlcnlTZWxlY3RvcignW3R5cGU9XCJjaGVja2JveFwiXVt2YWx1ZT1cIicgKyBpZCArICdcIl0nKTtcbiAgICBpZiAoY2hrKSB7XG4gICAgICAvLyBzZWUgaWYgd2UgYXJlIGluICd0b2dnbGUgbW9kZSdcbiAgICAgIGlmICh0eXBlb2YgYm9vbCA9PT0gJ3VuZGVmaW5lZCcgfHwgYm9vbCA9PT0gbnVsbCkge1xuICAgICAgICBib29sID0gIWNoay5jaGVja2VkOyAvLyBUb2dnbGUgaXQhXG4gICAgICB9XG4gICAgICBpZiAoYm9vbCkge1xuICAgICAgICBjaGsuY2hlY2tlZCA9ICdjaGVja2VkJztcbiAgICAgICAgY2hrLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgICAgIGNoay5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkLmluZGV4T2YoaWQpID09PSAtMSkge3NlbGVjdGVkLnB1c2goaWQpO31cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoay5jaGVja2VkID0gdW5kZWZpbmVkO1xuICAgICAgICBjaGsucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gICAgICAgIGNoay5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkLmluZGV4T2YoaWQpICE9PSAtMSkge3NlbGVjdGVkLnNwbGljZShzZWxlY3RlZC5pbmRleE9mKGlkKSwgMSk7fVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdHVzVG90YWxzKHRoaXMudXNlcnMubGVuZ3RoLCBzZWxlY3RlZC5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHsnaWQnOiBpZCwgJ2NoZWNrZWQnOiBib29sLCAnZWxlbSc6IGNoa307XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTZWxlY3RlZCgpIHsgcmV0dXJuIHNlbGVjdGVkOyB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0VG9nZ2xlKGlkKSB7XG4gICAgcmV0dXJuIHNlbGVjdEl0ZW0uYmluZCh0aGlzKShpZCwgdW5kZWZpbmVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdEFkZChpZCkge1xuICAgIHJldHVybiBzZWxlY3RJdGVtLmJpbmQodGhpcykoaWQsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0UmVtb3ZlKGlkKSB7XG4gICAgcmV0dXJuIHNlbGVjdEl0ZW0uYmluZCh0aGlzKShpZCwgZmFsc2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTZWxlY3RlZChpZCkge1xuICAgIHJldHVybiBzZWxlY3RlZC5pbmRleE9mKGlkKSA+IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gX2hhbmRsZVNlbGVjdChlKSB7XG4gICAgdmFyIGVsLCB2YWw7XG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgIHZhbCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RSJykge1xuICAgICAgZWwgPSBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcbiAgICAgIGlmIChlbCAmJiBlbC52YWx1ZSkgeyB2YWwgPSBlbC52YWx1ZTsgfVxuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJykge1xuICAgICAgZWwgPSBlLnRhcmdldC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuICAgICAgaWYgKGVsICYmIGVsLnZhbHVlKSB7IHZhbCA9IGVsLnZhbHVlOyB9XG4gICAgfVxuXG4gICAgY29uc29sZS53YXJuKCdfaGFuZGxlU2VsZWN0IFRyaWdnZXJlZCcsIHZhbCwgZWwsIGUpO1xuICAgIGlmICh2YWwpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VsZWN0VG9nZ2xlKHZhbCk7XG4gICAgfVxuICB9XG5cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGx1Z2lucy9zZWxlY3RhYmxlLmpzXG4gKiovIiwiXG4vKipcbiAqIFV0aWxpdHkgYXJyYXlpZnkgbWV0aG9kXG4gKiBBZGQgdG8gLnByb3RvdHlwZSBvZiBJdGVyYXRvcnMsIEFycmF5QnVmZmVyLCBBcmd1bWVudHMsIE5vZGVMaXN0LCBTZXQvV2Vha1NldCwgd2hhdGV2ZXIgI1lPTE9cbiAqXG4gKiAuLi4gT3IganVzdCB1c2UgYXMgdXRpbCwgYXMgbmVlZGVkLCAjSnVzdERvSXRcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KGxpc3QpIHtcbiAgbGlzdCA9IEFycmF5LmlzQXJyYXkobGlzdCkgPyBsaXN0IDogdGhpc1xuICByZXR1cm4gQXJyYXkuZnJvbSAmJiBBcnJheS5mcm9tKGxpc3QpIHx8IFsndXBncmFkZSB5b3VyIGJyb3dzZXIsIHBmZnQnXVxufVxuXG4vKipcbiAqIEdldCBgQXJyYXkuc29ydGAgZnVuY3Rpb24gZm9yIGtleSBuYW1lIGNvbXBhcmlzb25zIChzdXBwb3J0cyByZXZlcnNlKVxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJ2VtYWlsICAgLS0tIFNvcnQgZW1haWwgYXNjZW5kaW5nLlxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJy1lbWFpbCAgLS0tIFNvcnQgZW1haWwgZGVzY2VuZGluZ1xuICpcbiAqIEByZXR1cm5zIFtmdW5jdGlvbl0gY29tcGFyZXIgdXNlZCBpbiBgQXJyYXkuc29ydCgpYFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvcnRlcihrZXkpIHtcbiAgY29uc3QgX2VuZ2xpc2hTb3J0ICAgICAgICAgPSAoYSwgYikgPT4gKGFba2V5XSA8IGJba2V5XSA/IC0xIDogKGFba2V5XSA+IGJba2V5XSA/IDEgOiAwKSlcbiAgY29uc3QgX2VuZ2xpc2hTb3J0UmV2ZXJzZWQgPSAoYSwgYikgPT4gKGFba2V5XSA+PSBiW2tleV0gPyAtMSA6IChhW2tleV0gPCBiW2tleV0gPyAxIDogMCkpXG5cbiAgaWYgKGtleVswXSA9PT0gJy0nKSB7XG4gICAga2V5ID0ga2V5LnN1YnN0cigxKTtcbiAgICByZXR1cm4gX2VuZ2xpc2hTb3J0UmV2ZXJzZWQ7XG4gIH1cbiAgcmV0dXJuIF9lbmdsaXNoU29ydDtcbn1cblxuLyoqXG4gKiBBY2NlcHRzIGVsZW1lbnRzIGZyb20gYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgXG4gKlxuICogUmVtb3ZlcyBhbGwgY2hpbGRyZW4gb2YgQG5vZGVcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGwobm9kZSkge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7IG5vZGUgPSB0aGlzOyB9XG5cbiAgdG9BcnJheShub2RlKVxuICAgIC5mb3JFYWNoKGVsID0+IGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCkpXG4gIHJldHVybiBub2RlXG59XG5cbi8qKlxuICogVG90ZXMgb2J2aVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWQoe2lkLCBfaWR9KSB7IHJldHVybiBpZCB8fCBfaWQ7IH1cblxuXG4vKipcbiAqIFdhcm5pbmc6IFByaXZhdGUvbG9jYWwgdXNlIG9ubHkuIERvIG5vdCBob2lzdC5cbiAqICoqKiBVbnNhZmUgSFRNTC9zdHJpbmcgaGFuZGxpbmcgKioqXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtID0gaHRtbCA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBkaXYuaW5uZXJIVE1MID0gaHRtbCAvLyBQb3RlbnRpYWwgU2VjdXJpdHkgRXhwbG9pdCBWZWN0b3IhISEhISFcbiAgdG9BcnJheShkaXYuY2hpbGRyZW4pXG4gICAgLmZvckVhY2goZWwgPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKGVsKSlcbiAgcmV0dXJuIGNvbnRhaW5lclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9