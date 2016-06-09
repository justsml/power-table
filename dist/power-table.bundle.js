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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.Table = Table;
	
	var _config = __webpack_require__(3);
	
	var _plugins = __webpack_require__(6);
	
	var _render2 = __webpack_require__(5);
	
	var _events = __webpack_require__(11);
	
	/**
	 * Table class - start here.
	 *
	 * ```js
	 * let powerTable = Table(document.querySelector('#user-table'), {
	 *   columns: [
	 *     {title: 'Col #1', render: 'column_1', sort: 'column_1', cols: 3},
	 *     {title: 'Col #2', render: 'column_2', sort: 'column_2', cols: 3},
	 *   ],
	 *   data: [
	 *     {column_1: 'row 1 - col 1', column_2: 'row 1 - col 2'},
	 *     {column_1: 'row 2 - col 1', column_2: 'row 2 - col 2'},
	 *     {column_1: 'row 3 - col 1', column_2: 'row 3 - col 2'},
	 *   ],
	 *   plugins: null,
	 *   debug: false
	 * })
	 * // Added a PowerTable to `document.querySelector('#user-table')`
	 * ```
	 *
	 * @param  {Element} el - Wrapper/root element
	 * @param  {object} config - Define plugins in here, see tests/examples
	 */
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
	    el.innerHTML = ''; // empty contents
	    el.appendChild(table);
	    return table;
	  }
	  function _injectStyles() {
	    css = document.querySelector('style#power-table');
	    if (!css) {
	      var styles = __webpack_require__(7);
	      css = document.createElement('style');
	      css.id = 'power-Table';
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
	  function _customEvents() {
	    table.addEventListener(_events.events.createRenderEvent.eventName, function (e) {
	      console.warn('Table CustEvent Fired: ' + _events.events.createRenderEvent.eventName, e);
	      var data = e.details.data;
	
	      ctx.data = data;
	      console.warn('Table CustEvent render: BEFORE ' + _events.events.createRenderEvent.eventName, data);
	      destroy();
	      init();
	    });
	  }
	  function init() {
	    _injectStyles();
	    _resetLayout();
	    _customEvents();
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
	
	  columns = columns.map(_types.Column);
	  return { columns: columns, data: data, plugins: plugins, debug: debug };
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
	
	var _events = __webpack_require__(11);
	
	function Selectable(_ref) {
	  var table = _ref.table;
	  var data = _ref.data;
	
	  var selected = [];
	  var cleanupHandlers = [];
	
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
	      destroy: _destroy,
	      preHeaderField: _preHeaderField,
	      postRender: _postRender
	    }
	  };
	
	  var selectAllToggleClick = function selectAllToggleClick(e) {
	    if (e.target.checked) {
	      selectAll();
	    } else {
	      selectNone();
	    }
	  };
	
	  // const selectItemClick = (e) => {
	  //   let el = e.target
	  //   if (el.checked) {
	  //     selectItem(el.value, true)
	  //   } else {
	  //     selectItem(el.value, false)
	  //   }
	  // }
	
	  function _destroy() {
	    return cleanupHandlers.map(function (rm) {
	      return rm();
	    }); // should be sparse array w/ length === # of cleanup method calls
	  }
	
	  function _postRender(_ref2) {
	    var elem = _ref2.elem;
	    var data = _ref2.data;
	    var column = _ref2.column;
	    var rowIndex = _ref2.rowIndex;
	
	    elem.addEventListener('click', _handleSelect);
	    cleanupHandlers.push(function () {
	      return elem.removeEventListener('click', _handleSelect);
	    });
	    return arguments[0];
	  }
	
	  function _preHeaderField(_ref3) {
	    var elem = _ref3.elem;
	    var data = _ref3.data;
	    var column = _ref3.column;
	    var rowIndex = _ref3.rowIndex;
	
	    if (column.selection) {
	      elem.addEventListener('click', selectAllToggleClick);
	      cleanupHandlers.push(function () {
	        return elem.removeEventListener('click', selectAllToggleClick);
	      });
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
	    }).map(selectItem(true));
	  }
	
	  function selectNone() {
	    Array.from(table.querySelectorAll('.selection-col [type="checkbox"]')).map(function (el) {
	      return el.value;
	    }).map(selectItem(false));
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
	
	    // setStatusTotals(users.length, selected.length)
	    table.dispatchEvent(_events.events.createStatusEvent({ selected: selected, data: data }));
	    table.dispatchEvent(_events.events.createSelectEvent({ selected: selected }));
	
	    return { 'id': id, 'checked': bool, 'elem': chk };
	  }
	
	  function selectToggle(id) {
	    return selectItem(id, undefined);
	  }
	  function selectAdd(id) {
	    return selectItem(id, true);
	  }
	  function selectRemove(id) {
	    return selectItem(id, false);
	  }
	  function isSelected(id) {
	    return selected.indexOf(id) > -1;
	  }
	  function getSelected() {
	    return selected;
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
	      selectToggle(val);
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

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	// List synthetic event handlers
	var createRenderEvent = function createRenderEvent(opts) {
	  return new CustomEvent(createRenderEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false });
	};
	createRenderEvent.eventName = 'render';
	var createStatusEvent = function createStatusEvent(opts) {
	  return new CustomEvent(createStatusEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false });
	};
	createStatusEvent.eventName = 'status';
	var createSelectEvent = function createSelectEvent(opts) {
	  return new CustomEvent(createSelectEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false });
	};
	createSelectEvent.eventName = 'select';
	
	/**
	 * I don't know how I feel about this...
	 */
	var events = exports.events = {
	  createRenderEvent: createRenderEvent,
	  createStatusEvent: createStatusEvent,
	  createSelectEvent: createSelectEvent
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1ZDhlNmI3NTQ1ZWE2NGMzYzI2ZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz85NDg4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSw0R0FBa0osRTs7Ozs7Ozs7Ozs7O1NDR2xJLEssR0FBQSxLOztBQUhoQjs7QUFDQTs7QUFFTyxVQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLEVBQTZCO0FBQ2xDLE9BQUksQ0FBQyxJQUFMLEVBQWE7QUFBRSxXQUFNLElBQUksS0FBSixDQUFVLDBDQUFW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bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUG93ZXJUYWJsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJQb3dlclRhYmxlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1ZDhlNmI3NTQ1ZWE2NGMzYzI2ZFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wiUG93ZXJUYWJsZVwiXSA9IHJlcXVpcmUoXCItIS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9wb3dlci10YWJsZS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2luZGV4LmpzP3tcXFwicHJlc2V0c1xcXCI6W1xcXCJlczIwMTVcXFwiXX0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL3Bvd2VyLXRhYmxlL2luZGV4LmpzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7VGFibGUgYXMgVH0gZnJvbSAnLi9zcmMvdGFibGUnO1xuaW1wb3J0IHtTZWxlY3RhYmxlfSBmcm9tICcuL3NyYy9wbHVnaW5zL3NlbGVjdGFibGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gVGFibGUoZWxlbSwgY29uZmlnKSB7XG4gIGlmICghZWxlbSkgICB7IHRocm93IG5ldyBFcnJvcignVGFibGUgaW5zdGFuY2UgcmVxdWlyZXMgMXN0IHBhcmFtIGBlbGVtYCcpOyB9XG4gIGlmICghY29uZmlnKSB7IHRocm93IG5ldyBFcnJvcignVGFibGUgaW5zdGFuY2UgcmVxdWlyZXMgMm5kIHBhcmFtIGBjb25maWdgJyk7IH1cbiAgaWYgKCFjb25maWcucGx1Z2lucykge2NvbmZpZy5wbHVnaW5zID0gW107fVxuICBjb25maWcucGx1Z2lucy5wdXNoKFNlbGVjdGFibGUpO1xuICByZXR1cm4gVChlbGVtLCBjb25maWcpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7UGx1Z2luSG9va3N9IGZyb20gJy4vcGx1Z2lucydcbmltcG9ydCB7cmVuZGVyVGFibGVIZWFkLCByZW5kZXJUYWJsZUJvZHl9IGZyb20gJy4vcmVuZGVyJ1xuaW1wb3J0IHtldmVudHN9IGZyb20gJy4vZXZlbnRzJ1xuXG4vKipcbiAqIFRhYmxlIGNsYXNzIC0gc3RhcnQgaGVyZS5cbiAqXG4gKiBgYGBqc1xuICogbGV0IHBvd2VyVGFibGUgPSBUYWJsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci10YWJsZScpLCB7XG4gKiAgIGNvbHVtbnM6IFtcbiAqICAgICB7dGl0bGU6ICdDb2wgIzEnLCByZW5kZXI6ICdjb2x1bW5fMScsIHNvcnQ6ICdjb2x1bW5fMScsIGNvbHM6IDN9LFxuICogICAgIHt0aXRsZTogJ0NvbCAjMicsIHJlbmRlcjogJ2NvbHVtbl8yJywgc29ydDogJ2NvbHVtbl8yJywgY29sczogM30sXG4gKiAgIF0sXG4gKiAgIGRhdGE6IFtcbiAqICAgICB7Y29sdW1uXzE6ICdyb3cgMSAtIGNvbCAxJywgY29sdW1uXzI6ICdyb3cgMSAtIGNvbCAyJ30sXG4gKiAgICAge2NvbHVtbl8xOiAncm93IDIgLSBjb2wgMScsIGNvbHVtbl8yOiAncm93IDIgLSBjb2wgMid9LFxuICogICAgIHtjb2x1bW5fMTogJ3JvdyAzIC0gY29sIDEnLCBjb2x1bW5fMjogJ3JvdyAzIC0gY29sIDInfSxcbiAqICAgXSxcbiAqICAgcGx1Z2luczogbnVsbCxcbiAqICAgZGVidWc6IGZhbHNlXG4gKiB9KVxuICogLy8gQWRkZWQgYSBQb3dlclRhYmxlIHRvIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci10YWJsZScpYFxuICogYGBgXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgLSBXcmFwcGVyL3Jvb3QgZWxlbWVudFxuICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSBEZWZpbmUgcGx1Z2lucyBpbiBoZXJlLCBzZWUgdGVzdHMvZXhhbXBsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlKGVsLCBjb25maWcpIHtcbiAgbGV0IHRhYmxlLCBjc3MsIGhvb2tzXG4gIGNvbnN0IGN0eCA9IHsgZGVzdHJveSB9IC8vIFBsYWluIG9iamVjdCBgY3R4YCB3aWxsIGJlIHJldHVybmVkIC0gdXNlIE9iamVjdC5hc3NpZ24gdG8gZXh0ZW5kXG5cbiAgY29uZmlnID0gQ29uZmlnKGNvbmZpZylcbiAgT2JqZWN0LmFzc2lnbihjdHgsIGNvbmZpZylcblxuICBmdW5jdGlvbiBfcmVzZXRMYXlvdXQoKSB7XG4gICAgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgdGFibGUuY2xhc3NMaXN0LmFkZCgncG93ZXItdGFibGUnKVxuICAgIE9iamVjdC5hc3NpZ24oY3R4LCB7dGFibGV9KVxuICAgIGVsLmlubmVySFRNTCA9ICcnIC8vIGVtcHR5IGNvbnRlbnRzXG4gICAgZWwuYXBwZW5kQ2hpbGQodGFibGUpXG4gICAgcmV0dXJuIHRhYmxlXG4gIH1cbiAgZnVuY3Rpb24gX2luamVjdFN0eWxlcygpIHtcbiAgICBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNwb3dlci10YWJsZScpXG4gICAgaWYgKCFjc3MpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyAgPSByZXF1aXJlKCchY3NzIWxlc3MhLi9zdHlsZS5sZXNzJylcbiAgICAgIGNzcyAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgICBjc3MuaWQgICAgICAgID0gJ3Bvd2VyLVRhYmxlJ1xuICAgICAgY3NzLmlubmVySFRNTCA9IHN0eWxlc1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjc3MpXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9sb2FkUGx1Z2lucygpIHtcbiAgICAvLyBydW4gcGx1Z2lucyAtICd1bnBhY2tzJyB0aGVpciBpbnRlcmZhY2VzXG4gICAgY29uc3QgcGx1Z2lucyA9IGNvbmZpZy5wbHVnaW5zID8gY29uZmlnLnBsdWdpbnMubWFwKHAgPT4gcChjdHgpKSA6IFtdXG4gICAgLy8gZXh0ZW5kIGN0eCB3aXRoIHBsdWdpbi5taXhpbnMgbWV0aG9kc1xuICAgIHBsdWdpbnMubWFwKHAgPT4ge1xuICAgICAgaWYgKHAubmFtZSkge1xuICAgICAgICBjdHhbcC5uYW1lXSA9IGN0eFtwLm5hbWVdID8gY3R4W3AubmFtZV0gOiB7fVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbHVnaW4gbXVzdCBoYXZlIGEgYG5hbWVgIHByb3BlcnR5JylcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBwLm1peGlucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjdHhbcC5uYW1lXSwgcC5taXhpbnMpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwXG4gICAgfSlcbiAgICAvLyBBZGQgYGhvb2tzYCAmIGBwbHVnaW5zYCB0byByZXR1cm4gb2JqZWN0XG4gICAgT2JqZWN0LmFzc2lnbihjdHgsIHtwbHVnaW5zLCAnaG9va3MnOiBQbHVnaW5Ib29rcyh7cGx1Z2luc30pfSlcbiAgICBob29rcyA9IGN0eC5ob29rc1xuICB9XG5cbiAgZnVuY3Rpb24gX3JlbmRlcigpIHtcbiAgICBob29rcy5wcmVSZW5kZXIoT2JqZWN0LmFzc2lnbih7J2VsZW0nOiB0YWJsZX0sIGN0eCkpXG5cbiAgICByZW5kZXJUYWJsZUhlYWQoY3R4KVxuICAgICAgLnRoZW4odGhlYWQgPT4ge1xuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0aGVhZClcbiAgICAgICAgaG9va3MucG9zdEhlYWRlcih7J2VsZW0nOiB0aGVhZH0pXG4gICAgICB9KVxuXG4gICAgcmVuZGVyVGFibGVCb2R5KGN0eClcbiAgICAgIC50aGVuKHRib2R5ID0+IHtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGJvZHkpXG4gICAgICAgIGhvb2tzLnBvc3RSZW5kZXIoeydlbGVtJzogdGFibGV9KVxuICAgICAgfSlcbiAgfVxuICBmdW5jdGlvbiBfY3VzdG9tRXZlbnRzKCkge1xuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmNyZWF0ZVJlbmRlckV2ZW50LmV2ZW50TmFtZSwgZSA9PiB7XG4gICAgICBjb25zb2xlLndhcm4oYFRhYmxlIEN1c3RFdmVudCBGaXJlZDogJHtldmVudHMuY3JlYXRlUmVuZGVyRXZlbnQuZXZlbnROYW1lfWAsIGUpXG4gICAgICBsZXQge2RhdGF9ID0gZS5kZXRhaWxzO1xuICAgICAgY3R4LmRhdGEgPSBkYXRhO1xuICAgICAgY29uc29sZS53YXJuKGBUYWJsZSBDdXN0RXZlbnQgcmVuZGVyOiBCRUZPUkUgJHtldmVudHMuY3JlYXRlUmVuZGVyRXZlbnQuZXZlbnROYW1lfWAsIGRhdGEpXG4gICAgICBkZXN0cm95KClcbiAgICAgIGluaXQoKVxuICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBfaW5qZWN0U3R5bGVzKClcbiAgICBfcmVzZXRMYXlvdXQoKVxuICAgIF9jdXN0b21FdmVudHMoKVxuICAgIF9sb2FkUGx1Z2lucygpXG4gICAgX3JlbmRlcigpXG4gICAgcmV0dXJuIGN0eFxuICB9XG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaG9va3MuZGVzdHJveShPYmplY3QuYXNzaWduKHsnZWxlbSc6IHRhYmxlfSwgY3R4KSlcbiAgICBpZiAoY3NzKSAgIHsgY3NzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3NzKSAgICAgfVxuICAgIGlmICh0YWJsZSkgeyB0YWJsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhYmxlKSB9XG4gICAgcmV0dXJuIGN0eFxuICB9XG5cbiAgcmV0dXJuIGluaXQoKVxufVxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RhYmxlLmpzXG4gKiovIiwiaW1wb3J0IHtDb2x1bW59IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQge0NvbmZpZ307XG5cbmZ1bmN0aW9uIENvbmZpZyh7Y29sdW1ucywgZGF0YSA9IFByb21pc2UucmVzb2x2ZShbXSksIHBsdWdpbnMgPSBbXSwgZGVidWcgPSBmYWxzZX0pIHtcbiAgY29sdW1ucyA9IGNvbHVtbnMubWFwKENvbHVtbilcbiAgcmV0dXJuIHtjb2x1bW5zLCBkYXRhLCBwbHVnaW5zLCBkZWJ1Z307XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCJcbmV4cG9ydCB7Q29sdW1ufTtcblxuLy8gPGlucHV0IGlkPVwidG9nZ2xlQ2hlY2tBbGxcIiB0eXBlPVwiY2hlY2tib3hcIiB0aXRsZT1cIkNoZWNrL1VuY2hlY2sgQWxsXCIgdmFsdWU9XCJcIiAvPlxuXG5mdW5jdGlvbiBDb2x1bW4ob3B0cykge1xuICB2YXIga2V5ID0gKHR5cGVvZiBvcHRzLnJlbmRlciA9PT0gJ3N0cmluZycgPyBvcHRzLnJlbmRlclxuICAgICAgICAgICAgOiBvcHRzLmtleSA/IG9wdHMua2V5XG4gICAgICAgICAgICA6IG9wdHMuc29ydCkgfHwgbnVsbCxcbiAgICAgIGNsYXNzZXMgID0gb3B0cy5jbGFzcyB8fCBvcHRzLmNsYXNzZXMgfHwgJycsXG4gICAgICB0aXRsZSAgICA9IG9wdHMudGl0bGUgfHwga2V5LFxuICAgICAgc29ydCAgICAgPSBvcHRzLnNvcnQgIHx8IGtleSxcbiAgICAgIGNvbHMgICAgID0gb3B0cy5jb2xzICB8fCAyLFxuICAgICAgcmVuZGVyICAgPSBvcHRzLnJlbmRlcjtcbiAgY2xhc3NlcyA9IEFycmF5LmlzQXJyYXkoY2xhc3NlcykgPyBjbGFzc2VzXG4gICAgICAgICAgICA6IHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJyAmJiBjbGFzc2VzLmluZGV4T2YoJyAnKSA+IC0xID8gY2xhc3Nlcy5zcGxpdCgnICcpXG4gICAgICAgICAgICA6IHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJyAmJiBjbGFzc2VzLmxlbmd0aCA+PSAxID8gW2NsYXNzZXNdIDogW107XG4gIGlmIChjbGFzc2VzLmxlbmd0aCA8PSAwKSB7XG4gICAgY2xhc3Nlcy5wdXNoKGB0YmwteHMtJHtjb2xzfWApO1xuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG9wdHMsIHtrZXksIHRpdGxlLCBjbGFzc2VzLCBzb3J0LCByZW5kZXJ9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdHlwZXMuanNcbiAqKi8iLCJcbmV4cG9ydCB7cmVuZGVyVGFibGVIZWFkLCByZW5kZXJUYWJsZUJvZHl9O1xuXG5mdW5jdGlvbiByZW5kZXJUYWJsZUhlYWQoe2NvbHVtbnMsIGhvb2tzfSkge1xuICBjb25zdCB0aGVhZCAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJyk7XG4gIGNvbnN0IHRyICAgICAgID0gY29sdW1ucy5yZWR1Y2UoKHRyLCBjKSA9PiB7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgIGhvb2tzLnByZUhlYWRlckZpZWxkKHtlbGVtLCBjb2x1bW46IGN9KVxuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCguLi5jLmNsYXNzZXMpO1xuICAgIGVsZW0uaW5uZXJIVE1MID0gYy50aXRsZTtcbiAgICBlbGVtLnJlbmRlciAgICA9IGMucmVuZGVyO1xuICAgIGVsZW0ub3B0cyAgICAgID0gYy5vcHRzO1xuICAgIHRyLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIHJldHVybiB0cjtcbiAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gIHRoZWFkLmFwcGVuZENoaWxkKHRyKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGVhZCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhYmxlQm9keSh7ZGF0YSwgY29sdW1ucywgaG9va3N9KSB7XG4gIGlmICghZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGEgaXMgbnVsbC4gVHJ5IHNldCB7IGRhdGE6IDxQcm9taXNlfEFycmF5PiB9IGluIFBvd2VyVGFibGUgb3B0aW9ucycpXG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEudGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoZGF0YSB8fCBbXSlcbiAgfVxuICByZXR1cm4gZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBiZWZvcmUgPSBob29rcy5wcmVSZW5kZXIoe2RhdGF9KVxuICAgIGRhdGEgPSBBcnJheS5pc0FycmF5KGJlZm9yZS5kYXRhKSA/IGJlZm9yZS5kYXRhIDogZGF0YSB8fCBbXVxuICAgIHJldHVybiBkYXRhLnJlZHVjZSgodGJvZHksIHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHByZSA9IGhvb2tzLnByZVJvdyh7ZWxlbTogdGJvZHksIHJvd0luZGV4LCBkYXRhOiByb3d9KVxuICAgICAgaWYgKCFwcmUuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmluZm8oJ3BsdWdpbiBza2lwcGVkIHJvdycsIHJvd0luZGV4LCByb3cpXG4gICAgICAgIHJldHVybiB0Ym9keVxuICAgICAgfVxuICAgICAgY29uc3QgdGJsUm93ID0gY29sdW1ucy5yZWR1Y2UoKHRyLCBjb2x1bW4pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQoZWxlbSlcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKC4uLmNvbHVtbi5jbGFzc2VzKVxuICAgICAgICBlbGVtLmlubmVySFRNTCA9IHR5cGVvZiBjb2x1bW4ucmVuZGVyID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnJlbmRlcih7cm93LCBlbGVtLCBjb2x1bW59KSA6IHJvd1tjb2x1bW4ua2V5XVxuICAgICAgICBob29rcy5wb3N0Q2VsbCh7ZWxlbSwgY29sdW1uLCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgICAgcmV0dXJuIHRyXG4gICAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKVxuICAgICAgaG9va3MucG9zdFJvdyh7ZWxlbTogdGJsUm93LCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgIHRib2R5LmFwcGVuZENoaWxkKHRibFJvdylcbiAgICAgIHJldHVybiB0Ym9keVxuICAgIH0sIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpXG4gIH0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW5kZXIuanNcbiAqKi8iLCIvKipcbiAqIFV0aWxpdHkgJiBydW5uZXIgZm9yIHBsdWdpbnMgbG9hZGVkIGluIGEgZ2l2ZW4gY29udGV4dDpcbiAqL1xuZXhwb3J0IHtQbHVnaW5Ib29rc31cblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBvZiBrZXllZCBmdW5jdGlvbnMgd2hpY2ggd2lsbCBydW4gYWdhaW5zdCBhbnkgYGhhbmRsZXJzYCBpbiBhbnkgb2YgdGhlIHBsdWdpbnMgZ2l2ZW5cbiAqL1xuZnVuY3Rpb24gUGx1Z2luSG9va3Moe3BsdWdpbnN9KSB7XG4gIGNvbnN0IGNyZWF0ZUhvb2sgPSAoZXZlbnROYW1lKSA9PiAoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSA9PiB7XG4gICAgcmV0dXJuIHBsdWdpbnMucmVkdWNlKChvYmosIHApID0+IHtcbiAgICAgIGlmICghb2JqKSB7IHJldHVybiBvYmo7IH0gLy8gcHJvY2Vzc2luZyB3YXMgY2FuY2VsbGVkIGJ5IGEgcGx1Z2luXG4gICAgICB2YXIgdHJhbnNmb3JtZWQgPSB0eXBlb2YgcC5oYW5kbGVyc1tldmVudE5hbWVdID09PSAnZnVuY3Rpb24nID8gcC5oYW5kbGVyc1tldmVudE5hbWVdKG9iaikgOiBvYmpcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFxuICAgIH0sIHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSlcbiAgfVxuICAvLyBBZGQgdGhlc2Ugb24gdGhlIGBoYW5kbGVyc2Aga2V5IG9uIHlvdXIgcGx1Z2luc1xuICByZXR1cm4ge1xuICAgIHByZVJlbmRlcjogICAgICAgICAgY3JlYXRlSG9vaygncHJlUmVuZGVyJyksXG4gICAgcG9zdFJlbmRlcjogICAgICAgICBjcmVhdGVIb29rKCdwb3N0UmVuZGVyJyksXG4gICAgcHJlUm93OiAgICAgICAgICAgICBjcmVhdGVIb29rKCdwcmVSb3cnKSxcbiAgICBwb3N0Um93OiAgICAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RSb3cnKSxcbiAgICBwcmVDZWxsOiAgICAgICAgICAgIGNyZWF0ZUhvb2soJ3ByZUNlbGwnKSxcbiAgICBwb3N0Q2VsbDogICAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RDZWxsJyksXG4gICAgcHJlSGVhZGVyRmllbGQ6ICAgICBjcmVhdGVIb29rKCdwcmVIZWFkZXJGaWVsZCcpLFxuICAgIHBvc3RIZWFkZXI6ICAgICAgICAgY3JlYXRlSG9vaygncG9zdEhlYWRlcicpLFxuICAgIGRlc3Ryb3k6ICAgICAgICAgICAgY3JlYXRlSG9vaygnZGVzdHJveScpLFxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudW5zZWxlY3RhYmxlIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi50YmwteHMtMSxcXG4udGJsLXhzLTIsXFxuLnRibC14cy0zLFxcbi50YmwteHMtNCxcXG4udGJsLXhzLTUsXFxuLnRibC14cy02LFxcbi50YmwteHMtNyxcXG4udGJsLXhzLTgsXFxuLnRibC14cy05LFxcbi50YmwteHMtMTAsXFxuLnRibC14cy0xMSxcXG4udGJsLXhzLTEyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi50YmwteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzJTtcXG59XFxuLnRibC14cy0yIHtcXG4gIHdpZHRoOiAxNi42NjY2JTtcXG59XFxuLnRibC14cy0zIHtcXG4gIHdpZHRoOiAyNC45OTk5JTtcXG59XFxuLnRibC14cy00IHtcXG4gIHdpZHRoOiAzMy4zMzMyJTtcXG59XFxuLnRibC14cy01IHtcXG4gIHdpZHRoOiA0MS42NjY1JTtcXG59XFxuLnRibC14cy02IHtcXG4gIHdpZHRoOiA0OS45OTk4JTtcXG59XFxuLnRibC14cy03IHtcXG4gIHdpZHRoOiA1OC4zMzMxJTtcXG59XFxuLnRibC14cy04IHtcXG4gIHdpZHRoOiA2Ni42NjY0JTtcXG59XFxuLnRibC14cy05IHtcXG4gIHdpZHRoOiA3NC45OTk3JTtcXG59XFxuLnRibC14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMSU7XFxufVxcbi50YmwteHMtMTEge1xcbiAgd2lkdGg6IDkxLjY2NjMlO1xcbn1cXG4udGJsLXhzLTEyIHtcXG4gIHdpZHRoOiA5OS45OTk2JTtcXG59XFxuLnBvd2VyLXRhYmxlIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRyIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRoZWFkIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5wb3dlci10YWJsZSB0aGVhZCB0aCB7XFxuICAvKiBkZ3JpZC1pc2ggKi9cXG4gIGJhY2tncm91bmQ6ICNmMmYyZjI7XFxuICBjb2xvcjogIzYyNjI2MjtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQUFBO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGZvbnQtc2l6ZTogMS4zMWVtO1xcbiAgcGFkZGluZzogNnB4IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXgtaGVpZ2h0OiAzNXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHtcXG4gIGJvcmRlci1jb2xvcjogI2RkZGRkZDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDBweCAwcHggMHB4IDFweDtcXG4gIHBhZGRpbmc6IDZweCAzcHg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIGhlaWdodDogMjUwcHg7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRkIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBtYXJnaW46IDA7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSAucm93LW9kZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlY2VjICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlLW91dDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLmRpc2FibGVkIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoICFpbXBvcnRhbnQ7XFxuICBjdXJzb3I6IG5vbmU7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5kaXNhYmxlZCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyOmhvdmVyIC5uYW1lIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNCMEIwQjAgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5zZWxlY3RlZCAubmFtZSB7XFxuICBwYWRkaW5nLWxlZnQ6IDRweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1sZWZ0IHtcXG4gIHRleHQtYWxpZ246IGxlZnQgICAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWNlbnRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXIgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1yaWdodCB7XFxuICB0ZXh0LWFsaWduOiByaWdodCAgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1qdXN0aWZ5IHtcXG4gIHRleHQtYWxpZ246IGp1c3RpZnkgIWltcG9ydGFudDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9zcmMvc3R5bGUubGVzc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7Z2V0SWR9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQge2V2ZW50c30gZnJvbSAnLi4vZXZlbnRzJ1xuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0YWJsZSh7dGFibGUsIGRhdGF9KSB7XG4gIGNvbnN0IHNlbGVjdGVkICAgICAgICA9IFtdXG4gIGNvbnN0IGNsZWFudXBIYW5kbGVycyA9IFtdXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnc2VsZWN0YWJsZScsXG4gICAgbWl4aW5zOiB7XG4gICAgICBpc1NlbGVjdGVkLFxuICAgICAgc2VsZWN0QWRkLFxuICAgICAgc2VsZWN0QWxsLFxuICAgICAgc2VsZWN0VG9nZ2xlLFxuICAgICAgZ2V0U2VsZWN0ZWQsXG4gICAgICBzZWxlY3ROb25lLFxuICAgICAgc2VsZWN0UmVtb3ZlXG4gICAgfSxcbiAgICBoYW5kbGVyczoge1xuICAgICAgZGVzdHJveTogICAgICAgICAgX2Rlc3Ryb3ksXG4gICAgICBwcmVIZWFkZXJGaWVsZDogICBfcHJlSGVhZGVyRmllbGQsXG4gICAgICBwb3N0UmVuZGVyOiAgICAgICBfcG9zdFJlbmRlcixcbiAgICB9LFxuICB9XG5cbiAgY29uc3Qgc2VsZWN0QWxsVG9nZ2xlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICBzZWxlY3RBbGwoKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3ROb25lKClcbiAgICB9XG4gIH1cblxuICAvLyBjb25zdCBzZWxlY3RJdGVtQ2xpY2sgPSAoZSkgPT4ge1xuICAvLyAgIGxldCBlbCA9IGUudGFyZ2V0XG4gIC8vICAgaWYgKGVsLmNoZWNrZWQpIHtcbiAgLy8gICAgIHNlbGVjdEl0ZW0oZWwudmFsdWUsIHRydWUpXG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIHNlbGVjdEl0ZW0oZWwudmFsdWUsIGZhbHNlKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGZ1bmN0aW9uIF9kZXN0cm95KCkge1xuICAgIHJldHVybiBjbGVhbnVwSGFuZGxlcnMubWFwKHJtID0+IHJtKCkpIC8vIHNob3VsZCBiZSBzcGFyc2UgYXJyYXkgdy8gbGVuZ3RoID09PSAjIG9mIGNsZWFudXAgbWV0aG9kIGNhbGxzXG4gIH1cblxuICBmdW5jdGlvbiBfcG9zdFJlbmRlcih7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pIHtcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2hhbmRsZVNlbGVjdClcbiAgICBjbGVhbnVwSGFuZGxlcnMucHVzaCgoKSA9PiBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2hhbmRsZVNlbGVjdCkpXG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXVxuICB9XG5cbiAgZnVuY3Rpb24gX3ByZUhlYWRlckZpZWxkKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGlmIChjb2x1bW4uc2VsZWN0aW9uKSB7XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0QWxsVG9nZ2xlQ2xpY2spXG4gICAgICBjbGVhbnVwSGFuZGxlcnMucHVzaCgoKSA9PiBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0QWxsVG9nZ2xlQ2xpY2spKVxuICAgICAgY29sdW1uLnRpdGxlID0gYDxpbnB1dCBpZD1cInRvZ2dsZUNoZWNrQWxsXCIgdHlwZT1cImNoZWNrYm94XCIgdGl0bGU9XCJDaGVjay9VbmNoZWNrIEFsbFwiIHZhbHVlPVwiXCIgLz5gO1xuICAgICAgY29sdW1uLnJlbmRlciA9ICh7ZWxlbSwgY29sdW1uLCByb3d9KSA9PiB7XG4gICAgICAgIGxldCBfZ2V0SWQgPSBjb2x1bW4uZ2V0SWQgfHwgZ2V0SWQ7XG4gICAgICAgIHJldHVybiBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJHtfZ2V0SWQocm93KX1cIiAke2lzU2VsZWN0ZWQoX2dldElkKHJvdykpID8gJyBjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnfSAvPmA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gICAgQXJyYXkuZnJvbSh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0aW9uLWNvbCBbdHlwZT1cImNoZWNrYm94XCJdJykpXG4gICAgICAubWFwKGZ1bmN0aW9uKGVsKSB7cmV0dXJuIGVsLnZhbHVlO30pXG4gICAgICAubWFwKHNlbGVjdEl0ZW0odHJ1ZSkpXG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3ROb25lKCkge1xuICAgIEFycmF5LmZyb20odGFibGUucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdGlvbi1jb2wgW3R5cGU9XCJjaGVja2JveFwiXScpKVxuICAgICAgLm1hcChmdW5jdGlvbihlbCkge3JldHVybiBlbC52YWx1ZX0pXG4gICAgICAubWFwKHNlbGVjdEl0ZW0oZmFsc2UpKVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0SXRlbShpZCwgYm9vbCkge1xuICAgIGlmICh0eXBlb2YgYm9vbCA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGlkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIC8vIHJldmVyc2UgcGFyYW1zXG4gICAgICBbaWQsIGJvb2xdID0gW2Jvb2wsIGlkXVxuICAgIH1cbiAgICBpZiAoIWlkKSB7cmV0dXJuIGZhbHNlfVxuXG4gICAgdmFyIGNoayA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwiY2hlY2tib3hcIl1bdmFsdWU9XCInICsgaWQgKyAnXCJdJylcbiAgICBpZiAoY2hrKSB7XG4gICAgICAvLyBzZWUgaWYgd2UgYXJlIGluICd0b2dnbGUgbW9kZSdcbiAgICAgIGlmICh0eXBlb2YgYm9vbCA9PT0gJ3VuZGVmaW5lZCcgfHwgYm9vbCA9PT0gbnVsbCkge1xuICAgICAgICBib29sID0gIWNoay5jaGVja2VkIC8vIFRvZ2dsZSBpdCFcbiAgICAgIH1cbiAgICAgIGlmIChib29sKSB7XG4gICAgICAgIGNoay5jaGVja2VkID0gJ2NoZWNrZWQnXG4gICAgICAgIGNoay5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpXG4gICAgICAgIGNoay5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICBpZiAoc2VsZWN0ZWQuaW5kZXhPZihpZCkgPT09IC0xKSB7c2VsZWN0ZWQucHVzaChpZCl9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGsuY2hlY2tlZCA9IHVuZGVmaW5lZFxuICAgICAgICBjaGsucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJylcbiAgICAgICAgY2hrLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG4gICAgICAgIGlmIChzZWxlY3RlZC5pbmRleE9mKGlkKSAhPT0gLTEpIHtzZWxlY3RlZC5zcGxpY2Uoc2VsZWN0ZWQuaW5kZXhPZihpZCksIDEpfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldFN0YXR1c1RvdGFscyh1c2Vycy5sZW5ndGgsIHNlbGVjdGVkLmxlbmd0aClcbiAgICB0YWJsZS5kaXNwYXRjaEV2ZW50KGV2ZW50cy5jcmVhdGVTdGF0dXNFdmVudCh7c2VsZWN0ZWQsIGRhdGF9KSlcbiAgICB0YWJsZS5kaXNwYXRjaEV2ZW50KGV2ZW50cy5jcmVhdGVTZWxlY3RFdmVudCh7c2VsZWN0ZWR9KSlcblxuICAgIHJldHVybiB7J2lkJzogaWQsICdjaGVja2VkJzogYm9vbCwgJ2VsZW0nOiBjaGt9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RUb2dnbGUoaWQpIHsgICByZXR1cm4gc2VsZWN0SXRlbShpZCwgdW5kZWZpbmVkKSB9XG4gIGZ1bmN0aW9uIHNlbGVjdEFkZChpZCkgeyAgICAgIHJldHVybiBzZWxlY3RJdGVtKGlkLCB0cnVlKSB9XG4gIGZ1bmN0aW9uIHNlbGVjdFJlbW92ZShpZCkgeyAgIHJldHVybiBzZWxlY3RJdGVtKGlkLCBmYWxzZSkgfVxuICBmdW5jdGlvbiBpc1NlbGVjdGVkKGlkKSB7ICAgICByZXR1cm4gc2VsZWN0ZWQuaW5kZXhPZihpZCkgPiAtMSB9XG4gIGZ1bmN0aW9uIGdldFNlbGVjdGVkKCkgeyAgICAgIHJldHVybiBzZWxlY3RlZCB9XG5cbiAgZnVuY3Rpb24gX2hhbmRsZVNlbGVjdChlKSB7XG4gICAgdmFyIGVsLCB2YWxcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgdmFsID0gZS50YXJnZXQudmFsdWVcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUUicpIHtcbiAgICAgIGVsID0gZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJylcbiAgICAgIGlmIChlbCAmJiBlbC52YWx1ZSkgeyB2YWwgPSBlbC52YWx1ZSB9XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVEQnKSB7XG4gICAgICBlbCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJylcbiAgICAgIGlmIChlbCAmJiBlbC52YWx1ZSkgeyB2YWwgPSBlbC52YWx1ZSB9XG4gICAgfVxuXG4gICAgY29uc29sZS53YXJuKCdfaGFuZGxlU2VsZWN0IFRyaWdnZXJlZCcsIHZhbCwgZWwsIGUpXG4gICAgaWYgKHZhbCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBzZWxlY3RUb2dnbGUodmFsKVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGx1Z2lucy9zZWxlY3RhYmxlLmpzXG4gKiovIiwiXG4vKipcbiAqIFV0aWxpdHkgYXJyYXlpZnkgbWV0aG9kXG4gKiBBZGQgdG8gLnByb3RvdHlwZSBvZiBJdGVyYXRvcnMsIEFycmF5QnVmZmVyLCBBcmd1bWVudHMsIE5vZGVMaXN0LCBTZXQvV2Vha1NldCwgd2hhdGV2ZXIgI1lPTE9cbiAqXG4gKiAuLi4gT3IganVzdCB1c2UgYXMgdXRpbCwgYXMgbmVlZGVkLCAjSnVzdERvSXRcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KGxpc3QpIHtcbiAgbGlzdCA9IEFycmF5LmlzQXJyYXkobGlzdCkgPyBsaXN0IDogdGhpc1xuICByZXR1cm4gQXJyYXkuZnJvbSAmJiBBcnJheS5mcm9tKGxpc3QpIHx8IFsndXBncmFkZSB5b3VyIGJyb3dzZXIsIHBmZnQnXVxufVxuXG4vKipcbiAqIEdldCBgQXJyYXkuc29ydGAgZnVuY3Rpb24gZm9yIGtleSBuYW1lIGNvbXBhcmlzb25zIChzdXBwb3J0cyByZXZlcnNlKVxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJ2VtYWlsICAgLS0tIFNvcnQgZW1haWwgYXNjZW5kaW5nLlxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJy1lbWFpbCAgLS0tIFNvcnQgZW1haWwgZGVzY2VuZGluZ1xuICpcbiAqIEByZXR1cm5zIFtmdW5jdGlvbl0gY29tcGFyZXIgdXNlZCBpbiBgQXJyYXkuc29ydCgpYFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvcnRlcihrZXkpIHtcbiAgY29uc3QgX2VuZ2xpc2hTb3J0ICAgICAgICAgPSAoYSwgYikgPT4gKGFba2V5XSA8IGJba2V5XSA/IC0xIDogKGFba2V5XSA+IGJba2V5XSA/IDEgOiAwKSlcbiAgY29uc3QgX2VuZ2xpc2hTb3J0UmV2ZXJzZWQgPSAoYSwgYikgPT4gKGFba2V5XSA+PSBiW2tleV0gPyAtMSA6IChhW2tleV0gPCBiW2tleV0gPyAxIDogMCkpXG5cbiAgaWYgKGtleVswXSA9PT0gJy0nKSB7XG4gICAga2V5ID0ga2V5LnN1YnN0cigxKTtcbiAgICByZXR1cm4gX2VuZ2xpc2hTb3J0UmV2ZXJzZWQ7XG4gIH1cbiAgcmV0dXJuIF9lbmdsaXNoU29ydDtcbn1cblxuLyoqXG4gKiBBY2NlcHRzIGVsZW1lbnRzIGZyb20gYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgXG4gKlxuICogUmVtb3ZlcyBhbGwgY2hpbGRyZW4gb2YgQG5vZGVcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGwobm9kZSkge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7IG5vZGUgPSB0aGlzOyB9XG5cbiAgdG9BcnJheShub2RlKVxuICAgIC5mb3JFYWNoKGVsID0+IGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCkpXG4gIHJldHVybiBub2RlXG59XG5cbi8qKlxuICogVG90ZXMgb2J2aVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWQoe2lkLCBfaWR9KSB7IHJldHVybiBpZCB8fCBfaWQ7IH1cblxuXG4vKipcbiAqIFdhcm5pbmc6IFByaXZhdGUvbG9jYWwgdXNlIG9ubHkuIERvIG5vdCBob2lzdC5cbiAqICoqKiBVbnNhZmUgSFRNTC9zdHJpbmcgaGFuZGxpbmcgKioqXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtID0gaHRtbCA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBkaXYuaW5uZXJIVE1MID0gaHRtbCAvLyBQb3RlbnRpYWwgU2VjdXJpdHkgRXhwbG9pdCBWZWN0b3IhISEhISFcbiAgdG9BcnJheShkaXYuY2hpbGRyZW4pXG4gICAgLmZvckVhY2goZWwgPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKGVsKSlcbiAgcmV0dXJuIGNvbnRhaW5lclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJcbi8vIExpc3Qgc3ludGhldGljIGV2ZW50IGhhbmRsZXJzXG5jb25zdCBjcmVhdGVSZW5kZXJFdmVudCA9IChvcHRzKSA9PiBuZXcgQ3VzdG9tRXZlbnQoY3JlYXRlUmVuZGVyRXZlbnQuZXZlbnROYW1lLCB7ICdkZXRhaWwnOiBPYmplY3QuYXNzaWduKHt9LCBvcHRzKSwgJ2J1YmJsZXMnOiB0cnVlLCAnY2FuY2VsYWJsZSc6IGZhbHNlIH0pXG5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWUgPSAncmVuZGVyJ1xuY29uc3QgY3JlYXRlU3RhdHVzRXZlbnQgPSAob3B0cykgPT4gbmV3IEN1c3RvbUV2ZW50KGNyZWF0ZVN0YXR1c0V2ZW50LmV2ZW50TmFtZSwgeyAnZGV0YWlsJzogT2JqZWN0LmFzc2lnbih7fSwgb3B0cyksICdidWJibGVzJzogdHJ1ZSwgJ2NhbmNlbGFibGUnOiBmYWxzZSB9KVxuY3JlYXRlU3RhdHVzRXZlbnQuZXZlbnROYW1lID0gJ3N0YXR1cydcbmNvbnN0IGNyZWF0ZVNlbGVjdEV2ZW50ID0gKG9wdHMpID0+IG5ldyBDdXN0b21FdmVudChjcmVhdGVTZWxlY3RFdmVudC5ldmVudE5hbWUsIHsgJ2RldGFpbCc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCAnYnViYmxlcyc6IHRydWUsICdjYW5jZWxhYmxlJzogZmFsc2UgfSlcbmNyZWF0ZVNlbGVjdEV2ZW50LmV2ZW50TmFtZSA9ICdzZWxlY3QnXG5cbi8qKlxuICogSSBkb24ndCBrbm93IGhvdyBJIGZlZWwgYWJvdXQgdGhpcy4uLlxuICovXG5leHBvcnQgY29uc3QgZXZlbnRzID0ge1xuICBjcmVhdGVSZW5kZXJFdmVudCxcbiAgY3JlYXRlU3RhdHVzRXZlbnQsXG4gIGNyZWF0ZVNlbGVjdEV2ZW50XG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZXZlbnRzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==