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
	    // run plugins - 'unpacks' their interfaces
	    var plugins = config.plugins ? config.plugins.map(function (p) {
	      return p(ctx);
	    }) : [];
	    // extend ctx with plugin.mixins methods
	    plugins.map(function (p) {
	      if (p.name) {
	        ctx[p.name] = ctx[p.name] ? ctx[p.name] : {};
	      } else {
	        throw new Error('Plugin must have a `name` property');
	      }
	
	      if (_typeof(p.mixins) === 'object') {
	        Object.assign(ctx[p.name], p.mixins);
	      }
	
	      return p;
	    });
	    // Add `hooks` & `plugins` to return object
	    Object.assign(ctx, { plugins: plugins, 'hooks': (0, _plugins.PluginHooks)({ plugins: plugins }) });
	    hooks = ctx.hooks;
	  }
	  function _render() {
	
	    hooks.preRender(Object.assign({ 'elem': table }, ctx));
	
	    (0, _render2.renderTableHead)(ctx).then(function (thead) {
	      table.appendChild(thead);
	      hooks.postHeader({ 'elem': thead });
	    });
	
	    (0, _render2.renderTableBody)(ctx).then(function (tbody) {
	      table.appendChild(tbody);
	      hooks.postRender({ 'elem': table });
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
	    hooks.destroy(Object.assign({ 'elem': table }, ctx));
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
	    postHeader: createHook('postHeader'),
	    destroy: createHook('destroy')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4MDFmZGFkM2QwYTAwMDhlYWE1NyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz85NDg4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsNEdBQWtKLEU7Ozs7Ozs7Ozs7OztTQ0dsSSxLLEdBQUEsSzs7QUFIaEI7O0FBQ0E7O0FBRU8sVUFBUyxLQUFULENBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QjtBQUNsQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQThEO0FBQzdFLE9BQUksQ0FBQyxN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RCxVQUFPLFlBQVA7QUFDRDs7Ozs7Ozs7QUFRTSxVQUFTLFNBQVQsQ0FBbUIsSUFBbkIsRUFBeUI7QUFDOUIsT0FBSSxnQkFBZ0IsUUFBcEIsRUFBOEI7QUFBRSxZQUFPLElBQVA7QUFBYzs7QUFFOUMsV0FBUSxJQUFSLEVBQ0csT0FESCxDQUNXO0FBQUEsWUFBTSxHQUFHLFVBQUgsSUFBaUIsR0FBRyxVQUFILENBQWMsV0FBZCxDQUEwQixFQUExQixDQUF2QjtBQUFBLElBRFg7QUFFQSxVQUFPLElBQVA7QUFDRDs7Ozs7QUFLTSxVQUFTLEtBQVQsT0FBMEI7QUFBQSxPQUFWLEVBQVUsUUFBVixFQUFVO0FBQUEsT0FBTixHQUFNLFFBQU4sR0FBTTtBQUFFLFVBQU8sTUFBTSxHQUFiO0FBQW1COzs7Ozs7QUFPL0MsS0FBTSxrQ0FBYSxTQUFiLFVBQWEsT0FBUTtBQUNoQyxPQUFNLFlBQVksU0FBUyxzQkFBVCxFQUFsQjtBQUNBLE9BQU0sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLE9BQUksU0FBSixHQUFnQixJQUFoQixDO0FBQ0EsV0FBUSxJQUFJLFFBQVosRUFDRyxPQURILENBQ1c7QUFBQSxZQUFNLFVBQVUsV0FBVixDQUFzQixFQUF0QixDQUFOO0FBQUEsSUFEWDtBQUVBLFVBQU8sU0FBUDtBQUNELEVBUE0sQyIsImZpbGUiOiJwb3dlci10YWJsZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJQb3dlclRhYmxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBvd2VyVGFibGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDgwMWZkYWQzZDBhMDAwOGVhYTU3XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJQb3dlclRhYmxlXCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL3Bvd2VyLXRhYmxlL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJwcmVzZXRzXFxcIjpbXFxcImVzMjAxNVxcXCJdfSEvVXNlcnMvZGxldnkvY29kZS9vc3MvcG93ZXItdGFibGUvaW5kZXguanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtUYWJsZSBhcyBUfSBmcm9tICcuL3NyYy90YWJsZSc7XG5pbXBvcnQge1NlbGVjdGFibGV9IGZyb20gJy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBUYWJsZShlbGVtLCBjb25maWcpIHtcbiAgaWYgKCFlbGVtKSAgIHsgdGhyb3cgbmV3IEVycm9yKCdUYWJsZSBpbnN0YW5jZSByZXF1aXJlcyAxc3QgcGFyYW0gYGVsZW1gJyk7IH1cbiAgaWYgKCFjb25maWcpIHsgdGhyb3cgbmV3IEVycm9yKCdUYWJsZSBpbnN0YW5jZSByZXF1aXJlcyAybmQgcGFyYW0gYGNvbmZpZ2AnKTsgfVxuICBpZiAoIWNvbmZpZy5wbHVnaW5zKSB7Y29uZmlnLnBsdWdpbnMgPSBbXTt9XG4gIGNvbmZpZy5wbHVnaW5zLnB1c2goU2VsZWN0YWJsZSk7XG4gIHJldHVybiBUKGVsZW0sIGNvbmZpZyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHtyZW5kZXJUYWJsZUhlYWQsIHJlbmRlclRhYmxlQm9keX0gZnJvbSAnLi9yZW5kZXInXG5pbXBvcnQge1BsdWdpbkhvb2tzfSBmcm9tICcuL3BsdWdpbnMnXG5cbmV4cG9ydCB7VGFibGV9XG5cbmZ1bmN0aW9uIFRhYmxlKGVsLCBjb25maWcpIHtcbiAgbGV0IHRhYmxlLCBjc3MsIGhvb2tzO1xuICBjb25zdCBjdHggPSB7IGRlc3Ryb3kgfTsgLy8gUGxhaW4gb2JqZWN0IGBjdHhgIHdpbGwgYmUgcmV0dXJuZWQgLSB1c2UgT2JqZWN0LmFzc2lnbiB0byBleHRlbmRcblxuICBjb25maWcgPSBDb25maWcoY29uZmlnKTtcbiAgT2JqZWN0LmFzc2lnbihjdHgsIGNvbmZpZyk7XG5cbiAgZnVuY3Rpb24gX3Jlc2V0TGF5b3V0KCkge1xuICAgIHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKVxuICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoJ3Bvd2VyLXRhYmxlJylcbiAgICBPYmplY3QuYXNzaWduKGN0eCwge3RhYmxlfSlcbiAgICAvLyBlbXB0eSBjb250ZW50c1xuICAgIGVsLmlubmVySFRNTCA9ICcnO1xuICAgIC8vIEFycmF5LmZyb20oZWwuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4gZWwucmVtb3ZlQ2hpbGQoY2hpbGQpKVxuICAgIGVsLmFwcGVuZENoaWxkKHRhYmxlKVxuICAgIHJldHVybiB0YWJsZVxuICB9XG4gIGZ1bmN0aW9uIF9pbmplY3RTdHlsZXMoKSB7XG4gICAgY3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGUjaG9yaXpvbnRhbC10YWJsZScpXG4gICAgaWYgKCFjc3MpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJyFjc3MhbGVzcyEuL3N0eWxlLmxlc3MnKVxuICAgICAgY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgICAgY3NzLmlkID0gJ2hvcml6b250YWwtVGFibGUnXG4gICAgICBjc3MuaW5uZXJIVE1MID0gc3R5bGVzXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGNzcylcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gX2xvYWRQbHVnaW5zKCkge1xuICAgIC8vIHJ1biBwbHVnaW5zIC0gJ3VucGFja3MnIHRoZWlyIGludGVyZmFjZXNcbiAgICBjb25zdCBwbHVnaW5zID0gY29uZmlnLnBsdWdpbnMgPyBjb25maWcucGx1Z2lucy5tYXAocCA9PiBwKGN0eCkpIDogW11cbiAgICAvLyBleHRlbmQgY3R4IHdpdGggcGx1Z2luLm1peGlucyBtZXRob2RzXG4gICAgcGx1Z2lucy5tYXAocCA9PiB7XG4gICAgICBpZiAocC5uYW1lKSB7XG4gICAgICAgIGN0eFtwLm5hbWVdID0gY3R4W3AubmFtZV0gPyBjdHhbcC5uYW1lXSA6IHt9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsdWdpbiBtdXN0IGhhdmUgYSBgbmFtZWAgcHJvcGVydHknKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHAubWl4aW5zID09PSAnb2JqZWN0Jykge1xuICAgICAgICBPYmplY3QuYXNzaWduKGN0eFtwLm5hbWVdLCBwLm1peGlucylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBcbiAgICB9KVxuICAgIC8vIEFkZCBgaG9va3NgICYgYHBsdWdpbnNgIHRvIHJldHVybiBvYmplY3RcbiAgICBPYmplY3QuYXNzaWduKGN0eCwge3BsdWdpbnMsICdob29rcyc6IFBsdWdpbkhvb2tzKHtwbHVnaW5zfSl9KVxuICAgIGhvb2tzID0gY3R4Lmhvb2tzXG4gIH1cbiAgZnVuY3Rpb24gX3JlbmRlcigpIHtcblxuICAgIGhvb2tzLnByZVJlbmRlcihPYmplY3QuYXNzaWduKHsnZWxlbSc6IHRhYmxlfSwgY3R4KSlcblxuICAgIHJlbmRlclRhYmxlSGVhZChjdHgpXG4gICAgICAudGhlbih0aGVhZCA9PiB7XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRoZWFkKVxuICAgICAgICBob29rcy5wb3N0SGVhZGVyKHsnZWxlbSc6IHRoZWFkfSlcbiAgICAgIH0pXG5cbiAgICByZW5kZXJUYWJsZUJvZHkoY3R4KVxuICAgICAgLnRoZW4odGJvZHkgPT4ge1xuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0Ym9keSlcbiAgICAgICAgaG9va3MucG9zdFJlbmRlcih7J2VsZW0nOiB0YWJsZX0pXG4gICAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgX2luamVjdFN0eWxlcygpXG4gICAgX3Jlc2V0TGF5b3V0KClcbiAgICBfbG9hZFBsdWdpbnMoKVxuICAgIF9yZW5kZXIoKVxuICAgIHJldHVybiBjdHhcbiAgfVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGhvb2tzLmRlc3Ryb3koT2JqZWN0LmFzc2lnbih7J2VsZW0nOiB0YWJsZX0sIGN0eCkpXG4gICAgaWYgKGNzcykgICB7IGNzcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNzcykgICAgIH1cbiAgICBpZiAodGFibGUpIHsgdGFibGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWJsZSkgfVxuICAgIHJldHVybiBjdHhcbiAgfVxuICByZXR1cm4gaW5pdCgpXG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGFibGUuanNcbiAqKi8iLCJpbXBvcnQge0NvbHVtbn0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCB7Q29uZmlnfTtcblxuZnVuY3Rpb24gQ29uZmlnKHtjb2x1bW5zLCBkYXRhID0gUHJvbWlzZS5yZXNvbHZlKFtdKSwgcGx1Z2lucyA9IFtdLCBkZWJ1ZyA9IGZhbHNlLCBoYW5kbGVycyA9IFtdfSkge1xuICBjb2x1bW5zID0gY29sdW1ucy5tYXAoQ29sdW1uKVxuICByZXR1cm4ge2NvbHVtbnMsIGRhdGEsIHBsdWdpbnMsIGRlYnVnLCBoYW5kbGVyc307XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCJcbmV4cG9ydCB7Q29sdW1ufTtcblxuLy8gPGlucHV0IGlkPVwidG9nZ2xlQ2hlY2tBbGxcIiB0eXBlPVwiY2hlY2tib3hcIiB0aXRsZT1cIkNoZWNrL1VuY2hlY2sgQWxsXCIgdmFsdWU9XCJcIiAvPlxuXG5mdW5jdGlvbiBDb2x1bW4ob3B0cykge1xuICB2YXIga2V5ID0gKHR5cGVvZiBvcHRzLnJlbmRlciA9PT0gJ3N0cmluZycgPyBvcHRzLnJlbmRlclxuICAgICAgICAgICAgOiBvcHRzLmtleSA/IG9wdHMua2V5XG4gICAgICAgICAgICA6IG9wdHMuc29ydCkgfHwgbnVsbCxcbiAgICAgIGNsYXNzZXMgID0gb3B0cy5jbGFzcyB8fCBvcHRzLmNsYXNzZXMgfHwgJycsXG4gICAgICB0aXRsZSAgICA9IG9wdHMudGl0bGUgfHwga2V5LFxuICAgICAgc29ydCAgICAgPSBvcHRzLnNvcnQgIHx8IGtleSxcbiAgICAgIGNvbHMgICAgID0gb3B0cy5jb2xzICB8fCAyLFxuICAgICAgcmVuZGVyICAgPSBvcHRzLnJlbmRlcjtcbiAgY2xhc3NlcyA9IEFycmF5LmlzQXJyYXkoY2xhc3NlcykgPyBjbGFzc2VzXG4gICAgICAgICAgICA6IHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJyAmJiBjbGFzc2VzLmluZGV4T2YoJyAnKSA+IC0xID8gY2xhc3Nlcy5zcGxpdCgnICcpXG4gICAgICAgICAgICA6IHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJyAmJiBjbGFzc2VzLmxlbmd0aCA+PSAxID8gW2NsYXNzZXNdIDogW107XG4gIGlmIChjbGFzc2VzLmxlbmd0aCA8PSAwKSB7XG4gICAgY2xhc3Nlcy5wdXNoKGB0YmwteHMtJHtjb2xzfWApO1xuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG9wdHMsIHtrZXksIHRpdGxlLCBjbGFzc2VzLCBzb3J0LCByZW5kZXJ9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdHlwZXMuanNcbiAqKi8iLCJcbmV4cG9ydCB7cmVuZGVyVGFibGVIZWFkLCByZW5kZXJUYWJsZUJvZHl9O1xuXG5mdW5jdGlvbiByZW5kZXJUYWJsZUhlYWQoe2NvbHVtbnMsIGhvb2tzfSkge1xuICBjb25zdCB0aGVhZCAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJyk7XG4gIGNvbnN0IHRyICAgICAgID0gY29sdW1ucy5yZWR1Y2UoKHRyLCBjKSA9PiB7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgIGhvb2tzLnByZUhlYWRlckZpZWxkKHtlbGVtLCBjb2x1bW46IGN9KVxuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCguLi5jLmNsYXNzZXMpO1xuICAgIGVsZW0uaW5uZXJIVE1MID0gYy50aXRsZTtcbiAgICBlbGVtLnJlbmRlciAgICA9IGMucmVuZGVyO1xuICAgIGVsZW0ub3B0cyAgICAgID0gYy5vcHRzO1xuICAgIHRyLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIHJldHVybiB0cjtcbiAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gIHRoZWFkLmFwcGVuZENoaWxkKHRyKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGVhZCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhYmxlQm9keSh7ZGF0YSwgY29sdW1ucywgaG9va3N9KSB7XG4gIGlmICghZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGEgaXMgbnVsbC4gVHJ5IHNldCB7IGRhdGE6IDxQcm9taXNlfEFycmF5PiB9IGluIFBvd2VyVGFibGUgb3B0aW9ucycpXG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEudGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoZGF0YSB8fCBbXSlcbiAgfVxuICByZXR1cm4gZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBiZWZvcmUgPSBob29rcy5wcmVSZW5kZXIoe2RhdGF9KVxuICAgIGRhdGEgPSBBcnJheS5pc0FycmF5KGJlZm9yZS5kYXRhKSA/IGJlZm9yZS5kYXRhIDogZGF0YSB8fCBbXVxuICAgIHJldHVybiBkYXRhLnJlZHVjZSgodGJvZHksIHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHByZSA9IGhvb2tzLnByZVJvdyh7ZWxlbTogdGJvZHksIHJvd0luZGV4LCBkYXRhOiByb3d9KVxuICAgICAgaWYgKCFwcmUuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmluZm8oJ3BsdWdpbiBza2lwcGVkIHJvdycsIHJvd0luZGV4LCByb3cpXG4gICAgICAgIHJldHVybiB0Ym9keVxuICAgICAgfVxuICAgICAgY29uc3QgdGJsUm93ID0gY29sdW1ucy5yZWR1Y2UoKHRyLCBjb2x1bW4pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQoZWxlbSlcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKC4uLmNvbHVtbi5jbGFzc2VzKVxuICAgICAgICBlbGVtLmlubmVySFRNTCA9IHR5cGVvZiBjb2x1bW4ucmVuZGVyID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnJlbmRlcih7cm93LCBlbGVtLCBjb2x1bW59KSA6IHJvd1tjb2x1bW4ua2V5XVxuICAgICAgICBob29rcy5wb3N0Q2VsbCh7ZWxlbSwgY29sdW1uLCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgICAgcmV0dXJuIHRyXG4gICAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKVxuICAgICAgaG9va3MucG9zdFJvdyh7ZWxlbTogdGJsUm93LCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgIHRib2R5LmFwcGVuZENoaWxkKHRibFJvdylcbiAgICAgIHJldHVybiB0Ym9keVxuICAgIH0sIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpXG4gIH0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW5kZXIuanNcbiAqKi8iLCIvKipcbiAqIFV0aWxpdHkgJiBydW5uZXIgZm9yIHBsdWdpbnMgbG9hZGVkIGluIGEgZ2l2ZW4gY29udGV4dDpcbiAqL1xuZXhwb3J0IHtQbHVnaW5Ib29rc31cblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBvZiBrZXllZCBmdW5jdGlvbnMgd2hpY2ggd2lsbCBydW4gYWdhaW5zdCBhbnkgYGhhbmRsZXJzYCBpbiBhbnkgb2YgdGhlIHBsdWdpbnMgZ2l2ZW5cbiAqL1xuZnVuY3Rpb24gUGx1Z2luSG9va3Moe3BsdWdpbnN9KSB7XG4gIGNvbnN0IGNyZWF0ZUhvb2sgPSAoZXZlbnROYW1lKSA9PiAoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSA9PiB7XG4gICAgcmV0dXJuIHBsdWdpbnMucmVkdWNlKChvYmosIHApID0+IHtcbiAgICAgIGlmICghb2JqKSB7IHJldHVybiBvYmo7IH0gLy8gcHJvY2Vzc2luZyB3YXMgY2FuY2VsbGVkIGJ5IGEgcGx1Z2luXG4gICAgICB2YXIgdHJhbnNmb3JtZWQgPSB0eXBlb2YgcC5oYW5kbGVyc1tldmVudE5hbWVdID09PSAnZnVuY3Rpb24nID8gcC5oYW5kbGVyc1tldmVudE5hbWVdKG9iaikgOiBvYmpcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFxuICAgIH0sIHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSlcbiAgfVxuICAvLyBBZGQgdGhlc2Ugb24gdGhlIGBoYW5kbGVyc2Aga2V5IG9uIHlvdXIgcGx1Z2luc1xuICByZXR1cm4ge1xuICAgIHByZVJlbmRlcjogICAgICAgICAgY3JlYXRlSG9vaygncHJlUmVuZGVyJyksXG4gICAgcG9zdFJlbmRlcjogICAgICAgICBjcmVhdGVIb29rKCdwb3N0UmVuZGVyJyksXG4gICAgcHJlUm93OiAgICAgICAgICAgICBjcmVhdGVIb29rKCdwcmVSb3cnKSxcbiAgICBwb3N0Um93OiAgICAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RSb3cnKSxcbiAgICBwcmVDZWxsOiAgICAgICAgICAgIGNyZWF0ZUhvb2soJ3ByZUNlbGwnKSxcbiAgICBwb3N0Q2VsbDogICAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RDZWxsJyksXG4gICAgcHJlSGVhZGVyRmllbGQ6ICAgICBjcmVhdGVIb29rKCdwcmVIZWFkZXJGaWVsZCcpLFxuICAgIHBvc3RIZWFkZXI6ICAgICAgICAgY3JlYXRlSG9vaygncG9zdEhlYWRlcicpLFxuICAgIGRlc3Ryb3k6ICAgICAgICAgICAgY3JlYXRlSG9vaygnZGVzdHJveScpLFxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudW5zZWxlY3RhYmxlIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi50YmwteHMtMSxcXG4udGJsLXhzLTIsXFxuLnRibC14cy0zLFxcbi50YmwteHMtNCxcXG4udGJsLXhzLTUsXFxuLnRibC14cy02LFxcbi50YmwteHMtNyxcXG4udGJsLXhzLTgsXFxuLnRibC14cy05LFxcbi50YmwteHMtMTAsXFxuLnRibC14cy0xMSxcXG4udGJsLXhzLTEyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi50YmwteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzJTtcXG59XFxuLnRibC14cy0yIHtcXG4gIHdpZHRoOiAxNi42NjY2JTtcXG59XFxuLnRibC14cy0zIHtcXG4gIHdpZHRoOiAyNC45OTk5JTtcXG59XFxuLnRibC14cy00IHtcXG4gIHdpZHRoOiAzMy4zMzMyJTtcXG59XFxuLnRibC14cy01IHtcXG4gIHdpZHRoOiA0MS42NjY1JTtcXG59XFxuLnRibC14cy02IHtcXG4gIHdpZHRoOiA0OS45OTk4JTtcXG59XFxuLnRibC14cy03IHtcXG4gIHdpZHRoOiA1OC4zMzMxJTtcXG59XFxuLnRibC14cy04IHtcXG4gIHdpZHRoOiA2Ni42NjY0JTtcXG59XFxuLnRibC14cy05IHtcXG4gIHdpZHRoOiA3NC45OTk3JTtcXG59XFxuLnRibC14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMSU7XFxufVxcbi50YmwteHMtMTEge1xcbiAgd2lkdGg6IDkxLjY2NjMlO1xcbn1cXG4udGJsLXhzLTEyIHtcXG4gIHdpZHRoOiA5OS45OTk2JTtcXG59XFxuLnBvd2VyLXRhYmxlIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRyIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRoZWFkIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5wb3dlci10YWJsZSB0aGVhZCB0aCB7XFxuICAvKiBkZ3JpZC1pc2ggKi9cXG4gIGJhY2tncm91bmQ6ICNmMmYyZjI7XFxuICBjb2xvcjogIzYyNjI2MjtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQUFBO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGZvbnQtc2l6ZTogMS4zMWVtO1xcbiAgcGFkZGluZzogNnB4IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXgtaGVpZ2h0OiAzNXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHtcXG4gIGJvcmRlci1jb2xvcjogI2RkZGRkZDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDBweCAwcHggMHB4IDFweDtcXG4gIHBhZGRpbmc6IDZweCAzcHg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIGhlaWdodDogMjUwcHg7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRkIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBtYXJnaW46IDA7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSAucm93LW9kZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlY2VjICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlLW91dDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLmRpc2FibGVkIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoICFpbXBvcnRhbnQ7XFxuICBjdXJzb3I6IG5vbmU7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5kaXNhYmxlZCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyOmhvdmVyIC5uYW1lIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNCMEIwQjAgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5zZWxlY3RlZCAubmFtZSB7XFxuICBwYWRkaW5nLWxlZnQ6IDRweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1sZWZ0IHtcXG4gIHRleHQtYWxpZ246IGxlZnQgICAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWNlbnRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXIgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1yaWdodCB7XFxuICB0ZXh0LWFsaWduOiByaWdodCAgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1qdXN0aWZ5IHtcXG4gIHRleHQtYWxpZ246IGp1c3RpZnkgIWltcG9ydGFudDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9zcmMvc3R5bGUubGVzc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7Z2V0SWR9IGZyb20gJy4uL3V0aWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBTZWxlY3RhYmxlKHt0YWJsZX0pIHtcbiAgY29uc3Qgc2VsZWN0ZWQgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnc2VsZWN0YWJsZScsXG4gICAgbWl4aW5zOiB7XG4gICAgICBpc1NlbGVjdGVkLFxuICAgICAgc2VsZWN0QWRkLFxuICAgICAgc2VsZWN0QWxsLFxuICAgICAgc2VsZWN0VG9nZ2xlLFxuICAgICAgZ2V0U2VsZWN0ZWQsXG4gICAgICBzZWxlY3ROb25lLFxuICAgICAgc2VsZWN0UmVtb3ZlXG4gICAgfSxcbiAgICBoYW5kbGVyczoge1xuICAgICAgcHJlSGVhZGVyRmllbGQ6ICAgX3ByZUhlYWRlckZpZWxkLFxuICAgICAgcG9zdEhlYWRlcjogICAgICAgX3Bvc3RIZWFkZXIsXG5cbiAgICB9LFxuICB9XG5cbiAgY29uc3Qgc2VsZWN0QWxsVG9nZ2xlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICBzZWxlY3RBbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0Tm9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNlbGVjdEl0ZW1DbGljayA9IChlKSA9PiB7XG4gICAgbGV0IGVsID0gZS50YXJnZXQ7XG4gICAgaWYgKGVsLmNoZWNrZWQpIHtcbiAgICAgIHNlbGVjdEl0ZW0oZWwudmFsdWUsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RJdGVtKGVsLnZhbHVlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX3Bvc3RIZWFkZXIoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSB7XG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9oYW5kbGVTZWxlY3QpXG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9wcmVIZWFkZXJGaWVsZCh7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pIHtcbiAgICBpZiAoY29sdW1uLnNlbGVjdGlvbikge1xuICAgICAgY29sdW1uLnRpdGxlID0gYDxpbnB1dCBpZD1cInRvZ2dsZUNoZWNrQWxsXCIgdHlwZT1cImNoZWNrYm94XCIgdGl0bGU9XCJDaGVjay9VbmNoZWNrIEFsbFwiIHZhbHVlPVwiXCIgLz5gO1xuICAgICAgY29sdW1uLnJlbmRlciA9ICh7ZWxlbSwgY29sdW1uLCByb3d9KSA9PiB7XG4gICAgICAgIGxldCBfZ2V0SWQgPSBjb2x1bW4uZ2V0SWQgfHwgZ2V0SWQ7XG4gICAgICAgIHJldHVybiBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJHtfZ2V0SWQocm93KX1cIiAke2lzU2VsZWN0ZWQoX2dldElkKHJvdykpID8gJyBjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnfSAvPmA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gICAgQXJyYXkuZnJvbSh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0aW9uLWNvbCBbdHlwZT1cImNoZWNrYm94XCJdJykpXG4gICAgICAubWFwKGZ1bmN0aW9uKGVsKSB7cmV0dXJuIGVsLnZhbHVlO30pXG4gICAgICAubWFwKHNlbGVjdEl0ZW0uYmluZChudWxsLCB0cnVlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3ROb25lKCkge1xuICAgIEFycmF5LmZyb20odGFibGUucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdGlvbi1jb2wgW3R5cGU9XCJjaGVja2JveFwiXScpKVxuICAgICAgLm1hcChmdW5jdGlvbihlbCkge3JldHVybiBlbC52YWx1ZTt9KVxuICAgICAgLm1hcChzZWxlY3RJdGVtLmJpbmQobnVsbCwgZmFsc2UpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdEl0ZW0oaWQsIGJvb2wpIHtcbiAgICBpZiAodHlwZW9mIGJvb2wgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBpZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAvLyByZXZlcnNlIHBhcmFtc1xuICAgICAgW2lkLCBib29sXSA9IFtib29sLCBpZF07XG4gICAgfVxuICAgIGlmICghaWQpIHtyZXR1cm4gZmFsc2U7fVxuXG4gICAgdmFyIGNoayA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwiY2hlY2tib3hcIl1bdmFsdWU9XCInICsgaWQgKyAnXCJdJyk7XG4gICAgaWYgKGNoaykge1xuICAgICAgLy8gc2VlIGlmIHdlIGFyZSBpbiAndG9nZ2xlIG1vZGUnXG4gICAgICBpZiAodHlwZW9mIGJvb2wgPT09ICd1bmRlZmluZWQnIHx8IGJvb2wgPT09IG51bGwpIHtcbiAgICAgICAgYm9vbCA9ICFjaGsuY2hlY2tlZDsgLy8gVG9nZ2xlIGl0IVxuICAgICAgfVxuICAgICAgaWYgKGJvb2wpIHtcbiAgICAgICAgY2hrLmNoZWNrZWQgPSAnY2hlY2tlZCc7XG4gICAgICAgIGNoay5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgICBjaGsucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgIGlmIChzZWxlY3RlZC5pbmRleE9mKGlkKSA9PT0gLTEpIHtzZWxlY3RlZC5wdXNoKGlkKTt9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGsuY2hlY2tlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY2hrLnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICAgICAgICBjaGsucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgIGlmIChzZWxlY3RlZC5pbmRleE9mKGlkKSAhPT0gLTEpIHtzZWxlY3RlZC5zcGxpY2Uoc2VsZWN0ZWQuaW5kZXhPZihpZCksIDEpO31cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXR1c1RvdGFscyh0aGlzLnVzZXJzLmxlbmd0aCwgc2VsZWN0ZWQubGVuZ3RoKTtcblxuICAgIHJldHVybiB7J2lkJzogaWQsICdjaGVja2VkJzogYm9vbCwgJ2VsZW0nOiBjaGt9O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWQoKSB7IHJldHVybiBzZWxlY3RlZDsgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdFRvZ2dsZShpZCkge1xuICAgIHJldHVybiBzZWxlY3RJdGVtLmJpbmQodGhpcykoaWQsIHVuZGVmaW5lZCk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RBZGQoaWQpIHtcbiAgICByZXR1cm4gc2VsZWN0SXRlbS5iaW5kKHRoaXMpKGlkLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdFJlbW92ZShpZCkge1xuICAgIHJldHVybiBzZWxlY3RJdGVtLmJpbmQodGhpcykoaWQsIGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU2VsZWN0ZWQoaWQpIHtcbiAgICByZXR1cm4gc2VsZWN0ZWQuaW5kZXhPZihpZCkgPiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9oYW5kbGVTZWxlY3QoZSkge1xuICAgIHZhciBlbCwgdmFsO1xuICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICB2YWwgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUUicpIHtcbiAgICAgIGVsID0gZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG4gICAgICBpZiAoZWwgJiYgZWwudmFsdWUpIHsgdmFsID0gZWwudmFsdWU7IH1cbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURCcpIHtcbiAgICAgIGVsID0gZS50YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcbiAgICAgIGlmIChlbCAmJiBlbC52YWx1ZSkgeyB2YWwgPSBlbC52YWx1ZTsgfVxuICAgIH1cblxuICAgIGNvbnNvbGUud2FybignX2hhbmRsZVNlbGVjdCBUcmlnZ2VyZWQnLCB2YWwsIGVsLCBlKTtcbiAgICBpZiAodmFsKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbGVjdFRvZ2dsZSh2YWwpO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qc1xuICoqLyIsIlxuLyoqXG4gKiBVdGlsaXR5IGFycmF5aWZ5IG1ldGhvZFxuICogQWRkIHRvIC5wcm90b3R5cGUgb2YgSXRlcmF0b3JzLCBBcnJheUJ1ZmZlciwgQXJndW1lbnRzLCBOb2RlTGlzdCwgU2V0L1dlYWtTZXQsIHdoYXRldmVyICNZT0xPXG4gKlxuICogLi4uIE9yIGp1c3QgdXNlIGFzIHV0aWwsIGFzIG5lZWRlZCwgI0p1c3REb0l0XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShsaXN0KSB7XG4gIGxpc3QgPSBBcnJheS5pc0FycmF5KGxpc3QpID8gbGlzdCA6IHRoaXNcbiAgcmV0dXJuIEFycmF5LmZyb20gJiYgQXJyYXkuZnJvbShsaXN0KSB8fCBbJ3VwZ3JhZGUgeW91ciBicm93c2VyLCBwZmZ0J11cbn1cblxuLyoqXG4gKiBHZXQgYEFycmF5LnNvcnRgIGZ1bmN0aW9uIGZvciBrZXkgbmFtZSBjb21wYXJpc29ucyAoc3VwcG9ydHMgcmV2ZXJzZSlcbiAqXG4gKiBXaGVuIG5hbWUgPT09ICdlbWFpbCAgIC0tLSBTb3J0IGVtYWlsIGFzY2VuZGluZy5cbiAqXG4gKiBXaGVuIG5hbWUgPT09ICctZW1haWwgIC0tLSBTb3J0IGVtYWlsIGRlc2NlbmRpbmdcbiAqXG4gKiBAcmV0dXJucyBbZnVuY3Rpb25dIGNvbXBhcmVyIHVzZWQgaW4gYEFycmF5LnNvcnQoKWBcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3J0ZXIoa2V5KSB7XG4gIGNvbnN0IF9lbmdsaXNoU29ydCAgICAgICAgID0gKGEsIGIpID0+IChhW2tleV0gPCBiW2tleV0gPyAtMSA6IChhW2tleV0gPiBiW2tleV0gPyAxIDogMCkpXG4gIGNvbnN0IF9lbmdsaXNoU29ydFJldmVyc2VkID0gKGEsIGIpID0+IChhW2tleV0gPj0gYltrZXldID8gLTEgOiAoYVtrZXldIDwgYltrZXldID8gMSA6IDApKVxuXG4gIGlmIChrZXlbMF0gPT09ICctJykge1xuICAgIGtleSA9IGtleS5zdWJzdHIoMSk7XG4gICAgcmV0dXJuIF9lbmdsaXNoU29ydFJldmVyc2VkO1xuICB9XG4gIHJldHVybiBfZW5nbGlzaFNvcnQ7XG59XG5cbi8qKlxuICogQWNjZXB0cyBlbGVtZW50cyBmcm9tIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsYFxuICpcbiAqIFJlbW92ZXMgYWxsIGNoaWxkcmVuIG9mIEBub2RlXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsKG5vZGUpIHtcbiAgaWYgKHRoaXMgaW5zdGFuY2VvZiBOb2RlTGlzdCkgeyBub2RlID0gdGhpczsgfVxuXG4gIHRvQXJyYXkobm9kZSlcbiAgICAuZm9yRWFjaChlbCA9PiBlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpKVxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIFRvdGVzIG9idmlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElkKHtpZCwgX2lkfSkgeyByZXR1cm4gaWQgfHwgX2lkOyB9XG5cblxuLyoqXG4gKiBXYXJuaW5nOiBQcml2YXRlL2xvY2FsIHVzZSBvbmx5LiBEbyBub3QgaG9pc3QuXG4gKiAqKiogVW5zYWZlIEhUTUwvc3RyaW5nIGhhbmRsaW5nICoqKlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRWxlbSA9IGh0bWwgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZGl2LmlubmVySFRNTCA9IGh0bWwgLy8gUG90ZW50aWFsIFNlY3VyaXR5IEV4cGxvaXQgVmVjdG9yISEhISEhXG4gIHRvQXJyYXkoZGl2LmNoaWxkcmVuKVxuICAgIC5mb3JFYWNoKGVsID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbCkpXG4gIHJldHVybiBjb250YWluZXJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==