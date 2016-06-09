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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZDI3NzQ0ZjA0Mzk0MDMxZmRjYSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz85NDg4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL3NvcnRhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSw0R0FBa0osRTs7Ozs7Ozs7Ozs7O1NDSWxJLEssR0FBQSxLOztBQUpoQjs7QUFDQTs7QUFDQTs7QUFFTyxVQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLEVBQTZCO0FBQ2xDLE9BQUks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O0FBQUEsU0FBbkIsTUFBbUIsU0FBbkIsTUFBbUI7QUFBQSxTQUFYLFFBQVcsU0FBWCxRQUFXOztBQUNuRCxhQUFRLEtBQVIsQ0FBYyxzQkFBZCxFQUFzQyxJQUF0QztBQUNBLFNBQUksUUFBUSxJQUFaLEM7QUFDQSxTQUFJLENBQUMsS0FBTCxFQUFZO0FBQUUsYUFBTSxJQUFJLEtBQUosQ0FBVSwwQkFBVixDQUFOO0FBQTZDO0FBQzNELFdBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsY0FBaEM7QUFDQSxxQkFBZ0IsSUFBaEIsQ0FBcUI7QUFBQSxjQUFNLE1BQU0sbUJBQU4sQ0FBMEIsT0FBMUIsRUFBbUMsY0FBbkMsQ0FBTjtBQUFBLE1BQXJCO0FBQ0EsWUFBTyxVQUFVLENBQVYsQ0FBUDtBQUNEOzs7Ozs7O0FBT0QsWUFBUyxZQUFULENBQXNCLE9BQXRCLEVBQStCO0FBQzdCLGNBQVMsT0FBVDtBQUNBO0FBQ0E7QUFDQTtBQUNEOztBQUVELFlBQVMsZUFBVCxRQUF5RDtBQUFBLFNBQS9CLElBQStCLFNBQS9CLElBQStCO0FBQUEsU0FBekIsSUFBeUIsU0FBekIsSUFBeUI7QUFBQSxTQUFuQixNQUFtQixTQUFuQixNQUFtQjtBQUFBLFNBQVgsUUFBVyxTQUFYLFFBQVc7O0FBQ3ZELFNBQUksT0FBTyxJQUFYLEVBQWlCO0FBQ2YsWUFBSyxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLE9BQU8sSUFBakM7QUFDRDtBQUNELFlBQU8sVUFBVSxDQUFWLENBQVA7QUFDRDtBQUVGLEUiLCJmaWxlIjoicG93ZXItdGFibGUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUG93ZXJUYWJsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJQb3dlclRhYmxlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjZDI3NzQ0ZjA0Mzk0MDMxZmRjYVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsW1wiUG93ZXJUYWJsZVwiXSA9IHJlcXVpcmUoXCItIS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9wb3dlci10YWJsZS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2luZGV4LmpzP3tcXFwicHJlc2V0c1xcXCI6W1xcXCJlczIwMTVcXFwiXX0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL3Bvd2VyLXRhYmxlL2luZGV4LmpzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7VGFibGUgYXMgVH0gZnJvbSAnLi9zcmMvdGFibGUnXG5pbXBvcnQge1NlbGVjdGFibGV9IGZyb20gJy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZSdcbmltcG9ydCB7U29ydGFibGV9ICAgZnJvbSAnLi9zcmMvcGx1Z2lucy9zb3J0YWJsZSdcblxuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlKGVsZW0sIGNvbmZpZykge1xuICBpZiAoIWVsZW0pICAgeyB0aHJvdyBuZXcgRXJyb3IoJ1RhYmxlIGluc3RhbmNlIHJlcXVpcmVzIDFzdCBwYXJhbSBgZWxlbWAnKSB9XG4gIGlmICghY29uZmlnKSB7IHRocm93IG5ldyBFcnJvcignVGFibGUgaW5zdGFuY2UgcmVxdWlyZXMgMm5kIHBhcmFtIGBjb25maWdgJykgfVxuICBpZiAoIWNvbmZpZy5wbHVnaW5zKSB7Y29uZmlnLnBsdWdpbnMgPSBbXX1cblxuICAvLyBkZWZhdWx0IHBsdWdpbnNcbiAgY29uZmlnLnBsdWdpbnMucHVzaChTb3J0YWJsZSlcbiAgY29uZmlnLnBsdWdpbnMucHVzaChTZWxlY3RhYmxlKVxuXG4gIHJldHVybiBUKGVsZW0sIGNvbmZpZylcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaW5kZXguanNcbiAqKi8iLCIvKiBPYmplY3QgRmFjdG9yaWVzICovXG5pbXBvcnQge0NvbmZpZ30gICAgICAgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQge1BsdWdpbkhvb2tzfSAgZnJvbSAnLi9wbHVnaW5zJ1xuXG4vKiBIZWxwZXIgdXRpbHMgKi9cbmltcG9ydCB7cmVuZGVyVGFibGVIZWFkLCByZW5kZXJUYWJsZUJvZHl9IGZyb20gJy4vcmVuZGVyJ1xuaW1wb3J0IHtldmVudHN9ICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9ldmVudHMnXG5cblxuLyoqXG4gKiBUYWJsZSBjbGFzcyAtIHN0YXJ0IGhlcmUuXG4gKlxuICogYGBganNcbiAqIGxldCBwb3dlclRhYmxlID0gVGFibGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXItdGFibGUnKSwge1xuICogICBjb2x1bW5zOiBbXG4gKiAgICAge3RpdGxlOiAnQ29sICMxJywgcmVuZGVyOiAnY29sdW1uXzEnLCBzb3J0OiAnY29sdW1uXzEnLCBjb2xzOiAzfSxcbiAqICAgICB7dGl0bGU6ICdDb2wgIzInLCByZW5kZXI6ICdjb2x1bW5fMicsIHNvcnQ6ICdjb2x1bW5fMicsIGNvbHM6IDN9LFxuICogICBdLFxuICogICBkYXRhOiBbXG4gKiAgICAge2NvbHVtbl8xOiAncm93IDEgLSBjb2wgMScsIGNvbHVtbl8yOiAncm93IDEgLSBjb2wgMid9LFxuICogICAgIHtjb2x1bW5fMTogJ3JvdyAyIC0gY29sIDEnLCBjb2x1bW5fMjogJ3JvdyAyIC0gY29sIDInfSxcbiAqICAgICB7Y29sdW1uXzE6ICdyb3cgMyAtIGNvbCAxJywgY29sdW1uXzI6ICdyb3cgMyAtIGNvbCAyJ30sXG4gKiAgIF0sXG4gKiAgIHBsdWdpbnM6IG51bGwsXG4gKiAgIGRlYnVnOiBmYWxzZVxuICogfSlcbiAqIC8vIEFkZGVkIGEgUG93ZXJUYWJsZSB0byBgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VzZXItdGFibGUnKWBcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsIC0gV3JhcHBlci9yb290IGVsZW1lbnRcbiAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnIC0gRGVmaW5lIHBsdWdpbnMgaW4gaGVyZSwgc2VlIHRlc3RzL2V4YW1wbGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUYWJsZShlbCwgY29uZmlnKSB7XG4gIGxldCB0YWJsZSwgY3NzLCBob29rc1xuICBjb25zdCBjdHggPSB7IGRlc3Ryb3kgfSAvLyBQbGFpbiBvYmplY3QgYGN0eGAgd2lsbCBiZSByZXR1cm5lZCAtIHVzZSBPYmplY3QuYXNzaWduIHRvIGV4dGVuZFxuXG4gIGNvbmZpZyA9IENvbmZpZyhjb25maWcpXG4gIE9iamVjdC5hc3NpZ24oY3R4LCBjb25maWcpXG5cbiAgZnVuY3Rpb24gX3Jlc2V0TGF5b3V0KCkge1xuICAgIHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKVxuICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoJ3Bvd2VyLXRhYmxlJylcbiAgICBPYmplY3QuYXNzaWduKGN0eCwge3RhYmxlfSlcbiAgICBlbC5pbm5lckhUTUwgPSAnJyAvLyBlbXB0eSBjb250ZW50c1xuICAgIGVsLmFwcGVuZENoaWxkKHRhYmxlKVxuICAgIHJldHVybiB0YWJsZVxuICB9XG4gIGZ1bmN0aW9uIF9pbmplY3RTdHlsZXMoKSB7XG4gICAgY3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGUjcG93ZXItdGFibGUnKVxuICAgIGlmICghY3NzKSB7XG4gICAgICBjb25zdCBzdHlsZXMgID0gcmVxdWlyZSgnIWNzcyFsZXNzIS4vc3R5bGUubGVzcycpXG4gICAgICBjc3MgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgICAgY3NzLmlkICAgICAgICA9ICdwb3dlci1UYWJsZSdcbiAgICAgIGNzcy5pbm5lckhUTUwgPSBzdHlsZXNcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3NzKVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBfbG9hZFBsdWdpbnMoKSB7XG4gICAgLy8gcnVuIHBsdWdpbnMgLSAndW5wYWNrcycgdGhlaXIgaW50ZXJmYWNlc1xuICAgIGNvbnN0IHBsdWdpbnMgPSBjb25maWcucGx1Z2lucyA/IGNvbmZpZy5wbHVnaW5zLm1hcChwID0+IHAoY3R4KSkgOiBbXVxuICAgIC8vIGV4dGVuZCBjdHggd2l0aCBwbHVnaW4ubWl4aW5zIG1ldGhvZHNcbiAgICBwbHVnaW5zLm1hcChwID0+IHtcbiAgICAgIGlmIChwLm5hbWUpIHtcbiAgICAgICAgY3R4W3AubmFtZV0gPSBjdHhbcC5uYW1lXSA/IGN0eFtwLm5hbWVdIDoge31cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGx1Z2luIG11c3QgaGF2ZSBhIGBuYW1lYCBwcm9wZXJ0eScpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgcC5taXhpbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY3R4W3AubmFtZV0sIHAubWl4aW5zKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcFxuICAgIH0pXG4gICAgLy8gOzsgLy8gQWRkIGBob29rc2AgJiYgYHBsdWdpbnNgIHRvIHJldHVybiBvYmplY3RcbiAgICBPYmplY3QuYXNzaWduKGN0eCwge3BsdWdpbnMsICdob29rcyc6IFBsdWdpbkhvb2tzKHtwbHVnaW5zfSl9KVxuICAgIGhvb2tzID0gY3R4Lmhvb2tzXG4gIH1cblxuICBmdW5jdGlvbiBfcmVuZGVyKCkge1xuICAgIGhvb2tzLnByZVJlbmRlcihPYmplY3QuYXNzaWduKHsnZWxlbSc6IHRhYmxlfSwgY3R4KSlcblxuICAgIHJlbmRlclRhYmxlSGVhZChjdHgpXG4gICAgICAudGhlbih0aGVhZCA9PiB7XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRoZWFkKVxuICAgICAgICBjb25zb2xlLnRyYWNlKCdUQUJMRS5wb3N0SGVhZGVyJywgdGhlYWQpXG4gICAgICAgIGhvb2tzLnBvc3RIZWFkZXIoeydlbGVtJzogdGhlYWR9KVxuICAgICAgfSlcblxuICAgIHJlbmRlclRhYmxlQm9keShjdHgpXG4gICAgICAudGhlbih0Ym9keSA9PiB7XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRib2R5KVxuICAgICAgICBob29rcy5wb3N0UmVuZGVyKHsnZWxlbSc6IHRhYmxlfSlcbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gX2N1c3RvbUV2ZW50cygpIHtcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5jcmVhdGVTb3J0ZWRFdmVudC5ldmVudE5hbWUsICh7ZGV0YWlsfSkgPT4ge1xuICAgICAgY29uc29sZS50cmFjZSgnVEFCTEUuRVZFTlRTLlNPUlRFRCcsIGRldGFpbClcbiAgICB9KVxuXG4gICAgdGFibGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudHMuY3JlYXRlUmVuZGVyRXZlbnQuZXZlbnROYW1lLCBlID0+IHtcbiAgICAgIGNvbnNvbGUuZ3JvdXAoJ3JlbmRlcicpXG4gICAgICBjb25zb2xlLndhcm4oYFRhYmxlIEN1c3RFdmVudCBGaXJlZDogJHtldmVudHMuY3JlYXRlUmVuZGVyRXZlbnQuZXZlbnROYW1lfWAsIGUuZGV0YWlsKVxuICAgICAgbGV0IHtkYXRhfSA9IGUuZGV0YWlsO1xuICAgICAgY29uc29sZS53YXJuKGBUYWJsZSBDdXN0RXZlbnQgcmVuZGVyOiBCRUZPUkUgJHtldmVudHMuY3JlYXRlUmVuZGVyRXZlbnQuZXZlbnROYW1lfWAsIGRhdGEpXG4gICAgICBjb25zb2xlLndhcm4oYFRhYmxlIEN1c3RFdmVudCByZW5kZXI6IENVUlJFTlQgREFUQSAke2V2ZW50cy5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWV9YCwgY3R4LmRhdGEpXG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBjdHguZGF0YSA9IGRhdGE7XG4gICAgICB9XG4gICAgICBjb25zb2xlLndhcm4oYFRhYmxlIEN1c3RFdmVudCByZW5kZXI6IEFGVEVSICR7ZXZlbnRzLmNyZWF0ZVJlbmRlckV2ZW50LmV2ZW50TmFtZX1gLCBjdHguZGF0YSlcbiAgICAgIGRlc3Ryb3koKVxuICAgICAgaW5pdCgpXG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCdyZW5kZXInKVxuICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBfaW5qZWN0U3R5bGVzKClcbiAgICBfcmVzZXRMYXlvdXQoKVxuICAgIF9jdXN0b21FdmVudHMoKVxuICAgIF9sb2FkUGx1Z2lucygpXG4gICAgX3JlbmRlcigpXG4gICAgcmV0dXJuIGN0eFxuICB9XG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaG9va3MuZGVzdHJveShPYmplY3QuYXNzaWduKHsnZWxlbSc6IHRhYmxlfSwgY3R4KSlcbiAgICBpZiAoY3NzICYmIGNzcy5wYXJlbnROb2RlKSAgICAgeyBjc3MucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjc3MpIH1cbiAgICBpZiAodGFibGUgJiYgdGFibGUucGFyZW50Tm9kZSkgeyB0YWJsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhYmxlKSB9XG4gICAgcmV0dXJuIGN0eFxuICB9XG5cbiAgcmV0dXJuIGluaXQoKVxufVxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RhYmxlLmpzXG4gKiovIiwiaW1wb3J0IHtDb2x1bW59IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQge0NvbmZpZ307XG5cbmZ1bmN0aW9uIENvbmZpZyh7Y29sdW1ucywgZGF0YSA9IFByb21pc2UucmVzb2x2ZShbXSksIHBsdWdpbnMgPSBbXSwgZGVidWcgPSBmYWxzZX0pIHtcbiAgY29sdW1ucyA9IGNvbHVtbnMubWFwKENvbHVtbilcbiAgcmV0dXJuIHtjb2x1bW5zLCBkYXRhLCBwbHVnaW5zLCBkZWJ1Z307XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25maWcuanNcbiAqKi8iLCJcbmV4cG9ydCB7Q29sdW1ufTtcblxuLy8gPGlucHV0IGlkPVwidG9nZ2xlQ2hlY2tBbGxcIiB0eXBlPVwiY2hlY2tib3hcIiB0aXRsZT1cIkNoZWNrL1VuY2hlY2sgQWxsXCIgdmFsdWU9XCJcIiAvPlxuXG5mdW5jdGlvbiBDb2x1bW4ob3B0cykge1xuICB2YXIga2V5ID0gKHR5cGVvZiBvcHRzLnJlbmRlciA9PT0gJ3N0cmluZycgPyBvcHRzLnJlbmRlclxuICAgICAgICAgICAgOiBvcHRzLmtleSA/IG9wdHMua2V5XG4gICAgICAgICAgICA6IG9wdHMuc29ydCkgfHwgbnVsbCxcbiAgICAgIGNsYXNzZXMgID0gb3B0cy5jbGFzcyB8fCBvcHRzLmNsYXNzZXMgfHwgJycsXG4gICAgICB0aXRsZSAgICA9IG9wdHMudGl0bGUgfHwga2V5LFxuICAgICAgc29ydCAgICAgPSBvcHRzLnNvcnQgIHx8IGtleSxcbiAgICAgIGNvbHMgICAgID0gb3B0cy5jb2xzICB8fCAyLFxuICAgICAgcmVuZGVyICAgPSBvcHRzLnJlbmRlcjtcbiAgY2xhc3NlcyA9IEFycmF5LmlzQXJyYXkoY2xhc3NlcykgPyBjbGFzc2VzXG4gICAgICAgICAgICA6IHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJyAmJiBjbGFzc2VzLmluZGV4T2YoJyAnKSA+IC0xID8gY2xhc3Nlcy5zcGxpdCgnICcpXG4gICAgICAgICAgICA6IHR5cGVvZiBjbGFzc2VzID09PSAnc3RyaW5nJyAmJiBjbGFzc2VzLmxlbmd0aCA+PSAxID8gW2NsYXNzZXNdIDogW107XG4gIGlmIChjbGFzc2VzLmxlbmd0aCA8PSAwKSB7XG4gICAgY2xhc3Nlcy5wdXNoKGB0YmwteHMtJHtjb2xzfWApO1xuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG9wdHMsIHtrZXksIHRpdGxlLCBjbGFzc2VzLCBzb3J0LCByZW5kZXJ9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdHlwZXMuanNcbiAqKi8iLCJcbmV4cG9ydCB7cmVuZGVyVGFibGVIZWFkLCByZW5kZXJUYWJsZUJvZHl9O1xuXG5mdW5jdGlvbiByZW5kZXJUYWJsZUhlYWQoe2NvbHVtbnMsIGhvb2tzfSkge1xuICBjb25zdCB0aGVhZCAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJyk7XG4gIGNvbnN0IHRyICAgICAgID0gY29sdW1ucy5yZWR1Y2UoKHRyLCBjKSA9PiB7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgIGhvb2tzLnByZUhlYWRlckZpZWxkKHtlbGVtLCBjb2x1bW46IGN9KVxuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCguLi5jLmNsYXNzZXMpO1xuICAgIGVsZW0uaW5uZXJIVE1MID0gYy50aXRsZTtcbiAgICBlbGVtLnJlbmRlciAgICA9IGMucmVuZGVyO1xuICAgIGVsZW0ub3B0cyAgICAgID0gYy5vcHRzO1xuICAgIGVsZW0uY29sdW1uICAgID0gYztcbiAgICB0ci5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICBob29rcy5wb3N0SGVhZGVyRmllbGQoe2VsZW0sIGNvbHVtbjogY30pXG4gICAgcmV0dXJuIHRyO1xuICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgdGhlYWQuYXBwZW5kQ2hpbGQodHIpO1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoZWFkKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFibGVCb2R5KGN0eCkge1xuICBsZXQge2RhdGEsIGNvbHVtbnMsIGhvb2tzfSA9IGN0eFxuICBpZiAoIWRhdGEpIHtcbiAgICBjb25zb2xlLmVycm9yKCdEYXRhIGlzIG51bGwuIFRyeSBzZXQgeyBkYXRhOiA8UHJvbWlzZXxBcnJheT4gfSBpbiBQb3dlclRhYmxlIG9wdGlvbnMnKVxuICAgIHJldHVybiBbXVxuICB9XG4gIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhLnRoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICBkYXRhID0gUHJvbWlzZS5yZXNvbHZlKGRhdGEgfHwgW10pXG4gIH1cbiAgcmV0dXJuIGRhdGEudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgY29uc3QgYmVmb3JlID0gaG9va3MucHJlUmVuZGVyKHtkYXRhfSlcbiAgICBjdHguZGF0YSA9IChiZWZvcmUgJiYgYmVmb3JlLmRhdGEgPyBiZWZvcmUuZGF0YSA6IGRhdGEpXG5cbiAgICBjb25zb2xlLmVycm9yKCdyZW5kZXJUYWJsZUJvZHkucHJlUmVuZGVyLmJlZm9yZSA9JywgYmVmb3JlKVxuXG4gICAgZGF0YSA9IChBcnJheS5pc0FycmF5KGJlZm9yZS5kYXRhKSA/IGJlZm9yZS5kYXRhIDogZGF0YSkgfHwgW11cbiAgICByZXR1cm4gZGF0YS5yZWR1Y2UoKHRib2R5LCByb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBjb25zdCBwcmUgPSBob29rcy5wcmVSb3coe2VsZW06IHRib2R5LCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgIGlmICghcHJlLmRhdGEpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCdwbHVnaW4gc2tpcHBlZCByb3cnLCByb3dJbmRleCwgcm93KVxuICAgICAgICByZXR1cm4gdGJvZHlcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRibFJvdyA9IGNvbHVtbnMucmVkdWNlKCh0ciwgY29sdW1uKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgIHRyLmFwcGVuZENoaWxkKGVsZW0pXG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCguLi5jb2x1bW4uY2xhc3NlcylcbiAgICAgICAgZWxlbS5pbm5lckhUTUwgPSB0eXBlb2YgY29sdW1uLnJlbmRlciA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5yZW5kZXIoe3JvdywgZWxlbSwgY29sdW1ufSkgOiByb3dbY29sdW1uLmtleV1cbiAgICAgICAgaG9va3MucG9zdENlbGwoe2VsZW0sIGNvbHVtbiwgcm93SW5kZXgsIGRhdGE6IHJvd30pXG4gICAgICAgIHJldHVybiB0clxuICAgICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSlcbiAgICAgIGhvb2tzLnBvc3RSb3coe2VsZW06IHRibFJvdywgcm93SW5kZXgsIGRhdGE6IHJvd30pXG4gICAgICB0Ym9keS5hcHBlbmRDaGlsZCh0YmxSb3cpXG4gICAgICByZXR1cm4gdGJvZHlcbiAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKVxuICB9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyLmpzXG4gKiovIiwiLyoqXG4gKiBVdGlsaXR5ICYgcnVubmVyIGZvciBwbHVnaW5zIGxvYWRlZCBpbiBhIGdpdmVuIGNvbnRleHQ6XG4gKi9cbmV4cG9ydCB7UGx1Z2luSG9va3N9XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3Qgb2Yga2V5ZWQgZnVuY3Rpb25zIHdoaWNoIHdpbGwgcnVuIGFnYWluc3QgYW55IGBoYW5kbGVyc2AgaW4gYW55IG9mIHRoZSBwbHVnaW5zIGdpdmVuXG4gKi9cbmZ1bmN0aW9uIFBsdWdpbkhvb2tzKHtwbHVnaW5zfSkge1xuICBjb25zdCBjcmVhdGVIb29rID0gKGV2ZW50TmFtZSkgPT4gKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkgPT4ge1xuICAgIHJldHVybiBwbHVnaW5zLnJlZHVjZSgob2JqLCBwKSA9PiB7XG4gICAgICBpZiAoIW9iaikgeyByZXR1cm4gb2JqOyB9IC8vIHByb2Nlc3Npbmcgd2FzIGNhbmNlbGxlZCBieSBhIHBsdWdpblxuICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHlwZW9mIHAuaGFuZGxlcnNbZXZlbnROYW1lXSA9PT0gJ2Z1bmN0aW9uJyA/IHAuaGFuZGxlcnNbZXZlbnROYW1lXShvYmopIDogb2JqXG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWRcbiAgICB9LCB7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pXG4gIH1cbiAgLy8gQWRkIHRoZXNlIG9uIHRoZSBgaGFuZGxlcnNgIGtleSBvbiB5b3VyIHBsdWdpbnNcbiAgcmV0dXJuIHtcbiAgICBwcmVSZW5kZXI6ICAgICAgICAgIGNyZWF0ZUhvb2soJ3ByZVJlbmRlcicpLFxuICAgIHBvc3RSZW5kZXI6ICAgICAgICAgY3JlYXRlSG9vaygncG9zdFJlbmRlcicpLFxuICAgIHByZVJvdzogICAgICAgICAgICAgY3JlYXRlSG9vaygncHJlUm93JyksXG4gICAgcG9zdFJvdzogICAgICAgICAgICBjcmVhdGVIb29rKCdwb3N0Um93JyksXG4gICAgcHJlQ2VsbDogICAgICAgICAgICBjcmVhdGVIb29rKCdwcmVDZWxsJyksXG4gICAgcG9zdENlbGw6ICAgICAgICAgICBjcmVhdGVIb29rKCdwb3N0Q2VsbCcpLFxuICAgIHByZUhlYWRlckZpZWxkOiAgICAgY3JlYXRlSG9vaygncHJlSGVhZGVyRmllbGQnKSxcbiAgICBwb3N0SGVhZGVyRmllbGQ6ICAgIGNyZWF0ZUhvb2soJ3Bvc3RIZWFkZXJGaWVsZCcpLFxuICAgIHBvc3RIZWFkZXI6ICAgICAgICAgY3JlYXRlSG9vaygncG9zdEhlYWRlcicpLFxuICAgIGRlc3Ryb3k6ICAgICAgICAgICAgY3JlYXRlSG9vaygnZGVzdHJveScpLFxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudW5zZWxlY3RhYmxlIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi50YmwteHMtMSxcXG4udGJsLXhzLTIsXFxuLnRibC14cy0zLFxcbi50YmwteHMtNCxcXG4udGJsLXhzLTUsXFxuLnRibC14cy02LFxcbi50YmwteHMtNyxcXG4udGJsLXhzLTgsXFxuLnRibC14cy05LFxcbi50YmwteHMtMTAsXFxuLnRibC14cy0xMSxcXG4udGJsLXhzLTEyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi50YmwteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzJTtcXG59XFxuLnRibC14cy0yIHtcXG4gIHdpZHRoOiAxNi42NjY2JTtcXG59XFxuLnRibC14cy0zIHtcXG4gIHdpZHRoOiAyNC45OTk5JTtcXG59XFxuLnRibC14cy00IHtcXG4gIHdpZHRoOiAzMy4zMzMyJTtcXG59XFxuLnRibC14cy01IHtcXG4gIHdpZHRoOiA0MS42NjY1JTtcXG59XFxuLnRibC14cy02IHtcXG4gIHdpZHRoOiA0OS45OTk4JTtcXG59XFxuLnRibC14cy03IHtcXG4gIHdpZHRoOiA1OC4zMzMxJTtcXG59XFxuLnRibC14cy04IHtcXG4gIHdpZHRoOiA2Ni42NjY0JTtcXG59XFxuLnRibC14cy05IHtcXG4gIHdpZHRoOiA3NC45OTk3JTtcXG59XFxuLnRibC14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMSU7XFxufVxcbi50YmwteHMtMTEge1xcbiAgd2lkdGg6IDkxLjY2NjMlO1xcbn1cXG4udGJsLXhzLTEyIHtcXG4gIHdpZHRoOiA5OS45OTk2JTtcXG59XFxuLnBvd2VyLXRhYmxlIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRyIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRoZWFkIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5wb3dlci10YWJsZSB0aGVhZCB0aCB7XFxuICAvKiBkZ3JpZC1pc2ggKi9cXG4gIGJhY2tncm91bmQ6ICNmMmYyZjI7XFxuICBjb2xvcjogIzYyNjI2MjtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQUFBO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGZvbnQtc2l6ZTogMS4zMWVtO1xcbiAgcGFkZGluZzogNnB4IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXgtaGVpZ2h0OiAzNXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHtcXG4gIGJvcmRlci1jb2xvcjogI2RkZGRkZDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDBweCAwcHggMHB4IDFweDtcXG4gIHBhZGRpbmc6IDZweCAzcHg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIGhlaWdodDogMjUwcHg7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRkIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBtYXJnaW46IDA7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSAucm93LW9kZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlY2VjICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlLW91dDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLmRpc2FibGVkIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoICFpbXBvcnRhbnQ7XFxuICBjdXJzb3I6IG5vbmU7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5kaXNhYmxlZCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyOmhvdmVyIC5uYW1lIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNCMEIwQjAgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5zZWxlY3RlZCAubmFtZSB7XFxuICBwYWRkaW5nLWxlZnQ6IDRweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1sZWZ0IHtcXG4gIHRleHQtYWxpZ246IGxlZnQgICAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWNlbnRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXIgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1yaWdodCB7XFxuICB0ZXh0LWFsaWduOiByaWdodCAgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1qdXN0aWZ5IHtcXG4gIHRleHQtYWxpZ246IGp1c3RpZnkgIWltcG9ydGFudDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9zcmMvc3R5bGUubGVzc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7Z2V0SWR9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQge2V2ZW50c30gZnJvbSAnLi4vZXZlbnRzJ1xuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0YWJsZShjdHgpIHtcbiAgbGV0IHt0YWJsZSwgZGF0YX0gICAgID0gY3R4XG4gIGNvbnN0IHNlbGVjdGVkICAgICAgICA9IGN0eC5zZWxlY3RlZCB8fCBbXVxuICBjb25zdCBjbGVhbnVwSGFuZGxlcnMgPSBbXVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3NlbGVjdGFibGUnLFxuICAgIG1peGluczoge1xuICAgICAgaXNTZWxlY3RlZCxcbiAgICAgIHNlbGVjdEFkZCxcbiAgICAgIHNlbGVjdEFsbCxcbiAgICAgIHNlbGVjdFRvZ2dsZSxcbiAgICAgIGdldFNlbGVjdGVkLFxuICAgICAgc2VsZWN0Tm9uZSxcbiAgICAgIHNlbGVjdFJlbW92ZVxuICAgIH0sXG4gICAgaGFuZGxlcnM6IHtcbiAgICAgIGRlc3Ryb3k6ICAgICAgICAgIF9kZXN0cm95LFxuICAgICAgcG9zdFJlbmRlcjogICAgICAgX3Bvc3RSZW5kZXIsXG4gICAgICBwb3N0SGVhZGVyOiAgICAgICBfcG9zdEhlYWRlcixcbiAgICAgIHByZUhlYWRlckZpZWxkOiAgIF9wcmVIZWFkZXJGaWVsZCxcbiAgICB9LFxuICB9XG5cbiAgY29uc3Qgc2VsZWN0QWxsVG9nZ2xlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnNvbGUud2Fybignc2VsZWN0QWxsVG9nZ2xlQ2xpY2snLCBlLnRhcmdldCwgZSlcbiAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgc2VsZWN0QWxsKClcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0Tm9uZSgpXG4gICAgfVxuICB9XG5cbiAgLy8gY29uc3Qgc2VsZWN0SXRlbUNsaWNrID0gKGUpID0+IHtcbiAgLy8gICBsZXQgZWwgPSBlLnRhcmdldFxuICAvLyAgIGlmIChlbC5jaGVja2VkKSB7XG4gIC8vICAgICBzZWxlY3RJdGVtKGVsLnZhbHVlLCB0cnVlKVxuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICBzZWxlY3RJdGVtKGVsLnZhbHVlLCBmYWxzZSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICBmdW5jdGlvbiBfZGVzdHJveSgpIHtcbiAgICByZXR1cm4gY2xlYW51cEhhbmRsZXJzLm1hcChybSA9PiBybSgpKSAvLyBzaG91bGQgcmV0dXJuIHNwYXJzZSBhcnJheSB3LyBsZW5ndGggPT09ICMgb2YgY2xlYW51cCBtZXRob2QgY2FsbHNcbiAgfVxuXG4gIGZ1bmN0aW9uIF9wb3N0UmVuZGVyKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGxldCB0Ym9keSA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5JylcbiAgICBpZiAoIXRib2R5KSB7IHRocm93IG5ldyBFcnJvcignTm8gdGFibGUgYm9keSBmb3VuZCEhISEhJykgfVxuICAgIHRib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2hhbmRsZVNlbGVjdClcbiAgICBjbGVhbnVwSGFuZGxlcnMucHVzaCgoKSA9PiB0Ym9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9oYW5kbGVTZWxlY3QpKVxuICAgIHJldHVybiBhcmd1bWVudHNbMF1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9wb3N0SGVhZGVyKHtlbGVtfSkge1xuICAgIGVsZW0gPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCcjdG9nZ2xlQ2hlY2tBbGwnKVxuICAgIGNvbnNvbGUud2FybignU2V0dGluZyBTZWxlY3RBbGwvTm9uZSBDbGljaycsIGVsZW0pXG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEFsbFRvZ2dsZUNsaWNrKVxuICAgIGNsZWFudXBIYW5kbGVycy5wdXNoKCgpID0+IGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RBbGxUb2dnbGVDbGljaykpXG4gICAgY29uc29sZS53YXJuKCdTRVQgU2VsZWN0QWxsL05vbmUgQ2xpY2snLCBlbGVtKVxuICB9XG5cbiAgZnVuY3Rpb24gX3ByZUhlYWRlckZpZWxkKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGlmIChjb2x1bW4uc2VsZWN0aW9uKSB7XG4gICAgICBjb2x1bW4udGl0bGUgPSBgPGlucHV0IGlkPVwidG9nZ2xlQ2hlY2tBbGxcIiB0eXBlPVwiY2hlY2tib3hcIiB0aXRsZT1cIkNoZWNrL1VuY2hlY2sgQWxsXCIgdmFsdWU9XCJcIiAvPmBcbiAgICAgIGNvbHVtbi5yZW5kZXIgPSAoe2VsZW0sIGNvbHVtbiwgcm93fSkgPT4ge1xuICAgICAgICBsZXQgX2dldElkID0gY29sdW1uLmdldElkIHx8IGdldElkXG4gICAgICAgIHJldHVybiBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwic2VsZWN0LWl0ZW1cIiB2YWx1ZT1cIiR7X2dldElkKHJvdyl9XCIgJHtpc1NlbGVjdGVkKF9nZXRJZChyb3cpKSA/ICcgY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJ30gLz5gXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcmd1bWVudHNbMF1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdEFsbCgpIHtcbiAgICBBcnJheS5mcm9tKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LnNlbGVjdC1pdGVtW3R5cGU9XCJjaGVja2JveFwiXScpKVxuICAgICAgLm1hcChmdW5jdGlvbihlbCkge3JldHVybiBlbC52YWx1ZX0pXG4gICAgICAubWFwKHNlbGVjdEl0ZW0uYmluZChudWxsLCB0cnVlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdE5vbmUoKSB7XG4gICAgQXJyYXkuZnJvbSh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dC5zZWxlY3QtaXRlbVt0eXBlPVwiY2hlY2tib3hcIl0nKSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oZWwpIHtyZXR1cm4gZWwudmFsdWV9KVxuICAgICAgLm1hcChzZWxlY3RJdGVtLmJpbmQobnVsbCwgZmFsc2UpKVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0SXRlbShpZCwgYm9vbCkge1xuICAgIGlmICh0eXBlb2YgYm9vbCA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGlkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIC8vIHJldmVyc2UgcGFyYW1zXG4gICAgICBbaWQsIGJvb2xdID0gW2Jvb2wsIGlkXVxuICAgIH1cbiAgICBpZiAoIWlkKSB7cmV0dXJuIGZhbHNlfVxuXG4gICAgdmFyIGNoayA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwiY2hlY2tib3hcIl1bdmFsdWU9XCInICsgaWQgKyAnXCJdJylcbiAgICBpZiAoY2hrKSB7XG4gICAgICAvLyBzZWUgaWYgd2UgYXJlIGluICd0b2dnbGUgbW9kZSdcbiAgICAgIGlmICh0eXBlb2YgYm9vbCA9PT0gJ3VuZGVmaW5lZCcgfHwgYm9vbCA9PT0gbnVsbCkge1xuICAgICAgICBib29sID0gIWNoay5jaGVja2VkIC8vIFRvZ2dsZSBpdCFcbiAgICAgIH1cbiAgICAgIGlmIChib29sKSB7XG4gICAgICAgIGNoay5jaGVja2VkID0gJ2NoZWNrZWQnXG4gICAgICAgIGNoay5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpXG4gICAgICAgIGNoay5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICBpZiAoc2VsZWN0ZWQuaW5kZXhPZihpZCkgPT09IC0xKSB7c2VsZWN0ZWQucHVzaChpZCl9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGsuY2hlY2tlZCA9IHVuZGVmaW5lZFxuICAgICAgICBjaGsucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJylcbiAgICAgICAgY2hrLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG4gICAgICAgIGlmIChzZWxlY3RlZC5pbmRleE9mKGlkKSAhPT0gLTEpIHtzZWxlY3RlZC5zcGxpY2Uoc2VsZWN0ZWQuaW5kZXhPZihpZCksIDEpfVxuICAgICAgfVxuICAgIH1cblxuICAgIGN0eC5zZWxlY3RlZCA9IHNlbGVjdGVkXG4gICAgLy8gc2V0U3RhdHVzVG90YWxzKHVzZXJzLmxlbmd0aCwgc2VsZWN0ZWQubGVuZ3RoKVxuICAgIHRhYmxlLmRpc3BhdGNoRXZlbnQoZXZlbnRzLmNyZWF0ZVN0YXR1c0V2ZW50KHtzZWxlY3RlZCwgZGF0YX0pKVxuICAgIHRhYmxlLmRpc3BhdGNoRXZlbnQoZXZlbnRzLmNyZWF0ZVNlbGVjdEV2ZW50KHtzZWxlY3RlZH0pKVxuXG4gICAgcmV0dXJuIHsnaWQnOiBpZCwgJ2NoZWNrZWQnOiBib29sLCAnZWxlbSc6IGNoa31cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdFRvZ2dsZShpZCkgeyAgIHJldHVybiBzZWxlY3RJdGVtKGlkLCB1bmRlZmluZWQpIH1cbiAgZnVuY3Rpb24gc2VsZWN0QWRkKGlkKSB7ICAgICAgcmV0dXJuIHNlbGVjdEl0ZW0oaWQsIHRydWUpIH1cbiAgZnVuY3Rpb24gc2VsZWN0UmVtb3ZlKGlkKSB7ICAgcmV0dXJuIHNlbGVjdEl0ZW0oaWQsIGZhbHNlKSB9XG4gIGZ1bmN0aW9uIGlzU2VsZWN0ZWQoaWQpIHsgICAgIHJldHVybiBzZWxlY3RlZC5pbmRleE9mKGlkKSA+IC0xIH1cbiAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWQoKSB7ICAgICAgcmV0dXJuIHNlbGVjdGVkIH1cblxuICBmdW5jdGlvbiBfaGFuZGxlU2VsZWN0KGUpIHtcbiAgICB2YXIgZWwsIHZhbFxuICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICB2YWwgPSBlLnRhcmdldC52YWx1ZVxuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RSJykge1xuICAgICAgZWwgPSBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgaWYgKGVsICYmIGVsLnZhbHVlKSB7IHZhbCA9IGVsLnZhbHVlIH1cbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURCcpIHtcbiAgICAgIGVsID0gZS50YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgaWYgKGVsICYmIGVsLnZhbHVlKSB7IHZhbCA9IGVsLnZhbHVlIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLndhcm4oJ19oYW5kbGVTZWxlY3QgVHJpZ2dlcmVkJywgdmFsLCBlbCwgZSlcbiAgICBpZiAodmFsKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHNlbGVjdFRvZ2dsZSh2YWwpXG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL3NlbGVjdGFibGUuanNcbiAqKi8iLCJcbi8qKlxuICogVXRpbGl0eSBhcnJheWlmeSBtZXRob2RcbiAqIEFkZCB0byAucHJvdG90eXBlIG9mIEl0ZXJhdG9ycywgQXJyYXlCdWZmZXIsIEFyZ3VtZW50cywgTm9kZUxpc3QsIFNldC9XZWFrU2V0LCB3aGF0ZXZlciAjWU9MT1xuICpcbiAqIC4uLiBPciBqdXN0IHVzZSBhcyB1dGlsLCBhcyBuZWVkZWQsICNKdXN0RG9JdFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuICBsaXN0ID0gQXJyYXkuaXNBcnJheShsaXN0KSA/IGxpc3QgOiB0aGlzXG4gIGxpc3QgPSAhbGlzdCA/IFtdIDogbGlzdFxuICByZXR1cm4gQXJyYXkuZnJvbSAmJiBBcnJheS5mcm9tKGxpc3QpIHx8IFsndXBncmFkZSB5b3VyIGJyb3dzZXIsIHBmZnQnXVxufVxuXG4vKipcbiAqIEdldCBgQXJyYXkuc29ydGAgZnVuY3Rpb24gZm9yIGtleSBuYW1lIGNvbXBhcmlzb25zIChzdXBwb3J0cyByZXZlcnNlKVxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJ2VtYWlsICAgLS0tIFNvcnQgZW1haWwgYXNjZW5kaW5nLlxuICpcbiAqIFdoZW4gbmFtZSA9PT0gJy1lbWFpbCAgLS0tIFNvcnQgZW1haWwgZGVzY2VuZGluZ1xuICpcbiAqIEByZXR1cm5zIFtmdW5jdGlvbl0gY29tcGFyZXIgdXNlZCBpbiBgQXJyYXkuc29ydCgpYFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvcnRlcihrZXkpIHtcbiAgY29uc3QgX2VuZ2xpc2hTb3J0ICAgICAgICAgPSAoYSwgYikgPT4gKGFba2V5XSA8IGJba2V5XSA/IC0xIDogKGFba2V5XSA+IGJba2V5XSA/IDEgOiAwKSlcbiAgY29uc3QgX2VuZ2xpc2hTb3J0UmV2ZXJzZWQgPSAoYSwgYikgPT4gKGFba2V5XSA+PSBiW2tleV0gPyAtMSA6IChhW2tleV0gPCBiW2tleV0gPyAxIDogMCkpXG5cbiAgaWYgKGtleVswXSA9PT0gJy0nKSB7XG4gICAga2V5ID0ga2V5LnN1YnN0cigxKTtcbiAgICByZXR1cm4gX2VuZ2xpc2hTb3J0UmV2ZXJzZWQ7XG4gIH1cbiAgcmV0dXJuIF9lbmdsaXNoU29ydDtcbn1cblxuLyoqXG4gKiBBY2NlcHRzIGVsZW1lbnRzIGZyb20gYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgXG4gKlxuICogUmVtb3ZlcyBhbGwgY2hpbGRyZW4gb2YgQG5vZGVcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGwobm9kZSkge1xuICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7IG5vZGUgPSB0aGlzOyB9XG5cbiAgdG9BcnJheShub2RlKVxuICAgIC5mb3JFYWNoKGVsID0+IGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCkpXG4gIHJldHVybiBub2RlXG59XG5cbi8qKlxuICogVG90ZXMgb2J2aVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWQoe2lkLCBfaWR9KSB7IHJldHVybiBpZCB8fCBfaWQ7IH1cblxuXG4vKipcbiAqIFdhcm5pbmc6IFByaXZhdGUvbG9jYWwgdXNlIG9ubHkuIERvIG5vdCBob2lzdC5cbiAqICoqKiBVbnNhZmUgSFRNTC9zdHJpbmcgaGFuZGxpbmcgKioqXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbGVtID0gaHRtbCA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBkaXYuaW5uZXJIVE1MID0gaHRtbCAvLyBQb3RlbnRpYWwgU2VjdXJpdHkgRXhwbG9pdCBWZWN0b3IhISEhISFcbiAgdG9BcnJheShkaXYuY2hpbGRyZW4pXG4gICAgLmZvckVhY2goZWwgPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKGVsKSlcbiAgcmV0dXJuIGNvbnRhaW5lclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJcbi8vIExpc3Qgc3ludGhldGljIGV2ZW50IGhhbmRsZXJzXG5jb25zdCBjcmVhdGVSZW5kZXJFdmVudCA9IChvcHRzKSA9PiBuZXcgQ3VzdG9tRXZlbnQoY3JlYXRlUmVuZGVyRXZlbnQuZXZlbnROYW1lLCB7ICdkZXRhaWwnOiBPYmplY3QuYXNzaWduKHt9LCBvcHRzKSwgJ2J1YmJsZXMnOiB0cnVlLCAnY2FuY2VsYWJsZSc6IGZhbHNlIH0pXG5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWUgPSAncmVuZGVyJ1xuY29uc3QgY3JlYXRlU3RhdHVzRXZlbnQgPSAob3B0cykgPT4gbmV3IEN1c3RvbUV2ZW50KGNyZWF0ZVN0YXR1c0V2ZW50LmV2ZW50TmFtZSwgeyAnZGV0YWlsJzogT2JqZWN0LmFzc2lnbih7fSwgb3B0cyksICdidWJibGVzJzogdHJ1ZSwgJ2NhbmNlbGFibGUnOiBmYWxzZSB9KVxuY3JlYXRlU3RhdHVzRXZlbnQuZXZlbnROYW1lID0gJ3N0YXR1cydcbmNvbnN0IGNyZWF0ZVNlbGVjdEV2ZW50ID0gKG9wdHMpID0+IG5ldyBDdXN0b21FdmVudChjcmVhdGVTZWxlY3RFdmVudC5ldmVudE5hbWUsIHsgJ2RldGFpbCc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCAnYnViYmxlcyc6IHRydWUsICdjYW5jZWxhYmxlJzogZmFsc2UgfSlcbmNyZWF0ZVNlbGVjdEV2ZW50LmV2ZW50TmFtZSA9ICdzZWxlY3QnXG5jb25zdCBjcmVhdGVTb3J0ZWRFdmVudCA9IChvcHRzKSA9PiBuZXcgQ3VzdG9tRXZlbnQoY3JlYXRlU29ydGVkRXZlbnQuZXZlbnROYW1lLCB7ICdkZXRhaWwnOiBPYmplY3QuYXNzaWduKHt9LCBvcHRzKSwgJ2J1YmJsZXMnOiB0cnVlLCAnY2FuY2VsYWJsZSc6IGZhbHNlIH0pXG5jcmVhdGVTb3J0ZWRFdmVudC5ldmVudE5hbWUgPSAnc29ydGVkJ1xuXG4vKipcbiAqIEkgZG9uJ3Qga25vdyBob3cgSSBmZWVsIGFib3V0IHRoaXMuLi5cbiAqIEhtbW0sIGkgdGhpbmsgYSBmYWN0b3J5IGZ1bmN0aW9uIGlzIG5lZWRlZC4uLlxuICovXG5leHBvcnQgY29uc3QgZXZlbnRzID0ge1xuICBjcmVhdGVSZW5kZXJFdmVudCxcbiAgY3JlYXRlU3RhdHVzRXZlbnQsXG4gIGNyZWF0ZVNlbGVjdEV2ZW50LFxuICBjcmVhdGVTb3J0ZWRFdmVudCxcbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9ldmVudHMuanNcbiAqKi8iLCJpbXBvcnQge2dldFNvcnRlciwgY3JlYXRlRWxlbSwgdG9BcnJheSwgcmVtb3ZlQWxsfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IHtldmVudHN9IGZyb20gJy4uL2V2ZW50cydcblxuZXhwb3J0IGZ1bmN0aW9uIFNvcnRhYmxlKGN0eCkge1xuICBsZXQge3RhYmxlLCBkZWZhdWx0U29ydH0gPSBjdHg7XG4gIGNvbnN0IGNsZWFudXBIYW5kbGVycyA9IFtdXG4gIGxldCBzb3J0QnkgPSBkZWZhdWx0U29ydCB8fCAnJztcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdzb3J0YWJsZScsXG4gICAgbWl4aW5zOiB7XG4gICAgICBzb3J0QnlDb2x1bW4sXG4gICAgfSxcbiAgICBoYW5kbGVyczoge1xuICAgICAgZGVzdHJveTogICAgICAgIF9kZXN0cm95LFxuICAgICAgcHJlUmVuZGVyOiAgICAgIF9wcmVSZW5kZXIsXG4gICAgICBwb3N0SGVhZGVyOiAgICAgX3Bvc3RIZWFkZXIsXG4gICAgICBwcmVIZWFkZXJGaWVsZDogX3ByZUhlYWRlckZpZWxkLFxuICAgIH0sXG4gIH1cblxuICBmdW5jdGlvbiB0cmlnZ2VyUmVuZGVyKGRhdGEpIHtcbiAgICB0YWJsZS5kaXNwYXRjaEV2ZW50KGV2ZW50cy5jcmVhdGVSZW5kZXJFdmVudCh7ZGF0YTogKGRhdGEgfHwgY3R4LmRhdGEpLCB0YWJsZX0pKVxuICB9XG5cbiAgZnVuY3Rpb24gdHJpZ2dlclNvcnRlZCgpIHtcbiAgICB0YWJsZS5kaXNwYXRjaEV2ZW50KGV2ZW50cy5jcmVhdGVTb3J0ZWRFdmVudCh7c29ydEJ5fSkpXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVWaWV3KCkge1xuICAgIC8vIHNldCB0aGUgdXAvZG93biBhcnJvdyBpbiBjb2wgbmFtZXNcbiAgICBjb25zdCB1cEFycm93ICAgICA9ICcmIzk2NTA7J1xuICAgIGNvbnN0IGRvd25BcnJvdyAgID0gJyYjOTY2MDsnXG4gICAgY29uc3Qgc29ydEljb25zICAgPSB0b0FycmF5KHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Iuc29ydC1hcnJvdycpKVxuICAgIGNvbnN0IGVsICAgICAgICAgID0gdGFibGUucXVlcnlTZWxlY3RvcihgdGhbc29ydD0ke3NvcnRCeS5yZXBsYWNlKC8tLywgJycpfV1gKVxuICAgIHJlbW92ZUFsbChzb3J0SWNvbnMpXG4gICAgaWYgKGVsKSB7XG4gICAgICBsZXQgc29ydCA9IGVsLmdldEF0dHJpYnV0ZSgnc29ydCcpXG4gICAgICBsZXQgZGVzYyA9IHNvcnQuaW5kZXhPZignLScpID09PSAwXG4gICAgICBsZXQgaWNvbiA9IGNyZWF0ZUVsZW0oYDxiIGNsYXNzPSdzb3J0LWFycm93Jz4ke2Rlc2MgPyBkb3duQXJyb3cgOiB1cEFycm93fTwvYj5gKVxuICAgICAgZWwuYXBwZW5kQ2hpbGQoaWNvbilcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfY29sdW1uQ2xpY2tlZChlKSB7XG4gICAgY29uc29sZS50cmFjZSgnU09SVEFCTEUuX2NvbHVtbkNsaWNrZWQnLCBlKVxuXG4gICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbGV0IGVsID0gZS50YXJnZXRcbiAgICBlbCA9IGVsLm1hdGNoZXMoJ3RoJykgPyBlbCA6IChlbC5jbG9zZXN0ICYmIGVsLmNsb3Nlc3QoJ3RoJykgfHwgZWwpXG4gICAgbGV0IGNsaWNrZWRTb3J0ID0gZWwuZ2V0QXR0cmlidXRlKCdzb3J0JylcbiAgICBjb25zb2xlLmluZm8oJ3NvcnQgY2xpY2tlZD8sIEVMRU06ICcsIGVsLCAnXFxuU09SVC5SRVFVRVNURUQ6JywgY2xpY2tlZFNvcnQpXG4gICAgaWYgKGNsaWNrZWRTb3J0KSB7XG4gICAgICBzb3J0QnkgPSBjbGlja2VkU29ydCA9PT0gc29ydEJ5ID8gJy0nLmNvbmNhdChjbGlja2VkU29ydCkgOiBjbGlja2VkU29ydFxuICAgICAgY29uc29sZS53YXJuKCdQUkUuc29ydEJ5Q29sdW1uJywgc29ydEJ5KVxuICAgICAgY3R4LmRlZmF1bHRTb3J0ID0gc29ydEJ5XG4gICAgICBzb3J0QnlDb2x1bW4oc29ydEJ5KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3NraXBwaW5nIHNvcnQsIEVMRU06ICcsIGVsLCAnXFxuRVZFTlQ6JywgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfZGVzdHJveSgpIHtcbiAgICByZXR1cm4gY2xlYW51cEhhbmRsZXJzLm1hcChybSA9PiBybSgpKSAvLyBzaG91bGQgYmUgc3BhcnNlIGFycmF5IHcvIGxlbmd0aCA9PT0gIyBvZiBjbGVhbnVwIG1ldGhvZCBjYWxsc1xuICB9XG5cbiAgZnVuY3Rpb24gX3ByZVJlbmRlcih7ZGF0YX0pIHtcbiAgICBjb25zb2xlLnRyYWNlKCdTT1JUQUJMRS5fcHJlUmVuZGVyJywgZGF0YSlcbiAgICBjb25zdCBkYXRhU29ydGVyID0gKGRhdGEsIHNvcnRLZXkpID0+IGRhdGEuc29ydChnZXRTb3J0ZXIoc29ydEtleSkpXG5cbiAgICBpZiAoIXNvcnRCeSB8fCBzb3J0QnkubGVuZ3RoIDw9IDApIHsgcmV0dXJuIHtkYXRhfSB9XG5cbiAgICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YS50aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkYXRhID0gUHJvbWlzZS5yZXNvbHZlKGRhdGEpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtkYXRhOiBkYXRhLnRoZW4oZGF0YSA9PiBkYXRhU29ydGVyKGRhdGEsIHNvcnRCeSkpfVxuICB9XG5cbiAgZnVuY3Rpb24gX3Bvc3RIZWFkZXIoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSB7XG4gICAgY29uc29sZS50cmFjZSgnU09SVEFCTEUuX3Bvc3RIZWFkZXInLCBlbGVtKVxuICAgIGxldCB0aGVhZCA9IGVsZW0gLy9lbGVtLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkJylcbiAgICBpZiAoIXRoZWFkKSB7IHRocm93IG5ldyBFcnJvcignTm8gdGFibGUgaGVhZCBmb3VuZCEhISEhJykgfVxuICAgIHRoZWFkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2NvbHVtbkNsaWNrZWQpXG4gICAgY2xlYW51cEhhbmRsZXJzLnB1c2goKCkgPT4gdGhlYWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY29sdW1uQ2xpY2tlZCkpXG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gX3Bvc3RIZWFkZXIoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSB7XG4gIC8vICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jb2x1bW5DbGlja2VkKVxuICAvLyAgIHJldHVybiBhcmd1bWVudHNbMF1cbiAgLy8gfVxuXG4gIGZ1bmN0aW9uIHNvcnRCeUNvbHVtbihfc29ydEJ5KSB7XG4gICAgc29ydEJ5ID0gX3NvcnRCeVxuICAgIHVwZGF0ZVZpZXcoKVxuICAgIHRyaWdnZXJSZW5kZXIoKVxuICAgIHRyaWdnZXJTb3J0ZWQoKVxuICB9XG5cbiAgZnVuY3Rpb24gX3ByZUhlYWRlckZpZWxkKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGlmIChjb2x1bW4uc29ydCkge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3NvcnQnLCBjb2x1bW4uc29ydClcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXVxuICB9XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BsdWdpbnMvc29ydGFibGUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9