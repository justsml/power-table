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
	
	var _sortable = __webpack_require__(12);
	
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
	
	  // default plugins
	  config.plugins.push(_sortable.Sortable);
	  // config.plugins.push(Selectable)
	
	  return (0, _table.Table)(elem, config);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* Object Factories */
	
	
	/* Helper utils */
	
	
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
	    // ;; // Add `hooks` && `plugins` to return object
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
	      console.group('render');
	      console.warn('Table CustEvent Fired: ' + _events.events.createRenderEvent.eventName, e.detail);
	      var data = e.detail.data;
	
	      console.warn('Table CustEvent render: BEFORE ' + _events.events.createRenderEvent.eventName, data);
	      console.warn('Table CustEvent render: CURRENT DATA ' + _events.events.createRenderEvent.eventName, ctx.data);
	      if (data) {
	        ctx.data = data;
	      }
	      console.warn('Table CustEvent render: AFTER ' + _events.events.createRenderEvent.eventName, ctx.data);
	      destroy();
	      init();
	      console.groupEnd('render');
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
	    elem.column = c;
	    tr.appendChild(elem);
	    hooks.postHeaderField({ elem: elem, column: c });
	    return tr;
	  }, document.createElement('tr'));
	  thead.appendChild(tr);
	  return Promise.resolve(thead);
	}
	
	function renderTableBody(ctx) {
	  var data = ctx.data;
	  var columns = ctx.columns;
	  var hooks = ctx.hooks;
	
	  if (!data) {
	    console.error('Data is null. Try set { data: <Promise|Array> } in PowerTable options');
	    return [];
	  }
	  if (data && typeof data.then !== 'function') {
	    data = Promise.resolve(data || []);
	  }
	  return data.then(function (data) {
	    var before = hooks.preRender({ data: data });
	    ctx.data = before && before.data ? before.data : data;
	
	    console.error('renderTableBody.preRender.before =', before);
	
	    data = (Array.isArray(before.data) ? before.data : data) || [];
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
	    postHeaderField: createHook('postHeaderField'),
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
	      postRender: _postRender,
	      postHeader: _postHeader,
	      preHeaderField: _preHeaderField
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
	    }); // should return sparse array w/ length === # of cleanup method calls
	  }
	
	  function _postRender(_ref2) {
	    var elem = _ref2.elem;
	    var data = _ref2.data;
	    var column = _ref2.column;
	    var rowIndex = _ref2.rowIndex;
	
	    var tbody = table.querySelector('tbody');
	    if (!tbody) {
	      throw new Error('No table body found!!!!!');
	    }
	    tbody.addEventListener('click', _handleSelect);
	    cleanupHandlers.push(function () {
	      return tbody.removeEventListener('click', _handleSelect);
	    });
	    return arguments[0];
	  }
	
	  function _postHeader(_ref3) {
	    var elem = _ref3.elem;
	
	
	    elem.addEventListener('click', selectAllToggleClick);
	    cleanupHandlers.push(function () {
	      return elem.removeEventListener('click', selectAllToggleClick);
	    });
	  }
	
	  function _preHeaderField(_ref4) {
	    var elem = _ref4.elem;
	    var data = _ref4.data;
	    var column = _ref4.column;
	    var rowIndex = _ref4.rowIndex;
	
	    if (column.selection) {
	      column.title = '<input id="toggleCheckAll" type="checkbox" title="Check/Uncheck All" value="" />';
	      column.render = function (_ref5) {
	        var elem = _ref5.elem;
	        var column = _ref5.column;
	        var row = _ref5.row;
	
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
	      var _ref6 = [bool, id];
	      // reverse params
	
	      id = _ref6[0];
	      bool = _ref6[1];
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
	  list = !list ? [] : list;
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
	var createSortedEvent = function createSortedEvent(opts) {
	  return new CustomEvent(createSortedEvent.eventName, { 'detail': Object.assign({}, opts), 'bubbles': true, 'cancelable': false });
	};
	createSortedEvent.eventName = 'sorted';
	
	/**
	 * I don't know how I feel about this...
	 * Hmmm, i think a factory function is needed...
	 */
	var events = exports.events = {
	  createRenderEvent: createRenderEvent,
	  createStatusEvent: createStatusEvent,
	  createSelectEvent: createSelectEvent,
	  createSortedEvent: createSortedEvent
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Sortable = Sortable;
	
	var _util = __webpack_require__(10);
	
	var _events = __webpack_require__(11);
	
	function Sortable(ctx) {
	  var table = ctx.table;
	  var defaultSort = ctx.defaultSort;
	
	  var cleanupHandlers = [];
	  var sortBy = defaultSort || '';
	
	  return {
	    name: 'sortable',
	    mixins: {
	      sortByColumn: sortByColumn
	    },
	    handlers: {
	      destroy: _destroy,
	      preRender: _preRender,
	      postHeader: _postHeader,
	      preHeaderField: _preHeaderField
	    }
	  };
	
	  function triggerRender(data) {
	    table.dispatchEvent(_events.events.createRenderEvent({ data: data || ctx.data, table: table }));
	  }
	
	  function triggerSorted() {
	    table.dispatchEvent(_events.events.createSortedEvent({ sortBy: sortBy }));
	  }
	
	  function updateView() {
	    // set the up/down arrow in col names
	    var upArrow = '&#9650;';
	    var downArrow = '&#9660;';
	    var sortIcons = (0, _util.toArray)(table.querySelectorAll('b.sort-arrow'));
	    var el = table.querySelector('th[sort=' + sortBy.replace(/-/, '') + ']');
	    (0, _util.removeAll)(sortIcons);
	    if (el) {
	      var sort = el.getAttribute('sort');
	      var desc = sort.indexOf('-') === 0;
	      var icon = (0, _util.createElem)('<b class=\'sort-arrow\'>' + (desc ? downArrow : upArrow) + '</b>');
	      el.appendChild(icon);
	    }
	  }
	
	  function _columnClicked(e) {
	    e.preventDefault();
	    var el = e.target;
	    el = el.matches('th') ? el : el.closest && el.closest('th') || el;
	    var clickedSort = el.getAttribute('sort');
	    console.info('sort clicked?, ELEM: ', el, '\nSORT.REQUESTED:', clickedSort);
	    if (clickedSort) {
	      sortBy = clickedSort === sortBy ? '-'.concat(clickedSort) : clickedSort;
	      console.warn('PRE.sortByColumn', sortBy);
	      ctx.defaultSort = sortBy;
	      sortByColumn(sortBy);
	    } else {
	      console.warn('skipping sort, ELEM: ', el, '\nEVENT:', e);
	    }
	  }
	
	  function _destroy() {
	    return cleanupHandlers.map(function (rm) {
	      return rm();
	    }); // should be sparse array w/ length === # of cleanup method calls
	  }
	
	  function _preRender(_ref) {
	    var data = _ref.data;
	
	    var dataSorter = function dataSorter(data, sortKey) {
	      return data.sort((0, _util.getSorter)(sortKey));
	    };
	
	    if (!sortBy || sortBy.length <= 0) {
	      return { data: data };
	    }
	
	    if (data && typeof data.then !== 'function') {
	      data = Promise.resolve(data);
	    }
	
	    return { data: data.then(function (data) {
	        return dataSorter(data, sortBy);
	      }) };
	  }
	
	  function _postHeader(_ref2) {
	    var elem = _ref2.elem;
	    var data = _ref2.data;
	    var column = _ref2.column;
	    var rowIndex = _ref2.rowIndex;
	
	    var thead = elem; //elem.querySelector('thead')
	    if (!thead) {
	      throw new Error('No table head found!!!!!');
	    }
	    thead.addEventListener('click', _columnClicked);
	    cleanupHandlers.push(function () {
	      return thead.removeEventListener('click', _columnClicked);
	    });
	    return arguments[0];
	  }
	
	  // function _postHeader({elem, data, column, rowIndex}) {
	  //   elem.addEventListener('click', _columnClicked)
	  //   return arguments[0]
	  // }
	
	  function sortByColumn(_sortBy) {
	    sortBy = _sortBy;
	    updateView();
	    triggerRender();
	    triggerSorted();
	  }
	
	  function _preHeaderField(_ref3) {
	    var elem = _ref3.elem;
	    var data = _ref3.data;
	    var column = _ref3.column;
	    var rowIndex = _ref3.rowIndex;
	
	    if (column.sort) {
	      elem.setAttribute('sort', column.sort);
	    }
	    return arguments[0];
	  }
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3Njg5ODQyODE1OGU4Y2VkNDYwOSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz85NDg4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL3NvcnRhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSw0R0FBa0osRTs7Ozs7Ozs7Ozs7O1NDSWxJLEssR0FBQSxLOztBQUpoQjs7QUFDQTs7QUFDQTs7QUFFTyxVQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLEVBQTZCO0FBQ2xDLE9BQUks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QUFqQztBQUNEO0FBQ0QsWUFBTyxVQUFVLENBQVYsQ0FBUDtBQUNEO0FBRUYsRSIsImZpbGUiOiJwb3dlci10YWJsZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJQb3dlclRhYmxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBvd2VyVGFibGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDc2ODk4NDI4MTU4ZThjZWQ0NjA5XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJQb3dlclRhYmxlXCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL3Bvd2VyLXRhYmxlL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJwcmVzZXRzXFxcIjpbXFxcImVzMjAxNVxcXCJdfSEvVXNlcnMvZGxldnkvY29kZS9vc3MvcG93ZXItdGFibGUvaW5kZXguanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtUYWJsZSBhcyBUfSBmcm9tICcuL3NyYy90YWJsZSdcbmltcG9ydCB7U2VsZWN0YWJsZX0gZnJvbSAnLi9zcmMvcGx1Z2lucy9zZWxlY3RhYmxlJ1xuaW1wb3J0IHtTb3J0YWJsZX0gICBmcm9tICcuL3NyYy9wbHVnaW5zL3NvcnRhYmxlJ1xuXG5leHBvcnQgZnVuY3Rpb24gVGFibGUoZWxlbSwgY29uZmlnKSB7XG4gIGlmICghZWxlbSkgICB7IHRocm93IG5ldyBFcnJvcignVGFibGUgaW5zdGFuY2UgcmVxdWlyZXMgMXN0IHBhcmFtIGBlbGVtYCcpIH1cbiAgaWYgKCFjb25maWcpIHsgdGhyb3cgbmV3IEVycm9yKCdUYWJsZSBpbnN0YW5jZSByZXF1aXJlcyAybmQgcGFyYW0gYGNvbmZpZ2AnKSB9XG4gIGlmICghY29uZmlnLnBsdWdpbnMpIHtjb25maWcucGx1Z2lucyA9IFtdfVxuXG4gIC8vIGRlZmF1bHQgcGx1Z2luc1xuICBjb25maWcucGx1Z2lucy5wdXNoKFNvcnRhYmxlKVxuICAvLyBjb25maWcucGx1Z2lucy5wdXNoKFNlbGVjdGFibGUpXG5cbiAgcmV0dXJuIFQoZWxlbSwgY29uZmlnKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsIi8qIE9iamVjdCBGYWN0b3JpZXMgKi9cbmltcG9ydCB7Q29uZmlnfSAgICAgICBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7UGx1Z2luSG9va3N9ICBmcm9tICcuL3BsdWdpbnMnXG5cbi8qIEhlbHBlciB1dGlscyAqL1xuaW1wb3J0IHtyZW5kZXJUYWJsZUhlYWQsIHJlbmRlclRhYmxlQm9keX0gZnJvbSAnLi9yZW5kZXInXG5pbXBvcnQge2V2ZW50c30gICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2V2ZW50cydcblxuXG4vKipcbiAqIFRhYmxlIGNsYXNzIC0gc3RhcnQgaGVyZS5cbiAqXG4gKiBgYGBqc1xuICogbGV0IHBvd2VyVGFibGUgPSBUYWJsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci10YWJsZScpLCB7XG4gKiAgIGNvbHVtbnM6IFtcbiAqICAgICB7dGl0bGU6ICdDb2wgIzEnLCByZW5kZXI6ICdjb2x1bW5fMScsIHNvcnQ6ICdjb2x1bW5fMScsIGNvbHM6IDN9LFxuICogICAgIHt0aXRsZTogJ0NvbCAjMicsIHJlbmRlcjogJ2NvbHVtbl8yJywgc29ydDogJ2NvbHVtbl8yJywgY29sczogM30sXG4gKiAgIF0sXG4gKiAgIGRhdGE6IFtcbiAqICAgICB7Y29sdW1uXzE6ICdyb3cgMSAtIGNvbCAxJywgY29sdW1uXzI6ICdyb3cgMSAtIGNvbCAyJ30sXG4gKiAgICAge2NvbHVtbl8xOiAncm93IDIgLSBjb2wgMScsIGNvbHVtbl8yOiAncm93IDIgLSBjb2wgMid9LFxuICogICAgIHtjb2x1bW5fMTogJ3JvdyAzIC0gY29sIDEnLCBjb2x1bW5fMjogJ3JvdyAzIC0gY29sIDInfSxcbiAqICAgXSxcbiAqICAgcGx1Z2luczogbnVsbCxcbiAqICAgZGVidWc6IGZhbHNlXG4gKiB9KVxuICogLy8gQWRkZWQgYSBQb3dlclRhYmxlIHRvIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci10YWJsZScpYFxuICogYGBgXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgLSBXcmFwcGVyL3Jvb3QgZWxlbWVudFxuICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSBEZWZpbmUgcGx1Z2lucyBpbiBoZXJlLCBzZWUgdGVzdHMvZXhhbXBsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlKGVsLCBjb25maWcpIHtcbiAgbGV0IHRhYmxlLCBjc3MsIGhvb2tzXG4gIGNvbnN0IGN0eCA9IHsgZGVzdHJveSB9IC8vIFBsYWluIG9iamVjdCBgY3R4YCB3aWxsIGJlIHJldHVybmVkIC0gdXNlIE9iamVjdC5hc3NpZ24gdG8gZXh0ZW5kXG5cbiAgY29uZmlnID0gQ29uZmlnKGNvbmZpZylcbiAgT2JqZWN0LmFzc2lnbihjdHgsIGNvbmZpZylcblxuICBmdW5jdGlvbiBfcmVzZXRMYXlvdXQoKSB7XG4gICAgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgdGFibGUuY2xhc3NMaXN0LmFkZCgncG93ZXItdGFibGUnKVxuICAgIE9iamVjdC5hc3NpZ24oY3R4LCB7dGFibGV9KVxuICAgIGVsLmlubmVySFRNTCA9ICcnIC8vIGVtcHR5IGNvbnRlbnRzXG4gICAgZWwuYXBwZW5kQ2hpbGQodGFibGUpXG4gICAgcmV0dXJuIHRhYmxlXG4gIH1cbiAgZnVuY3Rpb24gX2luamVjdFN0eWxlcygpIHtcbiAgICBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNwb3dlci10YWJsZScpXG4gICAgaWYgKCFjc3MpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyAgPSByZXF1aXJlKCchY3NzIWxlc3MhLi9zdHlsZS5sZXNzJylcbiAgICAgIGNzcyAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgICBjc3MuaWQgICAgICAgID0gJ3Bvd2VyLVRhYmxlJ1xuICAgICAgY3NzLmlubmVySFRNTCA9IHN0eWxlc1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjc3MpXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9sb2FkUGx1Z2lucygpIHtcbiAgICAvLyBydW4gcGx1Z2lucyAtICd1bnBhY2tzJyB0aGVpciBpbnRlcmZhY2VzXG4gICAgY29uc3QgcGx1Z2lucyA9IGNvbmZpZy5wbHVnaW5zID8gY29uZmlnLnBsdWdpbnMubWFwKHAgPT4gcChjdHgpKSA6IFtdXG4gICAgLy8gZXh0ZW5kIGN0eCB3aXRoIHBsdWdpbi5taXhpbnMgbWV0aG9kc1xuICAgIHBsdWdpbnMubWFwKHAgPT4ge1xuICAgICAgaWYgKHAubmFtZSkge1xuICAgICAgICBjdHhbcC5uYW1lXSA9IGN0eFtwLm5hbWVdID8gY3R4W3AubmFtZV0gOiB7fVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbHVnaW4gbXVzdCBoYXZlIGEgYG5hbWVgIHByb3BlcnR5JylcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBwLm1peGlucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjdHhbcC5uYW1lXSwgcC5taXhpbnMpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwXG4gICAgfSlcbiAgICAvLyA7OyAvLyBBZGQgYGhvb2tzYCAmJiBgcGx1Z2luc2AgdG8gcmV0dXJuIG9iamVjdFxuICAgIE9iamVjdC5hc3NpZ24oY3R4LCB7cGx1Z2lucywgJ2hvb2tzJzogUGx1Z2luSG9va3Moe3BsdWdpbnN9KX0pXG4gICAgaG9va3MgPSBjdHguaG9va3NcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZW5kZXIoKSB7XG4gICAgaG9va3MucHJlUmVuZGVyKE9iamVjdC5hc3NpZ24oeydlbGVtJzogdGFibGV9LCBjdHgpKVxuXG4gICAgcmVuZGVyVGFibGVIZWFkKGN0eClcbiAgICAgIC50aGVuKHRoZWFkID0+IHtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGhlYWQpXG4gICAgICAgIGhvb2tzLnBvc3RIZWFkZXIoeydlbGVtJzogdGhlYWR9KVxuICAgICAgfSlcblxuICAgIHJlbmRlclRhYmxlQm9keShjdHgpXG4gICAgICAudGhlbih0Ym9keSA9PiB7XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRib2R5KVxuICAgICAgICBob29rcy5wb3N0UmVuZGVyKHsnZWxlbSc6IHRhYmxlfSlcbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gX2N1c3RvbUV2ZW50cygpIHtcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWUsIGUgPT4ge1xuICAgICAgY29uc29sZS5ncm91cCgncmVuZGVyJylcbiAgICAgIGNvbnNvbGUud2FybihgVGFibGUgQ3VzdEV2ZW50IEZpcmVkOiAke2V2ZW50cy5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWV9YCwgZS5kZXRhaWwpXG4gICAgICBsZXQge2RhdGF9ID0gZS5kZXRhaWw7XG4gICAgICBjb25zb2xlLndhcm4oYFRhYmxlIEN1c3RFdmVudCByZW5kZXI6IEJFRk9SRSAke2V2ZW50cy5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWV9YCwgZGF0YSlcbiAgICAgIGNvbnNvbGUud2FybihgVGFibGUgQ3VzdEV2ZW50IHJlbmRlcjogQ1VSUkVOVCBEQVRBICR7ZXZlbnRzLmNyZWF0ZVJlbmRlckV2ZW50LmV2ZW50TmFtZX1gLCBjdHguZGF0YSlcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGN0eC5kYXRhID0gZGF0YTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUud2FybihgVGFibGUgQ3VzdEV2ZW50IHJlbmRlcjogQUZURVIgJHtldmVudHMuY3JlYXRlUmVuZGVyRXZlbnQuZXZlbnROYW1lfWAsIGN0eC5kYXRhKVxuICAgICAgZGVzdHJveSgpXG4gICAgICBpbml0KClcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoJ3JlbmRlcicpXG4gICAgfSlcbiAgfVxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIF9pbmplY3RTdHlsZXMoKVxuICAgIF9yZXNldExheW91dCgpXG4gICAgX2N1c3RvbUV2ZW50cygpXG4gICAgX2xvYWRQbHVnaW5zKClcbiAgICBfcmVuZGVyKClcbiAgICByZXR1cm4gY3R4XG4gIH1cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBob29rcy5kZXN0cm95KE9iamVjdC5hc3NpZ24oeydlbGVtJzogdGFibGV9LCBjdHgpKVxuICAgIGlmIChjc3MpICAgeyBjc3MucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjc3MpICAgICB9XG4gICAgaWYgKHRhYmxlKSB7IHRhYmxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFibGUpIH1cbiAgICByZXR1cm4gY3R4XG4gIH1cblxuICByZXR1cm4gaW5pdCgpXG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGFibGUuanNcbiAqKi8iLCJpbXBvcnQge0NvbHVtbn0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCB7Q29uZmlnfTtcblxuZnVuY3Rpb24gQ29uZmlnKHtjb2x1bW5zLCBkYXRhID0gUHJvbWlzZS5yZXNvbHZlKFtdKSwgcGx1Z2lucyA9IFtdLCBkZWJ1ZyA9IGZhbHNlfSkge1xuICBjb2x1bW5zID0gY29sdW1ucy5tYXAoQ29sdW1uKVxuICByZXR1cm4ge2NvbHVtbnMsIGRhdGEsIHBsdWdpbnMsIGRlYnVnfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbmZpZy5qc1xuICoqLyIsIlxuZXhwb3J0IHtDb2x1bW59O1xuXG4vLyA8aW5wdXQgaWQ9XCJ0b2dnbGVDaGVja0FsbFwiIHR5cGU9XCJjaGVja2JveFwiIHRpdGxlPVwiQ2hlY2svVW5jaGVjayBBbGxcIiB2YWx1ZT1cIlwiIC8+XG5cbmZ1bmN0aW9uIENvbHVtbihvcHRzKSB7XG4gIHZhciBrZXkgPSAodHlwZW9mIG9wdHMucmVuZGVyID09PSAnc3RyaW5nJyA/IG9wdHMucmVuZGVyXG4gICAgICAgICAgICA6IG9wdHMua2V5ID8gb3B0cy5rZXlcbiAgICAgICAgICAgIDogb3B0cy5zb3J0KSB8fCBudWxsLFxuICAgICAgY2xhc3NlcyAgPSBvcHRzLmNsYXNzIHx8IG9wdHMuY2xhc3NlcyB8fCAnJyxcbiAgICAgIHRpdGxlICAgID0gb3B0cy50aXRsZSB8fCBrZXksXG4gICAgICBzb3J0ICAgICA9IG9wdHMuc29ydCAgfHwga2V5LFxuICAgICAgY29scyAgICAgPSBvcHRzLmNvbHMgIHx8IDIsXG4gICAgICByZW5kZXIgICA9IG9wdHMucmVuZGVyO1xuICBjbGFzc2VzID0gQXJyYXkuaXNBcnJheShjbGFzc2VzKSA/IGNsYXNzZXNcbiAgICAgICAgICAgIDogdHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnICYmIGNsYXNzZXMuaW5kZXhPZignICcpID4gLTEgPyBjbGFzc2VzLnNwbGl0KCcgJylcbiAgICAgICAgICAgIDogdHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnICYmIGNsYXNzZXMubGVuZ3RoID49IDEgPyBbY2xhc3Nlc10gOiBbXTtcbiAgaWYgKGNsYXNzZXMubGVuZ3RoIDw9IDApIHtcbiAgICBjbGFzc2VzLnB1c2goYHRibC14cy0ke2NvbHN9YCk7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3B0cywge2tleSwgdGl0bGUsIGNsYXNzZXMsIHNvcnQsIHJlbmRlcn0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90eXBlcy5qc1xuICoqLyIsIlxuZXhwb3J0IHtyZW5kZXJUYWJsZUhlYWQsIHJlbmRlclRhYmxlQm9keX07XG5cbmZ1bmN0aW9uIHJlbmRlclRhYmxlSGVhZCh7Y29sdW1ucywgaG9va3N9KSB7XG4gIGNvbnN0IHRoZWFkICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgY29uc3QgdHIgICAgICAgPSBjb2x1bW5zLnJlZHVjZSgodHIsIGMpID0+IHtcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gICAgaG9va3MucHJlSGVhZGVyRmllbGQoe2VsZW0sIGNvbHVtbjogY30pXG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKC4uLmMuY2xhc3Nlcyk7XG4gICAgZWxlbS5pbm5lckhUTUwgPSBjLnRpdGxlO1xuICAgIGVsZW0ucmVuZGVyICAgID0gYy5yZW5kZXI7XG4gICAgZWxlbS5vcHRzICAgICAgPSBjLm9wdHM7XG4gICAgZWxlbS5jb2x1bW4gICAgPSBjO1xuICAgIHRyLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIGhvb2tzLnBvc3RIZWFkZXJGaWVsZCh7ZWxlbSwgY29sdW1uOiBjfSlcbiAgICByZXR1cm4gdHI7XG4gIH0sIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICB0aGVhZC5hcHBlbmRDaGlsZCh0cik7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhlYWQpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYWJsZUJvZHkoY3R4KSB7XG4gIGxldCB7ZGF0YSwgY29sdW1ucywgaG9va3N9ID0gY3R4XG4gIGlmICghZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGEgaXMgbnVsbC4gVHJ5IHNldCB7IGRhdGE6IDxQcm9taXNlfEFycmF5PiB9IGluIFBvd2VyVGFibGUgb3B0aW9ucycpXG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEudGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoZGF0YSB8fCBbXSlcbiAgfVxuICByZXR1cm4gZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBiZWZvcmUgPSBob29rcy5wcmVSZW5kZXIoe2RhdGF9KVxuICAgIGN0eC5kYXRhID0gKGJlZm9yZSAmJiBiZWZvcmUuZGF0YSA/IGJlZm9yZS5kYXRhIDogZGF0YSlcblxuICAgIGNvbnNvbGUuZXJyb3IoJ3JlbmRlclRhYmxlQm9keS5wcmVSZW5kZXIuYmVmb3JlID0nLCBiZWZvcmUpXG5cbiAgICBkYXRhID0gKEFycmF5LmlzQXJyYXkoYmVmb3JlLmRhdGEpID8gYmVmb3JlLmRhdGEgOiBkYXRhKSB8fCBbXVxuICAgIHJldHVybiBkYXRhLnJlZHVjZSgodGJvZHksIHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHByZSA9IGhvb2tzLnByZVJvdyh7ZWxlbTogdGJvZHksIHJvd0luZGV4LCBkYXRhOiByb3d9KVxuICAgICAgaWYgKCFwcmUuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmluZm8oJ3BsdWdpbiBza2lwcGVkIHJvdycsIHJvd0luZGV4LCByb3cpXG4gICAgICAgIHJldHVybiB0Ym9keVxuICAgICAgfVxuICAgICAgY29uc3QgdGJsUm93ID0gY29sdW1ucy5yZWR1Y2UoKHRyLCBjb2x1bW4pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQoZWxlbSlcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKC4uLmNvbHVtbi5jbGFzc2VzKVxuICAgICAgICBlbGVtLmlubmVySFRNTCA9IHR5cGVvZiBjb2x1bW4ucmVuZGVyID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnJlbmRlcih7cm93LCBlbGVtLCBjb2x1bW59KSA6IHJvd1tjb2x1bW4ua2V5XVxuICAgICAgICBob29rcy5wb3N0Q2VsbCh7ZWxlbSwgY29sdW1uLCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgICAgcmV0dXJuIHRyXG4gICAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKVxuICAgICAgaG9va3MucG9zdFJvdyh7ZWxlbTogdGJsUm93LCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgIHRib2R5LmFwcGVuZENoaWxkKHRibFJvdylcbiAgICAgIHJldHVybiB0Ym9keVxuICAgIH0sIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpXG4gIH0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW5kZXIuanNcbiAqKi8iLCIvKipcbiAqIFV0aWxpdHkgJiBydW5uZXIgZm9yIHBsdWdpbnMgbG9hZGVkIGluIGEgZ2l2ZW4gY29udGV4dDpcbiAqL1xuZXhwb3J0IHtQbHVnaW5Ib29rc31cblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBvZiBrZXllZCBmdW5jdGlvbnMgd2hpY2ggd2lsbCBydW4gYWdhaW5zdCBhbnkgYGhhbmRsZXJzYCBpbiBhbnkgb2YgdGhlIHBsdWdpbnMgZ2l2ZW5cbiAqL1xuZnVuY3Rpb24gUGx1Z2luSG9va3Moe3BsdWdpbnN9KSB7XG4gIGNvbnN0IGNyZWF0ZUhvb2sgPSAoZXZlbnROYW1lKSA9PiAoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSA9PiB7XG4gICAgcmV0dXJuIHBsdWdpbnMucmVkdWNlKChvYmosIHApID0+IHtcbiAgICAgIGlmICghb2JqKSB7IHJldHVybiBvYmo7IH0gLy8gcHJvY2Vzc2luZyB3YXMgY2FuY2VsbGVkIGJ5IGEgcGx1Z2luXG4gICAgICB2YXIgdHJhbnNmb3JtZWQgPSB0eXBlb2YgcC5oYW5kbGVyc1tldmVudE5hbWVdID09PSAnZnVuY3Rpb24nID8gcC5oYW5kbGVyc1tldmVudE5hbWVdKG9iaikgOiBvYmpcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFxuICAgIH0sIHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSlcbiAgfVxuICAvLyBBZGQgdGhlc2Ugb24gdGhlIGBoYW5kbGVyc2Aga2V5IG9uIHlvdXIgcGx1Z2luc1xuICByZXR1cm4ge1xuICAgIHByZVJlbmRlcjogICAgICAgICAgY3JlYXRlSG9vaygncHJlUmVuZGVyJyksXG4gICAgcG9zdFJlbmRlcjogICAgICAgICBjcmVhdGVIb29rKCdwb3N0UmVuZGVyJyksXG4gICAgcHJlUm93OiAgICAgICAgICAgICBjcmVhdGVIb29rKCdwcmVSb3cnKSxcbiAgICBwb3N0Um93OiAgICAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RSb3cnKSxcbiAgICBwcmVDZWxsOiAgICAgICAgICAgIGNyZWF0ZUhvb2soJ3ByZUNlbGwnKSxcbiAgICBwb3N0Q2VsbDogICAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RDZWxsJyksXG4gICAgcHJlSGVhZGVyRmllbGQ6ICAgICBjcmVhdGVIb29rKCdwcmVIZWFkZXJGaWVsZCcpLFxuICAgIHBvc3RIZWFkZXJGaWVsZDogICAgY3JlYXRlSG9vaygncG9zdEhlYWRlckZpZWxkJyksXG4gICAgcG9zdEhlYWRlcjogICAgICAgICBjcmVhdGVIb29rKCdwb3N0SGVhZGVyJyksXG4gICAgZGVzdHJveTogICAgICAgICAgICBjcmVhdGVIb29rKCdkZXN0cm95JyksXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BsdWdpbnMvaW5kZXguanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi51bnNlbGVjdGFibGUge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnRibC14cy0xLFxcbi50YmwteHMtMixcXG4udGJsLXhzLTMsXFxuLnRibC14cy00LFxcbi50YmwteHMtNSxcXG4udGJsLXhzLTYsXFxuLnRibC14cy03LFxcbi50YmwteHMtOCxcXG4udGJsLXhzLTksXFxuLnRibC14cy0xMCxcXG4udGJsLXhzLTExLFxcbi50YmwteHMtMTIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLnRibC14cy0xIHtcXG4gIHdpZHRoOiA4LjMzMzMlO1xcbn1cXG4udGJsLXhzLTIge1xcbiAgd2lkdGg6IDE2LjY2NjYlO1xcbn1cXG4udGJsLXhzLTMge1xcbiAgd2lkdGg6IDI0Ljk5OTklO1xcbn1cXG4udGJsLXhzLTQge1xcbiAgd2lkdGg6IDMzLjMzMzIlO1xcbn1cXG4udGJsLXhzLTUge1xcbiAgd2lkdGg6IDQxLjY2NjUlO1xcbn1cXG4udGJsLXhzLTYge1xcbiAgd2lkdGg6IDQ5Ljk5OTglO1xcbn1cXG4udGJsLXhzLTcge1xcbiAgd2lkdGg6IDU4LjMzMzElO1xcbn1cXG4udGJsLXhzLTgge1xcbiAgd2lkdGg6IDY2LjY2NjQlO1xcbn1cXG4udGJsLXhzLTkge1xcbiAgd2lkdGg6IDc0Ljk5OTclO1xcbn1cXG4udGJsLXhzLTEwIHtcXG4gIHdpZHRoOiA4My4zMzMxJTtcXG59XFxuLnRibC14cy0xMSB7XFxuICB3aWR0aDogOTEuNjY2MyU7XFxufVxcbi50YmwteHMtMTIge1xcbiAgd2lkdGg6IDk5Ljk5OTYlO1xcbn1cXG4ucG93ZXItdGFibGUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbn1cXG4ucG93ZXItdGFibGUgdHIge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ucG93ZXItdGFibGUgdGhlYWQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRoZWFkIHRoIHtcXG4gIC8qIGRncmlkLWlzaCAqL1xcbiAgYmFja2dyb3VuZDogI2YyZjJmMjtcXG4gIGNvbG9yOiAjNjI2MjYyO1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNBQUE7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgZm9udC1zaXplOiAxLjMxZW07XFxuICBwYWRkaW5nOiA2cHggMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1heC1oZWlnaHQ6IDM1cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkge1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkZGRkO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci13aWR0aDogMHB4IDBweCAwcHggMXB4O1xcbiAgcGFkZGluZzogNnB4IDNweDtcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcbiAgaGVpZ2h0OiAyNTBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdGQge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIG1hcmdpbjogMDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IC5yb3ctb2RkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlY2VjZWMgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzIGVhc2Utb3V0O1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuZGlzYWJsZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2ggIWltcG9ydGFudDtcXG4gIGN1cnNvcjogbm9uZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLmRpc2FibGVkIGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHI6aG92ZXIgLm5hbWUge1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0IwQjBCMCAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLnNlbGVjdGVkIC5uYW1lIHtcXG4gIHBhZGRpbmctbGVmdDogNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWxlZnQge1xcbiAgdGV4dC1hbGlnbjogbGVmdCAgICAhaW1wb3J0YW50O1xcbn1cXG4ucG93ZXItdGFibGUgLnRleHQtY2VudGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlciAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LXJpZ2h0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0ICAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWp1c3RpZnkge1xcbiAgdGV4dC1hbGlnbjoganVzdGlmeSAhaW1wb3J0YW50O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3NyYy9zdHlsZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtnZXRJZH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCB7ZXZlbnRzfSBmcm9tICcuLi9ldmVudHMnXG5cbmV4cG9ydCBmdW5jdGlvbiBTZWxlY3RhYmxlKHt0YWJsZSwgZGF0YX0pIHtcbiAgY29uc3Qgc2VsZWN0ZWQgICAgICAgID0gW11cbiAgY29uc3QgY2xlYW51cEhhbmRsZXJzID0gW11cblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdzZWxlY3RhYmxlJyxcbiAgICBtaXhpbnM6IHtcbiAgICAgIGlzU2VsZWN0ZWQsXG4gICAgICBzZWxlY3RBZGQsXG4gICAgICBzZWxlY3RBbGwsXG4gICAgICBzZWxlY3RUb2dnbGUsXG4gICAgICBnZXRTZWxlY3RlZCxcbiAgICAgIHNlbGVjdE5vbmUsXG4gICAgICBzZWxlY3RSZW1vdmVcbiAgICB9LFxuICAgIGhhbmRsZXJzOiB7XG4gICAgICBkZXN0cm95OiAgICAgICAgICBfZGVzdHJveSxcbiAgICAgIHBvc3RSZW5kZXI6ICAgICAgIF9wb3N0UmVuZGVyLFxuICAgICAgcG9zdEhlYWRlcjogICAgICAgX3Bvc3RIZWFkZXIsXG4gICAgICBwcmVIZWFkZXJGaWVsZDogICBfcHJlSGVhZGVyRmllbGQsXG4gICAgfSxcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdEFsbFRvZ2dsZUNsaWNrID0gKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgc2VsZWN0QWxsKClcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0Tm9uZSgpXG4gICAgfVxuICB9XG5cbiAgLy8gY29uc3Qgc2VsZWN0SXRlbUNsaWNrID0gKGUpID0+IHtcbiAgLy8gICBsZXQgZWwgPSBlLnRhcmdldFxuICAvLyAgIGlmIChlbC5jaGVja2VkKSB7XG4gIC8vICAgICBzZWxlY3RJdGVtKGVsLnZhbHVlLCB0cnVlKVxuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICBzZWxlY3RJdGVtKGVsLnZhbHVlLCBmYWxzZSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICBmdW5jdGlvbiBfZGVzdHJveSgpIHtcbiAgICByZXR1cm4gY2xlYW51cEhhbmRsZXJzLm1hcChybSA9PiBybSgpKSAvLyBzaG91bGQgcmV0dXJuIHNwYXJzZSBhcnJheSB3LyBsZW5ndGggPT09ICMgb2YgY2xlYW51cCBtZXRob2QgY2FsbHNcbiAgfVxuXG4gIGZ1bmN0aW9uIF9wb3N0UmVuZGVyKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGxldCB0Ym9keSA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG4gICAgaWYgKCF0Ym9keSkgeyB0aHJvdyBuZXcgRXJyb3IoJ05vIHRhYmxlIGJvZHkgZm91bmQhISEhIScpIH1cbiAgICB0Ym9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9oYW5kbGVTZWxlY3QpXG4gICAgY2xlYW51cEhhbmRsZXJzLnB1c2goKCkgPT4gdGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfaGFuZGxlU2VsZWN0KSlcbiAgICByZXR1cm4gYXJndW1lbnRzWzBdXG4gIH1cblxuICBmdW5jdGlvbiBfcG9zdEhlYWRlcih7ZWxlbX0pIHtcblxuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RBbGxUb2dnbGVDbGljaylcbiAgICBjbGVhbnVwSGFuZGxlcnMucHVzaCgoKSA9PiBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0QWxsVG9nZ2xlQ2xpY2spKVxuXG4gIH1cblxuICBmdW5jdGlvbiBfcHJlSGVhZGVyRmllbGQoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSB7XG4gICAgaWYgKGNvbHVtbi5zZWxlY3Rpb24pIHtcbiAgICAgIGNvbHVtbi50aXRsZSA9IGA8aW5wdXQgaWQ9XCJ0b2dnbGVDaGVja0FsbFwiIHR5cGU9XCJjaGVja2JveFwiIHRpdGxlPVwiQ2hlY2svVW5jaGVjayBBbGxcIiB2YWx1ZT1cIlwiIC8+YDtcbiAgICAgIGNvbHVtbi5yZW5kZXIgPSAoe2VsZW0sIGNvbHVtbiwgcm93fSkgPT4ge1xuICAgICAgICBsZXQgX2dldElkID0gY29sdW1uLmdldElkIHx8IGdldElkO1xuICAgICAgICByZXR1cm4gYDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIiR7X2dldElkKHJvdyl9XCIgJHtpc1NlbGVjdGVkKF9nZXRJZChyb3cpKSA/ICcgY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJ30gLz5gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICAgIEFycmF5LmZyb20odGFibGUucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdGlvbi1jb2wgW3R5cGU9XCJjaGVja2JveFwiXScpKVxuICAgICAgLm1hcChmdW5jdGlvbihlbCkge3JldHVybiBlbC52YWx1ZTt9KVxuICAgICAgLm1hcChzZWxlY3RJdGVtKHRydWUpKVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0Tm9uZSgpIHtcbiAgICBBcnJheS5mcm9tKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rpb24tY29sIFt0eXBlPVwiY2hlY2tib3hcIl0nKSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oZWwpIHtyZXR1cm4gZWwudmFsdWV9KVxuICAgICAgLm1hcChzZWxlY3RJdGVtKGZhbHNlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdEl0ZW0oaWQsIGJvb2wpIHtcbiAgICBpZiAodHlwZW9mIGJvb2wgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBpZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAvLyByZXZlcnNlIHBhcmFtc1xuICAgICAgW2lkLCBib29sXSA9IFtib29sLCBpZF1cbiAgICB9XG4gICAgaWYgKCFpZCkge3JldHVybiBmYWxzZX1cblxuICAgIHZhciBjaGsgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1cImNoZWNrYm94XCJdW3ZhbHVlPVwiJyArIGlkICsgJ1wiXScpXG4gICAgaWYgKGNoaykge1xuICAgICAgLy8gc2VlIGlmIHdlIGFyZSBpbiAndG9nZ2xlIG1vZGUnXG4gICAgICBpZiAodHlwZW9mIGJvb2wgPT09ICd1bmRlZmluZWQnIHx8IGJvb2wgPT09IG51bGwpIHtcbiAgICAgICAgYm9vbCA9ICFjaGsuY2hlY2tlZCAvLyBUb2dnbGUgaXQhXG4gICAgICB9XG4gICAgICBpZiAoYm9vbCkge1xuICAgICAgICBjaGsuY2hlY2tlZCA9ICdjaGVja2VkJ1xuICAgICAgICBjaGsuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKVxuICAgICAgICBjaGsucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAgICAgaWYgKHNlbGVjdGVkLmluZGV4T2YoaWQpID09PSAtMSkge3NlbGVjdGVkLnB1c2goaWQpfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hrLmNoZWNrZWQgPSB1bmRlZmluZWRcbiAgICAgICAgY2hrLnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpXG4gICAgICAgIGNoay5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKVxuICAgICAgICBpZiAoc2VsZWN0ZWQuaW5kZXhPZihpZCkgIT09IC0xKSB7c2VsZWN0ZWQuc3BsaWNlKHNlbGVjdGVkLmluZGV4T2YoaWQpLCAxKX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXRTdGF0dXNUb3RhbHModXNlcnMubGVuZ3RoLCBzZWxlY3RlZC5sZW5ndGgpXG4gICAgdGFibGUuZGlzcGF0Y2hFdmVudChldmVudHMuY3JlYXRlU3RhdHVzRXZlbnQoe3NlbGVjdGVkLCBkYXRhfSkpXG4gICAgdGFibGUuZGlzcGF0Y2hFdmVudChldmVudHMuY3JlYXRlU2VsZWN0RXZlbnQoe3NlbGVjdGVkfSkpXG5cbiAgICByZXR1cm4geydpZCc6IGlkLCAnY2hlY2tlZCc6IGJvb2wsICdlbGVtJzogY2hrfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0VG9nZ2xlKGlkKSB7ICAgcmV0dXJuIHNlbGVjdEl0ZW0oaWQsIHVuZGVmaW5lZCkgfVxuICBmdW5jdGlvbiBzZWxlY3RBZGQoaWQpIHsgICAgICByZXR1cm4gc2VsZWN0SXRlbShpZCwgdHJ1ZSkgfVxuICBmdW5jdGlvbiBzZWxlY3RSZW1vdmUoaWQpIHsgICByZXR1cm4gc2VsZWN0SXRlbShpZCwgZmFsc2UpIH1cbiAgZnVuY3Rpb24gaXNTZWxlY3RlZChpZCkgeyAgICAgcmV0dXJuIHNlbGVjdGVkLmluZGV4T2YoaWQpID4gLTEgfVxuICBmdW5jdGlvbiBnZXRTZWxlY3RlZCgpIHsgICAgICByZXR1cm4gc2VsZWN0ZWQgfVxuXG4gIGZ1bmN0aW9uIF9oYW5kbGVTZWxlY3QoZSkge1xuICAgIHZhciBlbCwgdmFsXG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgIHZhbCA9IGUudGFyZ2V0LnZhbHVlXG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVFInKSB7XG4gICAgICBlbCA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpXG4gICAgICBpZiAoZWwgJiYgZWwudmFsdWUpIHsgdmFsID0gZWwudmFsdWUgfVxuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJykge1xuICAgICAgZWwgPSBlLnRhcmdldC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpXG4gICAgICBpZiAoZWwgJiYgZWwudmFsdWUpIHsgdmFsID0gZWwudmFsdWUgfVxuICAgIH1cblxuICAgIGNvbnNvbGUud2FybignX2hhbmRsZVNlbGVjdCBUcmlnZ2VyZWQnLCB2YWwsIGVsLCBlKVxuICAgIGlmICh2YWwpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgc2VsZWN0VG9nZ2xlKHZhbClcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qc1xuICoqLyIsIlxuLyoqXG4gKiBVdGlsaXR5IGFycmF5aWZ5IG1ldGhvZFxuICogQWRkIHRvIC5wcm90b3R5cGUgb2YgSXRlcmF0b3JzLCBBcnJheUJ1ZmZlciwgQXJndW1lbnRzLCBOb2RlTGlzdCwgU2V0L1dlYWtTZXQsIHdoYXRldmVyICNZT0xPXG4gKlxuICogLi4uIE9yIGp1c3QgdXNlIGFzIHV0aWwsIGFzIG5lZWRlZCwgI0p1c3REb0l0XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShsaXN0KSB7XG4gIGxpc3QgPSBBcnJheS5pc0FycmF5KGxpc3QpID8gbGlzdCA6IHRoaXNcbiAgbGlzdCA9ICFsaXN0ID8gW10gOiBsaXN0XG4gIHJldHVybiBBcnJheS5mcm9tICYmIEFycmF5LmZyb20obGlzdCkgfHwgWyd1cGdyYWRlIHlvdXIgYnJvd3NlciwgcGZmdCddXG59XG5cbi8qKlxuICogR2V0IGBBcnJheS5zb3J0YCBmdW5jdGlvbiBmb3Iga2V5IG5hbWUgY29tcGFyaXNvbnMgKHN1cHBvcnRzIHJldmVyc2UpXG4gKlxuICogV2hlbiBuYW1lID09PSAnZW1haWwgICAtLS0gU29ydCBlbWFpbCBhc2NlbmRpbmcuXG4gKlxuICogV2hlbiBuYW1lID09PSAnLWVtYWlsICAtLS0gU29ydCBlbWFpbCBkZXNjZW5kaW5nXG4gKlxuICogQHJldHVybnMgW2Z1bmN0aW9uXSBjb21wYXJlciB1c2VkIGluIGBBcnJheS5zb3J0KClgXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U29ydGVyKGtleSkge1xuICBjb25zdCBfZW5nbGlzaFNvcnQgICAgICAgICA9IChhLCBiKSA9PiAoYVtrZXldIDwgYltrZXldID8gLTEgOiAoYVtrZXldID4gYltrZXldID8gMSA6IDApKVxuICBjb25zdCBfZW5nbGlzaFNvcnRSZXZlcnNlZCA9IChhLCBiKSA9PiAoYVtrZXldID49IGJba2V5XSA/IC0xIDogKGFba2V5XSA8IGJba2V5XSA/IDEgOiAwKSlcblxuICBpZiAoa2V5WzBdID09PSAnLScpIHtcbiAgICBrZXkgPSBrZXkuc3Vic3RyKDEpO1xuICAgIHJldHVybiBfZW5nbGlzaFNvcnRSZXZlcnNlZDtcbiAgfVxuICByZXR1cm4gX2VuZ2xpc2hTb3J0O1xufVxuXG4vKipcbiAqIEFjY2VwdHMgZWxlbWVudHMgZnJvbSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbGBcbiAqXG4gKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBvZiBAbm9kZVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFsbChub2RlKSB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgTm9kZUxpc3QpIHsgbm9kZSA9IHRoaXM7IH1cblxuICB0b0FycmF5KG5vZGUpXG4gICAgLmZvckVhY2goZWwgPT4gZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKSlcbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBUb3RlcyBvYnZpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZCh7aWQsIF9pZH0pIHsgcmV0dXJuIGlkIHx8IF9pZDsgfVxuXG5cbi8qKlxuICogV2FybmluZzogUHJpdmF0ZS9sb2NhbCB1c2Ugb25seS4gRG8gbm90IGhvaXN0LlxuICogKioqIFVuc2FmZSBIVE1ML3N0cmluZyBoYW5kbGluZyAqKipcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW0gPSBodG1sID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGRpdi5pbm5lckhUTUwgPSBodG1sIC8vIFBvdGVudGlhbCBTZWN1cml0eSBFeHBsb2l0IFZlY3RvciEhISEhIVxuICB0b0FycmF5KGRpdi5jaGlsZHJlbilcbiAgICAuZm9yRWFjaChlbCA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwpKVxuICByZXR1cm4gY29udGFpbmVyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsIlxuLy8gTGlzdCBzeW50aGV0aWMgZXZlbnQgaGFuZGxlcnNcbmNvbnN0IGNyZWF0ZVJlbmRlckV2ZW50ID0gKG9wdHMpID0+IG5ldyBDdXN0b21FdmVudChjcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWUsIHsgJ2RldGFpbCc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCAnYnViYmxlcyc6IHRydWUsICdjYW5jZWxhYmxlJzogZmFsc2UgfSlcbmNyZWF0ZVJlbmRlckV2ZW50LmV2ZW50TmFtZSA9ICdyZW5kZXInXG5jb25zdCBjcmVhdGVTdGF0dXNFdmVudCA9IChvcHRzKSA9PiBuZXcgQ3VzdG9tRXZlbnQoY3JlYXRlU3RhdHVzRXZlbnQuZXZlbnROYW1lLCB7ICdkZXRhaWwnOiBPYmplY3QuYXNzaWduKHt9LCBvcHRzKSwgJ2J1YmJsZXMnOiB0cnVlLCAnY2FuY2VsYWJsZSc6IGZhbHNlIH0pXG5jcmVhdGVTdGF0dXNFdmVudC5ldmVudE5hbWUgPSAnc3RhdHVzJ1xuY29uc3QgY3JlYXRlU2VsZWN0RXZlbnQgPSAob3B0cykgPT4gbmV3IEN1c3RvbUV2ZW50KGNyZWF0ZVNlbGVjdEV2ZW50LmV2ZW50TmFtZSwgeyAnZGV0YWlsJzogT2JqZWN0LmFzc2lnbih7fSwgb3B0cyksICdidWJibGVzJzogdHJ1ZSwgJ2NhbmNlbGFibGUnOiBmYWxzZSB9KVxuY3JlYXRlU2VsZWN0RXZlbnQuZXZlbnROYW1lID0gJ3NlbGVjdCdcbmNvbnN0IGNyZWF0ZVNvcnRlZEV2ZW50ID0gKG9wdHMpID0+IG5ldyBDdXN0b21FdmVudChjcmVhdGVTb3J0ZWRFdmVudC5ldmVudE5hbWUsIHsgJ2RldGFpbCc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCAnYnViYmxlcyc6IHRydWUsICdjYW5jZWxhYmxlJzogZmFsc2UgfSlcbmNyZWF0ZVNvcnRlZEV2ZW50LmV2ZW50TmFtZSA9ICdzb3J0ZWQnXG5cbi8qKlxuICogSSBkb24ndCBrbm93IGhvdyBJIGZlZWwgYWJvdXQgdGhpcy4uLlxuICogSG1tbSwgaSB0aGluayBhIGZhY3RvcnkgZnVuY3Rpb24gaXMgbmVlZGVkLi4uXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudHMgPSB7XG4gIGNyZWF0ZVJlbmRlckV2ZW50LFxuICBjcmVhdGVTdGF0dXNFdmVudCxcbiAgY3JlYXRlU2VsZWN0RXZlbnQsXG4gIGNyZWF0ZVNvcnRlZEV2ZW50LFxufVxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V2ZW50cy5qc1xuICoqLyIsImltcG9ydCB7Z2V0U29ydGVyLCBjcmVhdGVFbGVtLCB0b0FycmF5LCByZW1vdmVBbGx9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQge2V2ZW50c30gZnJvbSAnLi4vZXZlbnRzJ1xuXG5leHBvcnQgZnVuY3Rpb24gU29ydGFibGUoY3R4KSB7XG4gIGxldCB7dGFibGUsIGRlZmF1bHRTb3J0fSA9IGN0eDtcbiAgY29uc3QgY2xlYW51cEhhbmRsZXJzID0gW11cbiAgbGV0IHNvcnRCeSA9IGRlZmF1bHRTb3J0IHx8ICcnO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3NvcnRhYmxlJyxcbiAgICBtaXhpbnM6IHtcbiAgICAgIHNvcnRCeUNvbHVtbixcbiAgICB9LFxuICAgIGhhbmRsZXJzOiB7XG4gICAgICBkZXN0cm95OiAgICAgICAgX2Rlc3Ryb3ksXG4gICAgICBwcmVSZW5kZXI6ICAgICAgX3ByZVJlbmRlcixcbiAgICAgIHBvc3RIZWFkZXI6ICAgICBfcG9zdEhlYWRlcixcbiAgICAgIHByZUhlYWRlckZpZWxkOiBfcHJlSGVhZGVyRmllbGQsXG4gICAgfSxcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyaWdnZXJSZW5kZXIoZGF0YSkge1xuICAgIHRhYmxlLmRpc3BhdGNoRXZlbnQoZXZlbnRzLmNyZWF0ZVJlbmRlckV2ZW50KHtkYXRhOiAoZGF0YSB8fCBjdHguZGF0YSksIHRhYmxlfSkpXG4gIH1cblxuICBmdW5jdGlvbiB0cmlnZ2VyU29ydGVkKCkge1xuICAgIHRhYmxlLmRpc3BhdGNoRXZlbnQoZXZlbnRzLmNyZWF0ZVNvcnRlZEV2ZW50KHtzb3J0Qnl9KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpZXcoKSB7XG4gICAgLy8gc2V0IHRoZSB1cC9kb3duIGFycm93IGluIGNvbCBuYW1lc1xuICAgIGNvbnN0IHVwQXJyb3cgICAgID0gJyYjOTY1MDsnXG4gICAgY29uc3QgZG93bkFycm93ICAgPSAnJiM5NjYwOydcbiAgICBjb25zdCBzb3J0SWNvbnMgICA9IHRvQXJyYXkodGFibGUucXVlcnlTZWxlY3RvckFsbCgnYi5zb3J0LWFycm93JykpXG4gICAgY29uc3QgZWwgICAgICAgICAgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGB0aFtzb3J0PSR7c29ydEJ5LnJlcGxhY2UoLy0vLCAnJyl9XWApXG4gICAgcmVtb3ZlQWxsKHNvcnRJY29ucylcbiAgICBpZiAoZWwpIHtcbiAgICAgIGxldCBzb3J0ID0gZWwuZ2V0QXR0cmlidXRlKCdzb3J0JylcbiAgICAgIGxldCBkZXNjID0gc29ydC5pbmRleE9mKCctJykgPT09IDBcbiAgICAgIGxldCBpY29uID0gY3JlYXRlRWxlbShgPGIgY2xhc3M9J3NvcnQtYXJyb3cnPiR7ZGVzYyA/IGRvd25BcnJvdyA6IHVwQXJyb3d9PC9iPmApXG4gICAgICBlbC5hcHBlbmRDaGlsZChpY29uKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9jb2x1bW5DbGlja2VkKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBsZXQgZWwgPSBlLnRhcmdldFxuICAgIGVsID0gZWwubWF0Y2hlcygndGgnKSA/IGVsIDogKGVsLmNsb3Nlc3QgJiYgZWwuY2xvc2VzdCgndGgnKSB8fCBlbClcbiAgICBsZXQgY2xpY2tlZFNvcnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ3NvcnQnKVxuICAgIGNvbnNvbGUuaW5mbygnc29ydCBjbGlja2VkPywgRUxFTTogJywgZWwsICdcXG5TT1JULlJFUVVFU1RFRDonLCBjbGlja2VkU29ydClcbiAgICBpZiAoY2xpY2tlZFNvcnQpIHtcbiAgICAgIHNvcnRCeSA9IGNsaWNrZWRTb3J0ID09PSBzb3J0QnkgPyAnLScuY29uY2F0KGNsaWNrZWRTb3J0KSA6IGNsaWNrZWRTb3J0XG4gICAgICBjb25zb2xlLndhcm4oJ1BSRS5zb3J0QnlDb2x1bW4nLCBzb3J0QnkpXG4gICAgICBjdHguZGVmYXVsdFNvcnQgPSBzb3J0QnlcbiAgICAgIHNvcnRCeUNvbHVtbihzb3J0QnkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2Fybignc2tpcHBpbmcgc29ydCwgRUxFTTogJywgZWwsICdcXG5FVkVOVDonLCBlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZXN0cm95KCkge1xuICAgIHJldHVybiBjbGVhbnVwSGFuZGxlcnMubWFwKHJtID0+IHJtKCkpIC8vIHNob3VsZCBiZSBzcGFyc2UgYXJyYXkgdy8gbGVuZ3RoID09PSAjIG9mIGNsZWFudXAgbWV0aG9kIGNhbGxzXG4gIH1cblxuICBmdW5jdGlvbiBfcHJlUmVuZGVyKHtkYXRhfSkge1xuICAgIGNvbnN0IGRhdGFTb3J0ZXIgPSAoZGF0YSwgc29ydEtleSkgPT4gZGF0YS5zb3J0KGdldFNvcnRlcihzb3J0S2V5KSlcblxuICAgIGlmICghc29ydEJ5IHx8IHNvcnRCeS5sZW5ndGggPD0gMCkgeyByZXR1cm4ge2RhdGF9IH1cblxuICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhLnRoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoZGF0YSlcbiAgICB9XG5cbiAgICByZXR1cm4ge2RhdGE6IGRhdGEudGhlbihkYXRhID0+IGRhdGFTb3J0ZXIoZGF0YSwgc29ydEJ5KSl9XG4gIH1cblxuICBmdW5jdGlvbiBfcG9zdEhlYWRlcih7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pIHtcbiAgICBsZXQgdGhlYWQgPSBlbGVtIC8vZWxlbS5xdWVyeVNlbGVjdG9yKCd0aGVhZCcpXG4gICAgaWYgKCF0aGVhZCkgeyB0aHJvdyBuZXcgRXJyb3IoJ05vIHRhYmxlIGhlYWQgZm91bmQhISEhIScpIH1cbiAgICB0aGVhZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jb2x1bW5DbGlja2VkKVxuICAgIGNsZWFudXBIYW5kbGVycy5wdXNoKCgpID0+IHRoZWFkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2NvbHVtbkNsaWNrZWQpKVxuICAgIHJldHVybiBhcmd1bWVudHNbMF1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIF9wb3N0SGVhZGVyKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAvLyAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY29sdW1uQ2xpY2tlZClcbiAgLy8gICByZXR1cm4gYXJndW1lbnRzWzBdXG4gIC8vIH1cblxuICBmdW5jdGlvbiBzb3J0QnlDb2x1bW4oX3NvcnRCeSkge1xuICAgIHNvcnRCeSA9IF9zb3J0QnlcbiAgICB1cGRhdGVWaWV3KClcbiAgICB0cmlnZ2VyUmVuZGVyKClcbiAgICB0cmlnZ2VyU29ydGVkKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9wcmVIZWFkZXJGaWVsZCh7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pIHtcbiAgICBpZiAoY29sdW1uLnNvcnQpIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzb3J0JywgY29sdW1uLnNvcnQpXG4gICAgfVxuICAgIHJldHVybiBhcmd1bWVudHNbMF1cbiAgfVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL3NvcnRhYmxlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==