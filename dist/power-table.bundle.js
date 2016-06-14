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
	      console.trace('TABLE.postHeader', thead);
	      hooks.postHeader({ 'elem': thead });
	    });
	
	    (0, _render2.renderTableBody)(ctx).then(function (tbody) {
	      table.appendChild(tbody);
	      hooks.postRender({ 'elem': table });
	    });
	  }
	  function _customEvents() {
	    table.addEventListener(_events.events.createSortedEvent.eventName, function (_ref) {
	      var detail = _ref.detail;
	
	      console.trace('TABLE.EVENTS.SORTED', detail);
	    });
	
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
	    if (css && css.parentNode) {
	      css.parentNode.removeChild(css);
	    }
	    if (table && table.parentNode) {
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
	
	function Selectable(ctx) {
	  var table = ctx.table;
	  var data = ctx.data;
	
	  var selected = ctx.selected || [];
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
	    console.warn('selectAllToggleClick', e.target, e);
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
	
	  function _postRender(_ref) {
	    var elem = _ref.elem;
	    var data = _ref.data;
	    var column = _ref.column;
	    var rowIndex = _ref.rowIndex;
	
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
	
	  function _postHeader(_ref2) {
	    var elem = _ref2.elem;
	
	    elem = table.querySelector('#toggleCheckAll');
	    console.warn('Setting SelectAll/None Click', elem);
	    elem.addEventListener('click', selectAllToggleClick);
	    cleanupHandlers.push(function () {
	      return elem.removeEventListener('click', selectAllToggleClick);
	    });
	    console.warn('SET SelectAll/None Click', elem);
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
	        return '<input type="checkbox" class="select-item" value="' + _getId(row) + '" ' + (isSelected(_getId(row)) ? ' checked="checked"' : '') + ' />';
	      };
	    }
	    return arguments[0];
	  }
	
	  function selectAll() {
	    Array.from(table.querySelectorAll('input.select-item[type="checkbox"]')).map(function (el) {
	      return el.value;
	    }).map(selectItem.bind(null, true));
	  }
	
	  function selectNone() {
	    Array.from(table.querySelectorAll('input.select-item[type="checkbox"]')).map(function (el) {
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
	
	    ctx.selected = selected;
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
	  var key = _ref.key;
	  return id || _id || key;
	}
	
	/**
	 * Warning: Private/local use only. Do not hoist.
	 * *** Unsafe HTML/string handling ***
	 */
	var createElem = exports.createElem = function createElem(html) {
	  var container = document.createDocumentFragment();
	  var div = document.createElement('div');
	  div.innerHTML = html; // Potential Security Exploit Vector!!!!!!
	  container.appendChild(div);
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
	    console.trace('SORTABLE._columnClicked', e);
	
	    // e.preventDefault()
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
	
	    console.trace('SORTABLE._preRender', data);
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
	
	    console.trace('SORTABLE._postHeader', elem);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwY2I2YWIyMDE5NzM5ZDY2ZGQxMCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz85NDg4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL3NvcnRhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSw0R0FBa0osRTs7Ozs7Ozs7Ozs7O1NDSWxJLEssR0FBQSxLOztBQUpoQjs7QUFDQTs7QUFDQTs7QUFFTyxVQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLEVBQTZCO0FBQ2xDLE9BQUks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QUFuQixNQUFtQjtBQUFBLFNBQVgsUUFBVyxTQUFYLFFBQVc7O0FBQ25ELGFBQVEsS0FBUixDQUFjLHNCQUFkLEVBQXNDLElBQXRDO0FBQ0EsU0FBSSxRQUFRLElBQVosQztBQUNBLFNBQUksQ0FBQyxLQUFMLEVBQVk7QUFBRSxhQUFNLElBQUksS0FBSixDQUFVLDBCQUFWLENBQU47QUFBNkM7QUFDM0QsV0FBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxjQUFoQztBQUNBLHFCQUFnQixJQUFoQixDQUFxQjtBQUFBLGNBQU0sTUFBTSxtQkFBTixDQUEwQixPQUExQixFQUFtQyxjQUFuQyxDQUFOO0FBQUEsTUFBckI7QUFDQSxZQUFPLFVBQVUsQ0FBVixDQUFQO0FBQ0Q7Ozs7Ozs7QUFPRCxZQUFTLFlBQVQsQ0FBc0IsT0FBdEIsRUFBK0I7QUFDN0IsY0FBUyxPQUFUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7O0FBRUQsWUFBUyxlQUFULFFBQXlEO0FBQUEsU0FBL0IsSUFBK0IsU0FBL0IsSUFBK0I7QUFBQSxTQUF6QixJQUF5QixTQUF6QixJQUF5QjtBQUFBLFNBQW5CLE1BQW1CLFNBQW5CLE1BQW1CO0FBQUEsU0FBWCxRQUFXLFNBQVgsUUFBVzs7QUFDdkQsU0FBSSxPQUFPLElBQVgsRUFBaUI7QUFDZixZQUFLLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsT0FBTyxJQUFqQztBQUNEO0FBQ0QsWUFBTyxVQUFVLENBQVYsQ0FBUDtBQUNEO0FBRUYsRSIsImZpbGUiOiJwb3dlci10YWJsZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJQb3dlclRhYmxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBvd2VyVGFibGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDBjYjZhYjIwMTk3MzlkNjZkZDEwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJQb3dlclRhYmxlXCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL3Bvd2VyLXRhYmxlL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJwcmVzZXRzXFxcIjpbXFxcImVzMjAxNVxcXCJdfSEvVXNlcnMvZGxldnkvY29kZS9vc3MvcG93ZXItdGFibGUvaW5kZXguanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtUYWJsZSBhcyBUfSBmcm9tICcuL3NyYy90YWJsZSdcbmltcG9ydCB7U2VsZWN0YWJsZX0gZnJvbSAnLi9zcmMvcGx1Z2lucy9zZWxlY3RhYmxlJ1xuaW1wb3J0IHtTb3J0YWJsZX0gICBmcm9tICcuL3NyYy9wbHVnaW5zL3NvcnRhYmxlJ1xuXG5leHBvcnQgZnVuY3Rpb24gVGFibGUoZWxlbSwgY29uZmlnKSB7XG4gIGlmICghZWxlbSkgICB7IHRocm93IG5ldyBFcnJvcignVGFibGUgaW5zdGFuY2UgcmVxdWlyZXMgMXN0IHBhcmFtIGBlbGVtYCcpIH1cbiAgaWYgKCFjb25maWcpIHsgdGhyb3cgbmV3IEVycm9yKCdUYWJsZSBpbnN0YW5jZSByZXF1aXJlcyAybmQgcGFyYW0gYGNvbmZpZ2AnKSB9XG4gIGlmICghY29uZmlnLnBsdWdpbnMpIHtjb25maWcucGx1Z2lucyA9IFtdfVxuXG4gIC8vIGRlZmF1bHQgcGx1Z2luc1xuICBjb25maWcucGx1Z2lucy5wdXNoKFNvcnRhYmxlKVxuICBjb25maWcucGx1Z2lucy5wdXNoKFNlbGVjdGFibGUpXG5cbiAgcmV0dXJuIFQoZWxlbSwgY29uZmlnKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsIi8qIE9iamVjdCBGYWN0b3JpZXMgKi9cbmltcG9ydCB7Q29uZmlnfSAgICAgICBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7UGx1Z2luSG9va3N9ICBmcm9tICcuL3BsdWdpbnMnXG5cbi8qIEhlbHBlciB1dGlscyAqL1xuaW1wb3J0IHtyZW5kZXJUYWJsZUhlYWQsIHJlbmRlclRhYmxlQm9keX0gZnJvbSAnLi9yZW5kZXInXG5pbXBvcnQge2V2ZW50c30gICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2V2ZW50cydcblxuXG4vKipcbiAqIFRhYmxlIGNsYXNzIC0gc3RhcnQgaGVyZS5cbiAqXG4gKiBgYGBqc1xuICogbGV0IHBvd2VyVGFibGUgPSBUYWJsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci10YWJsZScpLCB7XG4gKiAgIGNvbHVtbnM6IFtcbiAqICAgICB7dGl0bGU6ICdDb2wgIzEnLCByZW5kZXI6ICdjb2x1bW5fMScsIHNvcnQ6ICdjb2x1bW5fMScsIGNvbHM6IDN9LFxuICogICAgIHt0aXRsZTogJ0NvbCAjMicsIHJlbmRlcjogJ2NvbHVtbl8yJywgc29ydDogJ2NvbHVtbl8yJywgY29sczogM30sXG4gKiAgIF0sXG4gKiAgIGRhdGE6IFtcbiAqICAgICB7Y29sdW1uXzE6ICdyb3cgMSAtIGNvbCAxJywgY29sdW1uXzI6ICdyb3cgMSAtIGNvbCAyJ30sXG4gKiAgICAge2NvbHVtbl8xOiAncm93IDIgLSBjb2wgMScsIGNvbHVtbl8yOiAncm93IDIgLSBjb2wgMid9LFxuICogICAgIHtjb2x1bW5fMTogJ3JvdyAzIC0gY29sIDEnLCBjb2x1bW5fMjogJ3JvdyAzIC0gY29sIDInfSxcbiAqICAgXSxcbiAqICAgcGx1Z2luczogbnVsbCxcbiAqICAgZGVidWc6IGZhbHNlXG4gKiB9KVxuICogLy8gQWRkZWQgYSBQb3dlclRhYmxlIHRvIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci10YWJsZScpYFxuICogYGBgXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgLSBXcmFwcGVyL3Jvb3QgZWxlbWVudFxuICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSBEZWZpbmUgcGx1Z2lucyBpbiBoZXJlLCBzZWUgdGVzdHMvZXhhbXBsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlKGVsLCBjb25maWcpIHtcbiAgbGV0IHRhYmxlLCBjc3MsIGhvb2tzXG4gIGNvbnN0IGN0eCA9IHsgZGVzdHJveSB9IC8vIFBsYWluIG9iamVjdCBgY3R4YCB3aWxsIGJlIHJldHVybmVkIC0gdXNlIE9iamVjdC5hc3NpZ24gdG8gZXh0ZW5kXG5cbiAgY29uZmlnID0gQ29uZmlnKGNvbmZpZylcbiAgT2JqZWN0LmFzc2lnbihjdHgsIGNvbmZpZylcblxuICBmdW5jdGlvbiBfcmVzZXRMYXlvdXQoKSB7XG4gICAgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgdGFibGUuY2xhc3NMaXN0LmFkZCgncG93ZXItdGFibGUnKVxuICAgIE9iamVjdC5hc3NpZ24oY3R4LCB7dGFibGV9KVxuICAgIGVsLmlubmVySFRNTCA9ICcnIC8vIGVtcHR5IGNvbnRlbnRzXG4gICAgZWwuYXBwZW5kQ2hpbGQodGFibGUpXG4gICAgcmV0dXJuIHRhYmxlXG4gIH1cbiAgZnVuY3Rpb24gX2luamVjdFN0eWxlcygpIHtcbiAgICBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNwb3dlci10YWJsZScpXG4gICAgaWYgKCFjc3MpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyAgPSByZXF1aXJlKCchY3NzIWxlc3MhLi9zdHlsZS5sZXNzJylcbiAgICAgIGNzcyAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgICBjc3MuaWQgICAgICAgID0gJ3Bvd2VyLVRhYmxlJ1xuICAgICAgY3NzLmlubmVySFRNTCA9IHN0eWxlc1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjc3MpXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9sb2FkUGx1Z2lucygpIHtcbiAgICAvLyBydW4gcGx1Z2lucyAtICd1bnBhY2tzJyB0aGVpciBpbnRlcmZhY2VzXG4gICAgY29uc3QgcGx1Z2lucyA9IGNvbmZpZy5wbHVnaW5zID8gY29uZmlnLnBsdWdpbnMubWFwKHAgPT4gcChjdHgpKSA6IFtdXG4gICAgLy8gZXh0ZW5kIGN0eCB3aXRoIHBsdWdpbi5taXhpbnMgbWV0aG9kc1xuICAgIHBsdWdpbnMubWFwKHAgPT4ge1xuICAgICAgaWYgKHAubmFtZSkge1xuICAgICAgICBjdHhbcC5uYW1lXSA9IGN0eFtwLm5hbWVdID8gY3R4W3AubmFtZV0gOiB7fVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbHVnaW4gbXVzdCBoYXZlIGEgYG5hbWVgIHByb3BlcnR5JylcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBwLm1peGlucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjdHhbcC5uYW1lXSwgcC5taXhpbnMpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwXG4gICAgfSlcbiAgICAvLyA7OyAvLyBBZGQgYGhvb2tzYCAmJiBgcGx1Z2luc2AgdG8gcmV0dXJuIG9iamVjdFxuICAgIE9iamVjdC5hc3NpZ24oY3R4LCB7cGx1Z2lucywgJ2hvb2tzJzogUGx1Z2luSG9va3Moe3BsdWdpbnN9KX0pXG4gICAgaG9va3MgPSBjdHguaG9va3NcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZW5kZXIoKSB7XG4gICAgaG9va3MucHJlUmVuZGVyKE9iamVjdC5hc3NpZ24oeydlbGVtJzogdGFibGV9LCBjdHgpKVxuXG4gICAgcmVuZGVyVGFibGVIZWFkKGN0eClcbiAgICAgIC50aGVuKHRoZWFkID0+IHtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGhlYWQpXG4gICAgICAgIGNvbnNvbGUudHJhY2UoJ1RBQkxFLnBvc3RIZWFkZXInLCB0aGVhZClcbiAgICAgICAgaG9va3MucG9zdEhlYWRlcih7J2VsZW0nOiB0aGVhZH0pXG4gICAgICB9KVxuXG4gICAgcmVuZGVyVGFibGVCb2R5KGN0eClcbiAgICAgIC50aGVuKHRib2R5ID0+IHtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGJvZHkpXG4gICAgICAgIGhvb2tzLnBvc3RSZW5kZXIoeydlbGVtJzogdGFibGV9KVxuICAgICAgfSlcbiAgfVxuICBmdW5jdGlvbiBfY3VzdG9tRXZlbnRzKCkge1xuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmNyZWF0ZVNvcnRlZEV2ZW50LmV2ZW50TmFtZSwgKHtkZXRhaWx9KSA9PiB7XG4gICAgICBjb25zb2xlLnRyYWNlKCdUQUJMRS5FVkVOVFMuU09SVEVEJywgZGV0YWlsKVxuICAgIH0pXG5cbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWUsIGUgPT4ge1xuICAgICAgY29uc29sZS5ncm91cCgncmVuZGVyJylcbiAgICAgIGNvbnNvbGUud2FybihgVGFibGUgQ3VzdEV2ZW50IEZpcmVkOiAke2V2ZW50cy5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWV9YCwgZS5kZXRhaWwpXG4gICAgICBsZXQge2RhdGF9ID0gZS5kZXRhaWw7XG4gICAgICBjb25zb2xlLndhcm4oYFRhYmxlIEN1c3RFdmVudCByZW5kZXI6IEJFRk9SRSAke2V2ZW50cy5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWV9YCwgZGF0YSlcbiAgICAgIGNvbnNvbGUud2FybihgVGFibGUgQ3VzdEV2ZW50IHJlbmRlcjogQ1VSUkVOVCBEQVRBICR7ZXZlbnRzLmNyZWF0ZVJlbmRlckV2ZW50LmV2ZW50TmFtZX1gLCBjdHguZGF0YSlcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGN0eC5kYXRhID0gZGF0YTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUud2FybihgVGFibGUgQ3VzdEV2ZW50IHJlbmRlcjogQUZURVIgJHtldmVudHMuY3JlYXRlUmVuZGVyRXZlbnQuZXZlbnROYW1lfWAsIGN0eC5kYXRhKVxuICAgICAgZGVzdHJveSgpXG4gICAgICBpbml0KClcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoJ3JlbmRlcicpXG4gICAgfSlcbiAgfVxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIF9pbmplY3RTdHlsZXMoKVxuICAgIF9yZXNldExheW91dCgpXG4gICAgX2N1c3RvbUV2ZW50cygpXG4gICAgX2xvYWRQbHVnaW5zKClcbiAgICBfcmVuZGVyKClcbiAgICByZXR1cm4gY3R4XG4gIH1cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBob29rcy5kZXN0cm95KE9iamVjdC5hc3NpZ24oeydlbGVtJzogdGFibGV9LCBjdHgpKVxuICAgIGlmIChjc3MgJiYgY3NzLnBhcmVudE5vZGUpICAgICB7IGNzcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNzcykgfVxuICAgIGlmICh0YWJsZSAmJiB0YWJsZS5wYXJlbnROb2RlKSB7IHRhYmxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFibGUpIH1cbiAgICByZXR1cm4gY3R4XG4gIH1cblxuICByZXR1cm4gaW5pdCgpXG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGFibGUuanNcbiAqKi8iLCJpbXBvcnQge0NvbHVtbn0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCB7Q29uZmlnfTtcblxuZnVuY3Rpb24gQ29uZmlnKHtjb2x1bW5zLCBkYXRhID0gUHJvbWlzZS5yZXNvbHZlKFtdKSwgcGx1Z2lucyA9IFtdLCBkZWJ1ZyA9IGZhbHNlfSkge1xuICBjb2x1bW5zID0gY29sdW1ucy5tYXAoQ29sdW1uKVxuICByZXR1cm4ge2NvbHVtbnMsIGRhdGEsIHBsdWdpbnMsIGRlYnVnfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbmZpZy5qc1xuICoqLyIsIlxuZXhwb3J0IHtDb2x1bW59O1xuXG4vLyA8aW5wdXQgaWQ9XCJ0b2dnbGVDaGVja0FsbFwiIHR5cGU9XCJjaGVja2JveFwiIHRpdGxlPVwiQ2hlY2svVW5jaGVjayBBbGxcIiB2YWx1ZT1cIlwiIC8+XG5cbmZ1bmN0aW9uIENvbHVtbihvcHRzKSB7XG4gIHZhciBrZXkgPSAodHlwZW9mIG9wdHMucmVuZGVyID09PSAnc3RyaW5nJyA/IG9wdHMucmVuZGVyXG4gICAgICAgICAgICA6IG9wdHMua2V5ID8gb3B0cy5rZXlcbiAgICAgICAgICAgIDogb3B0cy5zb3J0KSB8fCBudWxsLFxuICAgICAgY2xhc3NlcyAgPSBvcHRzLmNsYXNzIHx8IG9wdHMuY2xhc3NlcyB8fCAnJyxcbiAgICAgIHRpdGxlICAgID0gb3B0cy50aXRsZSB8fCBrZXksXG4gICAgICBzb3J0ICAgICA9IG9wdHMuc29ydCAgfHwga2V5LFxuICAgICAgY29scyAgICAgPSBvcHRzLmNvbHMgIHx8IDIsXG4gICAgICByZW5kZXIgICA9IG9wdHMucmVuZGVyO1xuICBjbGFzc2VzID0gQXJyYXkuaXNBcnJheShjbGFzc2VzKSA/IGNsYXNzZXNcbiAgICAgICAgICAgIDogdHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnICYmIGNsYXNzZXMuaW5kZXhPZignICcpID4gLTEgPyBjbGFzc2VzLnNwbGl0KCcgJylcbiAgICAgICAgICAgIDogdHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnICYmIGNsYXNzZXMubGVuZ3RoID49IDEgPyBbY2xhc3Nlc10gOiBbXTtcbiAgaWYgKGNsYXNzZXMubGVuZ3RoIDw9IDApIHtcbiAgICBjbGFzc2VzLnB1c2goYHRibC14cy0ke2NvbHN9YCk7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3B0cywge2tleSwgdGl0bGUsIGNsYXNzZXMsIHNvcnQsIHJlbmRlcn0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90eXBlcy5qc1xuICoqLyIsIlxuZXhwb3J0IHtyZW5kZXJUYWJsZUhlYWQsIHJlbmRlclRhYmxlQm9keX07XG5cbmZ1bmN0aW9uIHJlbmRlclRhYmxlSGVhZCh7Y29sdW1ucywgaG9va3N9KSB7XG4gIGNvbnN0IHRoZWFkICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgY29uc3QgdHIgICAgICAgPSBjb2x1bW5zLnJlZHVjZSgodHIsIGMpID0+IHtcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gICAgaG9va3MucHJlSGVhZGVyRmllbGQoe2VsZW0sIGNvbHVtbjogY30pXG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKC4uLmMuY2xhc3Nlcyk7XG4gICAgZWxlbS5pbm5lckhUTUwgPSBjLnRpdGxlO1xuICAgIGVsZW0ucmVuZGVyICAgID0gYy5yZW5kZXI7XG4gICAgZWxlbS5vcHRzICAgICAgPSBjLm9wdHM7XG4gICAgZWxlbS5jb2x1bW4gICAgPSBjO1xuICAgIHRyLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIGhvb2tzLnBvc3RIZWFkZXJGaWVsZCh7ZWxlbSwgY29sdW1uOiBjfSlcbiAgICByZXR1cm4gdHI7XG4gIH0sIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuICB0aGVhZC5hcHBlbmRDaGlsZCh0cik7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhlYWQpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYWJsZUJvZHkoY3R4KSB7XG4gIGxldCB7ZGF0YSwgY29sdW1ucywgaG9va3N9ID0gY3R4XG4gIGlmICghZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGEgaXMgbnVsbC4gVHJ5IHNldCB7IGRhdGE6IDxQcm9taXNlfEFycmF5PiB9IGluIFBvd2VyVGFibGUgb3B0aW9ucycpXG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEudGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoZGF0YSB8fCBbXSlcbiAgfVxuICByZXR1cm4gZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBiZWZvcmUgPSBob29rcy5wcmVSZW5kZXIoe2RhdGF9KVxuICAgIGN0eC5kYXRhID0gKGJlZm9yZSAmJiBiZWZvcmUuZGF0YSA/IGJlZm9yZS5kYXRhIDogZGF0YSlcblxuICAgIGNvbnNvbGUuZXJyb3IoJ3JlbmRlclRhYmxlQm9keS5wcmVSZW5kZXIuYmVmb3JlID0nLCBiZWZvcmUpXG5cbiAgICBkYXRhID0gKEFycmF5LmlzQXJyYXkoYmVmb3JlLmRhdGEpID8gYmVmb3JlLmRhdGEgOiBkYXRhKSB8fCBbXVxuICAgIHJldHVybiBkYXRhLnJlZHVjZSgodGJvZHksIHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHByZSA9IGhvb2tzLnByZVJvdyh7ZWxlbTogdGJvZHksIHJvd0luZGV4LCBkYXRhOiByb3d9KVxuICAgICAgaWYgKCFwcmUuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmluZm8oJ3BsdWdpbiBza2lwcGVkIHJvdycsIHJvd0luZGV4LCByb3cpXG4gICAgICAgIHJldHVybiB0Ym9keVxuICAgICAgfVxuICAgICAgY29uc3QgdGJsUm93ID0gY29sdW1ucy5yZWR1Y2UoKHRyLCBjb2x1bW4pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQoZWxlbSlcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKC4uLmNvbHVtbi5jbGFzc2VzKVxuICAgICAgICBlbGVtLmlubmVySFRNTCA9IHR5cGVvZiBjb2x1bW4ucmVuZGVyID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnJlbmRlcih7cm93LCBlbGVtLCBjb2x1bW59KSA6IHJvd1tjb2x1bW4ua2V5XVxuICAgICAgICBob29rcy5wb3N0Q2VsbCh7ZWxlbSwgY29sdW1uLCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgICAgcmV0dXJuIHRyXG4gICAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKVxuICAgICAgaG9va3MucG9zdFJvdyh7ZWxlbTogdGJsUm93LCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgIHRib2R5LmFwcGVuZENoaWxkKHRibFJvdylcbiAgICAgIHJldHVybiB0Ym9keVxuICAgIH0sIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JykpXG4gIH0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW5kZXIuanNcbiAqKi8iLCIvKipcbiAqIFV0aWxpdHkgJiBydW5uZXIgZm9yIHBsdWdpbnMgbG9hZGVkIGluIGEgZ2l2ZW4gY29udGV4dDpcbiAqL1xuZXhwb3J0IHtQbHVnaW5Ib29rc31cblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBvZiBrZXllZCBmdW5jdGlvbnMgd2hpY2ggd2lsbCBydW4gYWdhaW5zdCBhbnkgYGhhbmRsZXJzYCBpbiBhbnkgb2YgdGhlIHBsdWdpbnMgZ2l2ZW5cbiAqL1xuZnVuY3Rpb24gUGx1Z2luSG9va3Moe3BsdWdpbnN9KSB7XG4gIGNvbnN0IGNyZWF0ZUhvb2sgPSAoZXZlbnROYW1lKSA9PiAoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSA9PiB7XG4gICAgcmV0dXJuIHBsdWdpbnMucmVkdWNlKChvYmosIHApID0+IHtcbiAgICAgIGlmICghb2JqKSB7IHJldHVybiBvYmo7IH0gLy8gcHJvY2Vzc2luZyB3YXMgY2FuY2VsbGVkIGJ5IGEgcGx1Z2luXG4gICAgICB2YXIgdHJhbnNmb3JtZWQgPSB0eXBlb2YgcC5oYW5kbGVyc1tldmVudE5hbWVdID09PSAnZnVuY3Rpb24nID8gcC5oYW5kbGVyc1tldmVudE5hbWVdKG9iaikgOiBvYmpcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFxuICAgIH0sIHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSlcbiAgfVxuICAvLyBBZGQgdGhlc2Ugb24gdGhlIGBoYW5kbGVyc2Aga2V5IG9uIHlvdXIgcGx1Z2luc1xuICByZXR1cm4ge1xuICAgIHByZVJlbmRlcjogICAgICAgICAgY3JlYXRlSG9vaygncHJlUmVuZGVyJyksXG4gICAgcG9zdFJlbmRlcjogICAgICAgICBjcmVhdGVIb29rKCdwb3N0UmVuZGVyJyksXG4gICAgcHJlUm93OiAgICAgICAgICAgICBjcmVhdGVIb29rKCdwcmVSb3cnKSxcbiAgICBwb3N0Um93OiAgICAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RSb3cnKSxcbiAgICBwcmVDZWxsOiAgICAgICAgICAgIGNyZWF0ZUhvb2soJ3ByZUNlbGwnKSxcbiAgICBwb3N0Q2VsbDogICAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RDZWxsJyksXG4gICAgcHJlSGVhZGVyRmllbGQ6ICAgICBjcmVhdGVIb29rKCdwcmVIZWFkZXJGaWVsZCcpLFxuICAgIHBvc3RIZWFkZXJGaWVsZDogICAgY3JlYXRlSG9vaygncG9zdEhlYWRlckZpZWxkJyksXG4gICAgcG9zdEhlYWRlcjogICAgICAgICBjcmVhdGVIb29rKCdwb3N0SGVhZGVyJyksXG4gICAgZGVzdHJveTogICAgICAgICAgICBjcmVhdGVIb29rKCdkZXN0cm95JyksXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BsdWdpbnMvaW5kZXguanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi51bnNlbGVjdGFibGUge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnRibC14cy0xLFxcbi50YmwteHMtMixcXG4udGJsLXhzLTMsXFxuLnRibC14cy00LFxcbi50YmwteHMtNSxcXG4udGJsLXhzLTYsXFxuLnRibC14cy03LFxcbi50YmwteHMtOCxcXG4udGJsLXhzLTksXFxuLnRibC14cy0xMCxcXG4udGJsLXhzLTExLFxcbi50YmwteHMtMTIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLnRibC14cy0xIHtcXG4gIHdpZHRoOiA4LjMzMzMlO1xcbn1cXG4udGJsLXhzLTIge1xcbiAgd2lkdGg6IDE2LjY2NjYlO1xcbn1cXG4udGJsLXhzLTMge1xcbiAgd2lkdGg6IDI0Ljk5OTklO1xcbn1cXG4udGJsLXhzLTQge1xcbiAgd2lkdGg6IDMzLjMzMzIlO1xcbn1cXG4udGJsLXhzLTUge1xcbiAgd2lkdGg6IDQxLjY2NjUlO1xcbn1cXG4udGJsLXhzLTYge1xcbiAgd2lkdGg6IDQ5Ljk5OTglO1xcbn1cXG4udGJsLXhzLTcge1xcbiAgd2lkdGg6IDU4LjMzMzElO1xcbn1cXG4udGJsLXhzLTgge1xcbiAgd2lkdGg6IDY2LjY2NjQlO1xcbn1cXG4udGJsLXhzLTkge1xcbiAgd2lkdGg6IDc0Ljk5OTclO1xcbn1cXG4udGJsLXhzLTEwIHtcXG4gIHdpZHRoOiA4My4zMzMxJTtcXG59XFxuLnRibC14cy0xMSB7XFxuICB3aWR0aDogOTEuNjY2MyU7XFxufVxcbi50YmwteHMtMTIge1xcbiAgd2lkdGg6IDk5Ljk5OTYlO1xcbn1cXG4ucG93ZXItdGFibGUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbn1cXG4ucG93ZXItdGFibGUgdHIge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ucG93ZXItdGFibGUgdGhlYWQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRoZWFkIHRoIHtcXG4gIC8qIGRncmlkLWlzaCAqL1xcbiAgYmFja2dyb3VuZDogI2YyZjJmMjtcXG4gIGNvbG9yOiAjNjI2MjYyO1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNBQUE7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgZm9udC1zaXplOiAxLjMxZW07XFxuICBwYWRkaW5nOiA2cHggMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1heC1oZWlnaHQ6IDM1cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkge1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkZGRkO1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci13aWR0aDogMHB4IDBweCAwcHggMXB4O1xcbiAgcGFkZGluZzogNnB4IDNweDtcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcbiAgaGVpZ2h0OiAyNTBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdGQge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIG1hcmdpbjogMDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IC5yb3ctb2RkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlY2VjZWMgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzIGVhc2Utb3V0O1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuZGlzYWJsZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2ggIWltcG9ydGFudDtcXG4gIGN1cnNvcjogbm9uZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLmRpc2FibGVkIGlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHI6aG92ZXIgLm5hbWUge1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0IwQjBCMCAhaW1wb3J0YW50O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLnNlbGVjdGVkIC5uYW1lIHtcXG4gIHBhZGRpbmctbGVmdDogNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWxlZnQge1xcbiAgdGV4dC1hbGlnbjogbGVmdCAgICAhaW1wb3J0YW50O1xcbn1cXG4ucG93ZXItdGFibGUgLnRleHQtY2VudGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlciAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LXJpZ2h0IHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0ICAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWp1c3RpZnkge1xcbiAgdGV4dC1hbGlnbjoganVzdGlmeSAhaW1wb3J0YW50O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3NyYy9zdHlsZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtnZXRJZH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCB7ZXZlbnRzfSBmcm9tICcuLi9ldmVudHMnXG5cbmV4cG9ydCBmdW5jdGlvbiBTZWxlY3RhYmxlKGN0eCkge1xuICBsZXQge3RhYmxlLCBkYXRhfSAgICAgPSBjdHhcbiAgY29uc3Qgc2VsZWN0ZWQgICAgICAgID0gY3R4LnNlbGVjdGVkIHx8IFtdXG4gIGNvbnN0IGNsZWFudXBIYW5kbGVycyA9IFtdXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnc2VsZWN0YWJsZScsXG4gICAgbWl4aW5zOiB7XG4gICAgICBpc1NlbGVjdGVkLFxuICAgICAgc2VsZWN0QWRkLFxuICAgICAgc2VsZWN0QWxsLFxuICAgICAgc2VsZWN0VG9nZ2xlLFxuICAgICAgZ2V0U2VsZWN0ZWQsXG4gICAgICBzZWxlY3ROb25lLFxuICAgICAgc2VsZWN0UmVtb3ZlXG4gICAgfSxcbiAgICBoYW5kbGVyczoge1xuICAgICAgZGVzdHJveTogICAgICAgICAgX2Rlc3Ryb3ksXG4gICAgICBwb3N0UmVuZGVyOiAgICAgICBfcG9zdFJlbmRlcixcbiAgICAgIHBvc3RIZWFkZXI6ICAgICAgIF9wb3N0SGVhZGVyLFxuICAgICAgcHJlSGVhZGVyRmllbGQ6ICAgX3ByZUhlYWRlckZpZWxkLFxuICAgIH0sXG4gIH1cblxuICBjb25zdCBzZWxlY3RBbGxUb2dnbGVDbGljayA9IChlKSA9PiB7XG4gICAgY29uc29sZS53YXJuKCdzZWxlY3RBbGxUb2dnbGVDbGljaycsIGUudGFyZ2V0LCBlKVxuICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICBzZWxlY3RBbGwoKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3ROb25lKClcbiAgICB9XG4gIH1cblxuICAvLyBjb25zdCBzZWxlY3RJdGVtQ2xpY2sgPSAoZSkgPT4ge1xuICAvLyAgIGxldCBlbCA9IGUudGFyZ2V0XG4gIC8vICAgaWYgKGVsLmNoZWNrZWQpIHtcbiAgLy8gICAgIHNlbGVjdEl0ZW0oZWwudmFsdWUsIHRydWUpXG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIHNlbGVjdEl0ZW0oZWwudmFsdWUsIGZhbHNlKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGZ1bmN0aW9uIF9kZXN0cm95KCkge1xuICAgIHJldHVybiBjbGVhbnVwSGFuZGxlcnMubWFwKHJtID0+IHJtKCkpIC8vIHNob3VsZCByZXR1cm4gc3BhcnNlIGFycmF5IHcvIGxlbmd0aCA9PT0gIyBvZiBjbGVhbnVwIG1ldGhvZCBjYWxsc1xuICB9XG5cbiAgZnVuY3Rpb24gX3Bvc3RSZW5kZXIoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSB7XG4gICAgbGV0IHRib2R5ID0gdGFibGUucXVlcnlTZWxlY3RvcigndGJvZHknKVxuICAgIGlmICghdGJvZHkpIHsgdGhyb3cgbmV3IEVycm9yKCdObyB0YWJsZSBib2R5IGZvdW5kISEhISEnKSB9XG4gICAgdGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfaGFuZGxlU2VsZWN0KVxuICAgIGNsZWFudXBIYW5kbGVycy5wdXNoKCgpID0+IHRib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2hhbmRsZVNlbGVjdCkpXG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXVxuICB9XG5cbiAgZnVuY3Rpb24gX3Bvc3RIZWFkZXIoe2VsZW19KSB7XG4gICAgZWxlbSA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJyN0b2dnbGVDaGVja0FsbCcpXG4gICAgY29uc29sZS53YXJuKCdTZXR0aW5nIFNlbGVjdEFsbC9Ob25lIENsaWNrJywgZWxlbSlcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0QWxsVG9nZ2xlQ2xpY2spXG4gICAgY2xlYW51cEhhbmRsZXJzLnB1c2goKCkgPT4gZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEFsbFRvZ2dsZUNsaWNrKSlcbiAgICBjb25zb2xlLndhcm4oJ1NFVCBTZWxlY3RBbGwvTm9uZSBDbGljaycsIGVsZW0pXG4gIH1cblxuICBmdW5jdGlvbiBfcHJlSGVhZGVyRmllbGQoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSB7XG4gICAgaWYgKGNvbHVtbi5zZWxlY3Rpb24pIHtcbiAgICAgIGNvbHVtbi50aXRsZSA9IGA8aW5wdXQgaWQ9XCJ0b2dnbGVDaGVja0FsbFwiIHR5cGU9XCJjaGVja2JveFwiIHRpdGxlPVwiQ2hlY2svVW5jaGVjayBBbGxcIiB2YWx1ZT1cIlwiIC8+YFxuICAgICAgY29sdW1uLnJlbmRlciA9ICh7ZWxlbSwgY29sdW1uLCByb3d9KSA9PiB7XG4gICAgICAgIGxldCBfZ2V0SWQgPSBjb2x1bW4uZ2V0SWQgfHwgZ2V0SWRcbiAgICAgICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJzZWxlY3QtaXRlbVwiIHZhbHVlPVwiJHtfZ2V0SWQocm93KX1cIiAke2lzU2VsZWN0ZWQoX2dldElkKHJvdykpID8gJyBjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnfSAvPmBcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICAgIEFycmF5LmZyb20odGFibGUucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQuc2VsZWN0LWl0ZW1bdHlwZT1cImNoZWNrYm94XCJdJykpXG4gICAgICAubWFwKGZ1bmN0aW9uKGVsKSB7cmV0dXJuIGVsLnZhbHVlfSlcbiAgICAgIC5tYXAoc2VsZWN0SXRlbS5iaW5kKG51bGwsIHRydWUpKVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0Tm9uZSgpIHtcbiAgICBBcnJheS5mcm9tKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LnNlbGVjdC1pdGVtW3R5cGU9XCJjaGVja2JveFwiXScpKVxuICAgICAgLm1hcChmdW5jdGlvbihlbCkge3JldHVybiBlbC52YWx1ZX0pXG4gICAgICAubWFwKHNlbGVjdEl0ZW0uYmluZChudWxsLCBmYWxzZSkpXG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RJdGVtKGlkLCBib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgaWQgPT09ICdib29sZWFuJykge1xuICAgICAgLy8gcmV2ZXJzZSBwYXJhbXNcbiAgICAgIFtpZCwgYm9vbF0gPSBbYm9vbCwgaWRdXG4gICAgfVxuICAgIGlmICghaWQpIHtyZXR1cm4gZmFsc2V9XG5cbiAgICB2YXIgY2hrID0gdGFibGUucXVlcnlTZWxlY3RvcignW3R5cGU9XCJjaGVja2JveFwiXVt2YWx1ZT1cIicgKyBpZCArICdcIl0nKVxuICAgIGlmIChjaGspIHtcbiAgICAgIC8vIHNlZSBpZiB3ZSBhcmUgaW4gJ3RvZ2dsZSBtb2RlJ1xuICAgICAgaWYgKHR5cGVvZiBib29sID09PSAndW5kZWZpbmVkJyB8fCBib29sID09PSBudWxsKSB7XG4gICAgICAgIGJvb2wgPSAhY2hrLmNoZWNrZWQgLy8gVG9nZ2xlIGl0IVxuICAgICAgfVxuICAgICAgaWYgKGJvb2wpIHtcbiAgICAgICAgY2hrLmNoZWNrZWQgPSAnY2hlY2tlZCdcbiAgICAgICAgY2hrLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJylcbiAgICAgICAgY2hrLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgIGlmIChzZWxlY3RlZC5pbmRleE9mKGlkKSA9PT0gLTEpIHtzZWxlY3RlZC5wdXNoKGlkKX1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoay5jaGVja2VkID0gdW5kZWZpbmVkXG4gICAgICAgIGNoay5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKVxuICAgICAgICBjaGsucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcbiAgICAgICAgaWYgKHNlbGVjdGVkLmluZGV4T2YoaWQpICE9PSAtMSkge3NlbGVjdGVkLnNwbGljZShzZWxlY3RlZC5pbmRleE9mKGlkKSwgMSl9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3R4LnNlbGVjdGVkID0gc2VsZWN0ZWRcbiAgICAvLyBzZXRTdGF0dXNUb3RhbHModXNlcnMubGVuZ3RoLCBzZWxlY3RlZC5sZW5ndGgpXG4gICAgdGFibGUuZGlzcGF0Y2hFdmVudChldmVudHMuY3JlYXRlU3RhdHVzRXZlbnQoe3NlbGVjdGVkLCBkYXRhfSkpXG4gICAgdGFibGUuZGlzcGF0Y2hFdmVudChldmVudHMuY3JlYXRlU2VsZWN0RXZlbnQoe3NlbGVjdGVkfSkpXG5cbiAgICByZXR1cm4geydpZCc6IGlkLCAnY2hlY2tlZCc6IGJvb2wsICdlbGVtJzogY2hrfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0VG9nZ2xlKGlkKSB7ICAgcmV0dXJuIHNlbGVjdEl0ZW0oaWQsIHVuZGVmaW5lZCkgfVxuICBmdW5jdGlvbiBzZWxlY3RBZGQoaWQpIHsgICAgICByZXR1cm4gc2VsZWN0SXRlbShpZCwgdHJ1ZSkgfVxuICBmdW5jdGlvbiBzZWxlY3RSZW1vdmUoaWQpIHsgICByZXR1cm4gc2VsZWN0SXRlbShpZCwgZmFsc2UpIH1cbiAgZnVuY3Rpb24gaXNTZWxlY3RlZChpZCkgeyAgICAgcmV0dXJuIHNlbGVjdGVkLmluZGV4T2YoaWQpID4gLTEgfVxuICBmdW5jdGlvbiBnZXRTZWxlY3RlZCgpIHsgICAgICByZXR1cm4gc2VsZWN0ZWQgfVxuXG4gIGZ1bmN0aW9uIF9oYW5kbGVTZWxlY3QoZSkge1xuICAgIHZhciBlbCwgdmFsXG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgIHZhbCA9IGUudGFyZ2V0LnZhbHVlXG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVFInKSB7XG4gICAgICBlbCA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpXG4gICAgICBpZiAoZWwgJiYgZWwudmFsdWUpIHsgdmFsID0gZWwudmFsdWUgfVxuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJykge1xuICAgICAgZWwgPSBlLnRhcmdldC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpXG4gICAgICBpZiAoZWwgJiYgZWwudmFsdWUpIHsgdmFsID0gZWwudmFsdWUgfVxuICAgIH1cblxuICAgIGNvbnNvbGUud2FybignX2hhbmRsZVNlbGVjdCBUcmlnZ2VyZWQnLCB2YWwsIGVsLCBlKVxuICAgIGlmICh2YWwpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgc2VsZWN0VG9nZ2xlKHZhbClcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qc1xuICoqLyIsIlxuLyoqXG4gKiBVdGlsaXR5IGFycmF5aWZ5IG1ldGhvZFxuICogQWRkIHRvIC5wcm90b3R5cGUgb2YgSXRlcmF0b3JzLCBBcnJheUJ1ZmZlciwgQXJndW1lbnRzLCBOb2RlTGlzdCwgU2V0L1dlYWtTZXQsIHdoYXRldmVyICNZT0xPXG4gKlxuICogLi4uIE9yIGp1c3QgdXNlIGFzIHV0aWwsIGFzIG5lZWRlZCwgI0p1c3REb0l0XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShsaXN0KSB7XG4gIGxpc3QgPSBBcnJheS5pc0FycmF5KGxpc3QpID8gbGlzdCA6IHRoaXNcbiAgbGlzdCA9ICFsaXN0ID8gW10gOiBsaXN0XG4gIHJldHVybiBBcnJheS5mcm9tICYmIEFycmF5LmZyb20obGlzdCkgfHwgWyd1cGdyYWRlIHlvdXIgYnJvd3NlciwgcGZmdCddXG59XG5cbi8qKlxuICogR2V0IGBBcnJheS5zb3J0YCBmdW5jdGlvbiBmb3Iga2V5IG5hbWUgY29tcGFyaXNvbnMgKHN1cHBvcnRzIHJldmVyc2UpXG4gKlxuICogV2hlbiBuYW1lID09PSAnZW1haWwgICAtLS0gU29ydCBlbWFpbCBhc2NlbmRpbmcuXG4gKlxuICogV2hlbiBuYW1lID09PSAnLWVtYWlsICAtLS0gU29ydCBlbWFpbCBkZXNjZW5kaW5nXG4gKlxuICogQHJldHVybnMgW2Z1bmN0aW9uXSBjb21wYXJlciB1c2VkIGluIGBBcnJheS5zb3J0KClgXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U29ydGVyKGtleSkge1xuICBjb25zdCBfZW5nbGlzaFNvcnQgICAgICAgICA9IChhLCBiKSA9PiAoYVtrZXldIDwgYltrZXldID8gLTEgOiAoYVtrZXldID4gYltrZXldID8gMSA6IDApKVxuICBjb25zdCBfZW5nbGlzaFNvcnRSZXZlcnNlZCA9IChhLCBiKSA9PiAoYVtrZXldID49IGJba2V5XSA/IC0xIDogKGFba2V5XSA8IGJba2V5XSA/IDEgOiAwKSlcblxuICBpZiAoa2V5WzBdID09PSAnLScpIHtcbiAgICBrZXkgPSBrZXkuc3Vic3RyKDEpO1xuICAgIHJldHVybiBfZW5nbGlzaFNvcnRSZXZlcnNlZDtcbiAgfVxuICByZXR1cm4gX2VuZ2xpc2hTb3J0O1xufVxuXG4vKipcbiAqIEFjY2VwdHMgZWxlbWVudHMgZnJvbSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbGBcbiAqXG4gKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBvZiBAbm9kZVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFsbChub2RlKSB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgTm9kZUxpc3QpIHsgbm9kZSA9IHRoaXM7IH1cblxuICB0b0FycmF5KG5vZGUpXG4gICAgLmZvckVhY2goZWwgPT4gZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKSlcbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBUb3RlcyBvYnZpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZCh7aWQsIF9pZCwga2V5fSkgeyByZXR1cm4gaWQgfHwgX2lkIHx8IGtleTsgfVxuXG5cbi8qKlxuICogV2FybmluZzogUHJpdmF0ZS9sb2NhbCB1c2Ugb25seS4gRG8gbm90IGhvaXN0LlxuICogKioqIFVuc2FmZSBIVE1ML3N0cmluZyBoYW5kbGluZyAqKipcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW0gPSBodG1sID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGRpdi5pbm5lckhUTUwgPSBodG1sIC8vIFBvdGVudGlhbCBTZWN1cml0eSBFeHBsb2l0IFZlY3RvciEhISEhIVxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KVxuICByZXR1cm4gY29udGFpbmVyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsIlxuLy8gTGlzdCBzeW50aGV0aWMgZXZlbnQgaGFuZGxlcnNcbmNvbnN0IGNyZWF0ZVJlbmRlckV2ZW50ID0gKG9wdHMpID0+IG5ldyBDdXN0b21FdmVudChjcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWUsIHsgJ2RldGFpbCc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCAnYnViYmxlcyc6IHRydWUsICdjYW5jZWxhYmxlJzogZmFsc2UgfSlcbmNyZWF0ZVJlbmRlckV2ZW50LmV2ZW50TmFtZSA9ICdyZW5kZXInXG5jb25zdCBjcmVhdGVTdGF0dXNFdmVudCA9IChvcHRzKSA9PiBuZXcgQ3VzdG9tRXZlbnQoY3JlYXRlU3RhdHVzRXZlbnQuZXZlbnROYW1lLCB7ICdkZXRhaWwnOiBPYmplY3QuYXNzaWduKHt9LCBvcHRzKSwgJ2J1YmJsZXMnOiB0cnVlLCAnY2FuY2VsYWJsZSc6IGZhbHNlIH0pXG5jcmVhdGVTdGF0dXNFdmVudC5ldmVudE5hbWUgPSAnc3RhdHVzJ1xuY29uc3QgY3JlYXRlU2VsZWN0RXZlbnQgPSAob3B0cykgPT4gbmV3IEN1c3RvbUV2ZW50KGNyZWF0ZVNlbGVjdEV2ZW50LmV2ZW50TmFtZSwgeyAnZGV0YWlsJzogT2JqZWN0LmFzc2lnbih7fSwgb3B0cyksICdidWJibGVzJzogdHJ1ZSwgJ2NhbmNlbGFibGUnOiBmYWxzZSB9KVxuY3JlYXRlU2VsZWN0RXZlbnQuZXZlbnROYW1lID0gJ3NlbGVjdCdcbmNvbnN0IGNyZWF0ZVNvcnRlZEV2ZW50ID0gKG9wdHMpID0+IG5ldyBDdXN0b21FdmVudChjcmVhdGVTb3J0ZWRFdmVudC5ldmVudE5hbWUsIHsgJ2RldGFpbCc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCAnYnViYmxlcyc6IHRydWUsICdjYW5jZWxhYmxlJzogZmFsc2UgfSlcbmNyZWF0ZVNvcnRlZEV2ZW50LmV2ZW50TmFtZSA9ICdzb3J0ZWQnXG5cbi8qKlxuICogSSBkb24ndCBrbm93IGhvdyBJIGZlZWwgYWJvdXQgdGhpcy4uLlxuICogSG1tbSwgaSB0aGluayBhIGZhY3RvcnkgZnVuY3Rpb24gaXMgbmVlZGVkLi4uXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudHMgPSB7XG4gIGNyZWF0ZVJlbmRlckV2ZW50LFxuICBjcmVhdGVTdGF0dXNFdmVudCxcbiAgY3JlYXRlU2VsZWN0RXZlbnQsXG4gIGNyZWF0ZVNvcnRlZEV2ZW50LFxufVxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V2ZW50cy5qc1xuICoqLyIsImltcG9ydCB7Z2V0U29ydGVyLCBjcmVhdGVFbGVtLCB0b0FycmF5LCByZW1vdmVBbGx9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQge2V2ZW50c30gZnJvbSAnLi4vZXZlbnRzJ1xuXG5leHBvcnQgZnVuY3Rpb24gU29ydGFibGUoY3R4KSB7XG4gIGxldCB7dGFibGUsIGRlZmF1bHRTb3J0fSA9IGN0eDtcbiAgY29uc3QgY2xlYW51cEhhbmRsZXJzID0gW11cbiAgbGV0IHNvcnRCeSA9IGRlZmF1bHRTb3J0IHx8ICcnO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3NvcnRhYmxlJyxcbiAgICBtaXhpbnM6IHtcbiAgICAgIHNvcnRCeUNvbHVtbixcbiAgICB9LFxuICAgIGhhbmRsZXJzOiB7XG4gICAgICBkZXN0cm95OiAgICAgICAgX2Rlc3Ryb3ksXG4gICAgICBwcmVSZW5kZXI6ICAgICAgX3ByZVJlbmRlcixcbiAgICAgIHBvc3RIZWFkZXI6ICAgICBfcG9zdEhlYWRlcixcbiAgICAgIHByZUhlYWRlckZpZWxkOiBfcHJlSGVhZGVyRmllbGQsXG4gICAgfSxcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyaWdnZXJSZW5kZXIoZGF0YSkge1xuICAgIHRhYmxlLmRpc3BhdGNoRXZlbnQoZXZlbnRzLmNyZWF0ZVJlbmRlckV2ZW50KHtkYXRhOiAoZGF0YSB8fCBjdHguZGF0YSksIHRhYmxlfSkpXG4gIH1cblxuICBmdW5jdGlvbiB0cmlnZ2VyU29ydGVkKCkge1xuICAgIHRhYmxlLmRpc3BhdGNoRXZlbnQoZXZlbnRzLmNyZWF0ZVNvcnRlZEV2ZW50KHtzb3J0Qnl9KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpZXcoKSB7XG4gICAgLy8gc2V0IHRoZSB1cC9kb3duIGFycm93IGluIGNvbCBuYW1lc1xuICAgIGNvbnN0IHVwQXJyb3cgICAgID0gJyYjOTY1MDsnXG4gICAgY29uc3QgZG93bkFycm93ICAgPSAnJiM5NjYwOydcbiAgICBjb25zdCBzb3J0SWNvbnMgICA9IHRvQXJyYXkodGFibGUucXVlcnlTZWxlY3RvckFsbCgnYi5zb3J0LWFycm93JykpXG4gICAgY29uc3QgZWwgICAgICAgICAgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGB0aFtzb3J0PSR7c29ydEJ5LnJlcGxhY2UoLy0vLCAnJyl9XWApXG4gICAgcmVtb3ZlQWxsKHNvcnRJY29ucylcbiAgICBpZiAoZWwpIHtcbiAgICAgIGxldCBzb3J0ID0gZWwuZ2V0QXR0cmlidXRlKCdzb3J0JylcbiAgICAgIGxldCBkZXNjID0gc29ydC5pbmRleE9mKCctJykgPT09IDBcbiAgICAgIGxldCBpY29uID0gY3JlYXRlRWxlbShgPGIgY2xhc3M9J3NvcnQtYXJyb3cnPiR7ZGVzYyA/IGRvd25BcnJvdyA6IHVwQXJyb3d9PC9iPmApXG4gICAgICBlbC5hcHBlbmRDaGlsZChpY29uKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9jb2x1bW5DbGlja2VkKGUpIHtcbiAgICBjb25zb2xlLnRyYWNlKCdTT1JUQUJMRS5fY29sdW1uQ2xpY2tlZCcsIGUpXG5cbiAgICAvLyBlLnByZXZlbnREZWZhdWx0KClcbiAgICBsZXQgZWwgPSBlLnRhcmdldFxuICAgIGVsID0gZWwubWF0Y2hlcygndGgnKSA/IGVsIDogKGVsLmNsb3Nlc3QgJiYgZWwuY2xvc2VzdCgndGgnKSB8fCBlbClcbiAgICBsZXQgY2xpY2tlZFNvcnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ3NvcnQnKVxuICAgIGNvbnNvbGUuaW5mbygnc29ydCBjbGlja2VkPywgRUxFTTogJywgZWwsICdcXG5TT1JULlJFUVVFU1RFRDonLCBjbGlja2VkU29ydClcbiAgICBpZiAoY2xpY2tlZFNvcnQpIHtcbiAgICAgIHNvcnRCeSA9IGNsaWNrZWRTb3J0ID09PSBzb3J0QnkgPyAnLScuY29uY2F0KGNsaWNrZWRTb3J0KSA6IGNsaWNrZWRTb3J0XG4gICAgICBjb25zb2xlLndhcm4oJ1BSRS5zb3J0QnlDb2x1bW4nLCBzb3J0QnkpXG4gICAgICBjdHguZGVmYXVsdFNvcnQgPSBzb3J0QnlcbiAgICAgIHNvcnRCeUNvbHVtbihzb3J0QnkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2Fybignc2tpcHBpbmcgc29ydCwgRUxFTTogJywgZWwsICdcXG5FVkVOVDonLCBlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZXN0cm95KCkge1xuICAgIHJldHVybiBjbGVhbnVwSGFuZGxlcnMubWFwKHJtID0+IHJtKCkpIC8vIHNob3VsZCBiZSBzcGFyc2UgYXJyYXkgdy8gbGVuZ3RoID09PSAjIG9mIGNsZWFudXAgbWV0aG9kIGNhbGxzXG4gIH1cblxuICBmdW5jdGlvbiBfcHJlUmVuZGVyKHtkYXRhfSkge1xuICAgIGNvbnNvbGUudHJhY2UoJ1NPUlRBQkxFLl9wcmVSZW5kZXInLCBkYXRhKVxuICAgIGNvbnN0IGRhdGFTb3J0ZXIgPSAoZGF0YSwgc29ydEtleSkgPT4gZGF0YS5zb3J0KGdldFNvcnRlcihzb3J0S2V5KSlcblxuICAgIGlmICghc29ydEJ5IHx8IHNvcnRCeS5sZW5ndGggPD0gMCkgeyByZXR1cm4ge2RhdGF9IH1cblxuICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhLnRoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoZGF0YSlcbiAgICB9XG5cbiAgICByZXR1cm4ge2RhdGE6IGRhdGEudGhlbihkYXRhID0+IGRhdGFTb3J0ZXIoZGF0YSwgc29ydEJ5KSl9XG4gIH1cblxuICBmdW5jdGlvbiBfcG9zdEhlYWRlcih7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pIHtcbiAgICBjb25zb2xlLnRyYWNlKCdTT1JUQUJMRS5fcG9zdEhlYWRlcicsIGVsZW0pXG4gICAgbGV0IHRoZWFkID0gZWxlbSAvL2VsZW0ucXVlcnlTZWxlY3RvcigndGhlYWQnKVxuICAgIGlmICghdGhlYWQpIHsgdGhyb3cgbmV3IEVycm9yKCdObyB0YWJsZSBoZWFkIGZvdW5kISEhISEnKSB9XG4gICAgdGhlYWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY29sdW1uQ2xpY2tlZClcbiAgICBjbGVhbnVwSGFuZGxlcnMucHVzaCgoKSA9PiB0aGVhZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9jb2x1bW5DbGlja2VkKSlcbiAgICByZXR1cm4gYXJndW1lbnRzWzBdXG4gIH1cblxuICAvLyBmdW5jdGlvbiBfcG9zdEhlYWRlcih7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pIHtcbiAgLy8gICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2NvbHVtbkNsaWNrZWQpXG4gIC8vICAgcmV0dXJuIGFyZ3VtZW50c1swXVxuICAvLyB9XG5cbiAgZnVuY3Rpb24gc29ydEJ5Q29sdW1uKF9zb3J0QnkpIHtcbiAgICBzb3J0QnkgPSBfc29ydEJ5XG4gICAgdXBkYXRlVmlldygpXG4gICAgdHJpZ2dlclJlbmRlcigpXG4gICAgdHJpZ2dlclNvcnRlZCgpXG4gIH1cblxuICBmdW5jdGlvbiBfcHJlSGVhZGVyRmllbGQoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSB7XG4gICAgaWYgKGNvbHVtbi5zb3J0KSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnc29ydCcsIGNvbHVtbi5zb3J0KVxuICAgIH1cbiAgICByZXR1cm4gYXJndW1lbnRzWzBdXG4gIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGx1Z2lucy9zb3J0YWJsZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=