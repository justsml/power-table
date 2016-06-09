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
	    elem.column = c;
	    tr.appendChild(elem);
	    hooks.postHeaderField({ elem: elem, column: c });
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
	    console.error('renderTableBody.preRender.before =', before);
	
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
	
	function Sortable(_ref) {
	  var table = _ref.table;
	  var config = _ref.config;
	
	  var cleanupHandlers = [];
	  var sortBy = '';
	
	  return {
	    name: 'sortable',
	    mixins: {
	      sortByColumn: sortByColumn
	    },
	    handlers: {
	      destroy: _destroy,
	      preRender: _preRender,
	      postRender: _postRender,
	      preHeaderField: _preHeaderField
	    }
	  };
	
	  var _columnClicked = function _columnClicked(e) {
	    var el = e.target;
	    el = el.matches('th') ? el : el.closest && el.closest('th') || el;
	    var clickedSort = el.getAttribute('sort');
	    console.info('sort clicked?, ELEM: ', el, '\nSORT.REQUESTED:', clickedSort);
	    if (clickedSort) {
	      sortBy = clickedSort === sortBy ? '-'.concat(clickedSort) : clickedSort;
	      sortByColumn(sortBy);
	    } else {
	      console.warn('skipping sort, ELEM: ', el, '\nEVENT:', e);
	    }
	  };
	
	  function triggerRender(data) {
	    table.dispatchEvent(_events.events.createRenderEvent({ data: data, table: table }));
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
	
	  function _destroy() {
	    return cleanupHandlers.map(function (rm) {
	      return rm();
	    }); // should be sparse array w/ length === # of cleanup method calls
	  }
	
	  function _preRender(_ref2) {
	    var data = _ref2.data;
	
	    var dataSorter = function dataSorter(data, sortKey) {
	      return data.sort((0, _util.getSorter)(sortKey));
	    };
	
	    if (!sortBy || sortBy.length <= 0) {
	      return data;
	    }
	
	    if (data && typeof data.then === 'function') {
	      return data.then(function (data) {
	        return dataSorter(data, sortBy);
	      });
	    } else if (data && Array.isArray(data)) {
	      return dataSorter(data, sortBy);
	    }
	  }
	
	  function _postRender(_ref3) {
	    var elem = _ref3.elem;
	    var data = _ref3.data;
	    var column = _ref3.column;
	    var rowIndex = _ref3.rowIndex;
	
	    var thead = table.querySelector('thead');
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
	
	  function _preHeaderField(_ref4) {
	    var elem = _ref4.elem;
	    var data = _ref4.data;
	    var column = _ref4.column;
	    var rowIndex = _ref4.rowIndex;
	
	    elem.setAttribute('sort', column.sort);
	    return arguments[0];
	  }
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkYTI3YjVhMTljZjliZDc1ZTZiOCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz85NDg4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL3NvcnRhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSw0R0FBa0osRTs7Ozs7Ozs7Ozs7O1NDSWxJLEssR0FBQSxLOztBQUpoQjs7QUFDQTs7QUFDQTs7QUFFTyxVQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLEVBQTZCO0FBQ2xDLE9BQUks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Q0FBVSwwQkFBVixDQUFOO0FBQTZDO0FBQzNELFdBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsY0FBaEM7QUFDQSxxQkFBZ0IsSUFBaEIsQ0FBcUI7QUFBQSxjQUFNLE1BQU0sbUJBQU4sQ0FBMEIsT0FBMUIsRUFBbUMsY0FBbkMsQ0FBTjtBQUFBLE1BQXJCO0FBQ0EsWUFBTyxVQUFVLENBQVYsQ0FBUDtBQUNEOzs7Ozs7O0FBT0QsWUFBUyxZQUFULENBQXNCLE9BQXRCLEVBQStCO0FBQzdCLGNBQVMsT0FBVDtBQUNBO0FBQ0E7QUFDQTtBQUNEOztBQUVELFlBQVMsZUFBVCxRQUF5RDtBQUFBLFNBQS9CLElBQStCLFNBQS9CLElBQStCO0FBQUEsU0FBekIsSUFBeUIsU0FBekIsSUFBeUI7QUFBQSxTQUFuQixNQUFtQixTQUFuQixNQUFtQjtBQUFBLFNBQVgsUUFBVyxTQUFYLFFBQVc7O0FBQ3ZELFVBQUssWUFBTCxDQUFrQixNQUFsQixFQUEwQixPQUFPLElBQWpDO0FBQ0EsWUFBTyxVQUFVLENBQVYsQ0FBUDtBQUNEO0FBRUYsRSIsImZpbGUiOiJwb3dlci10YWJsZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJQb3dlclRhYmxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBvd2VyVGFibGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGRhMjdiNWExOWNmOWJkNzVlNmI4XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJQb3dlclRhYmxlXCJdID0gcmVxdWlyZShcIi0hL1VzZXJzL2RsZXZ5L2NvZGUvb3NzL3Bvd2VyLXRhYmxlL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanM/e1xcXCJwcmVzZXRzXFxcIjpbXFxcImVzMjAxNVxcXCJdfSEvVXNlcnMvZGxldnkvY29kZS9vc3MvcG93ZXItdGFibGUvaW5kZXguanNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtUYWJsZSBhcyBUfSBmcm9tICcuL3NyYy90YWJsZSdcbmltcG9ydCB7U2VsZWN0YWJsZX0gZnJvbSAnLi9zcmMvcGx1Z2lucy9zZWxlY3RhYmxlJ1xuaW1wb3J0IHtTb3J0YWJsZX0gICBmcm9tICcuL3NyYy9wbHVnaW5zL3NvcnRhYmxlJ1xuXG5leHBvcnQgZnVuY3Rpb24gVGFibGUoZWxlbSwgY29uZmlnKSB7XG4gIGlmICghZWxlbSkgICB7IHRocm93IG5ldyBFcnJvcignVGFibGUgaW5zdGFuY2UgcmVxdWlyZXMgMXN0IHBhcmFtIGBlbGVtYCcpIH1cbiAgaWYgKCFjb25maWcpIHsgdGhyb3cgbmV3IEVycm9yKCdUYWJsZSBpbnN0YW5jZSByZXF1aXJlcyAybmQgcGFyYW0gYGNvbmZpZ2AnKSB9XG4gIGlmICghY29uZmlnLnBsdWdpbnMpIHtjb25maWcucGx1Z2lucyA9IFtdfVxuXG4gIC8vIGRlZmF1bHQgcGx1Z2luc1xuICBjb25maWcucGx1Z2lucy5wdXNoKFNvcnRhYmxlKVxuICAvLyBjb25maWcucGx1Z2lucy5wdXNoKFNlbGVjdGFibGUpXG5cbiAgcmV0dXJuIFQoZWxlbSwgY29uZmlnKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7UGx1Z2luSG9va3N9IGZyb20gJy4vcGx1Z2lucydcbmltcG9ydCB7cmVuZGVyVGFibGVIZWFkLCByZW5kZXJUYWJsZUJvZHl9IGZyb20gJy4vcmVuZGVyJ1xuaW1wb3J0IHtldmVudHN9IGZyb20gJy4vZXZlbnRzJ1xuXG4vKipcbiAqIFRhYmxlIGNsYXNzIC0gc3RhcnQgaGVyZS5cbiAqXG4gKiBgYGBqc1xuICogbGV0IHBvd2VyVGFibGUgPSBUYWJsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci10YWJsZScpLCB7XG4gKiAgIGNvbHVtbnM6IFtcbiAqICAgICB7dGl0bGU6ICdDb2wgIzEnLCByZW5kZXI6ICdjb2x1bW5fMScsIHNvcnQ6ICdjb2x1bW5fMScsIGNvbHM6IDN9LFxuICogICAgIHt0aXRsZTogJ0NvbCAjMicsIHJlbmRlcjogJ2NvbHVtbl8yJywgc29ydDogJ2NvbHVtbl8yJywgY29sczogM30sXG4gKiAgIF0sXG4gKiAgIGRhdGE6IFtcbiAqICAgICB7Y29sdW1uXzE6ICdyb3cgMSAtIGNvbCAxJywgY29sdW1uXzI6ICdyb3cgMSAtIGNvbCAyJ30sXG4gKiAgICAge2NvbHVtbl8xOiAncm93IDIgLSBjb2wgMScsIGNvbHVtbl8yOiAncm93IDIgLSBjb2wgMid9LFxuICogICAgIHtjb2x1bW5fMTogJ3JvdyAzIC0gY29sIDEnLCBjb2x1bW5fMjogJ3JvdyAzIC0gY29sIDInfSxcbiAqICAgXSxcbiAqICAgcGx1Z2luczogbnVsbCxcbiAqICAgZGVidWc6IGZhbHNlXG4gKiB9KVxuICogLy8gQWRkZWQgYSBQb3dlclRhYmxlIHRvIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlci10YWJsZScpYFxuICogYGBgXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgLSBXcmFwcGVyL3Jvb3QgZWxlbWVudFxuICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgLSBEZWZpbmUgcGx1Z2lucyBpbiBoZXJlLCBzZWUgdGVzdHMvZXhhbXBsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlKGVsLCBjb25maWcpIHtcbiAgbGV0IHRhYmxlLCBjc3MsIGhvb2tzXG4gIGNvbnN0IGN0eCA9IHsgZGVzdHJveSB9IC8vIFBsYWluIG9iamVjdCBgY3R4YCB3aWxsIGJlIHJldHVybmVkIC0gdXNlIE9iamVjdC5hc3NpZ24gdG8gZXh0ZW5kXG5cbiAgY29uZmlnID0gQ29uZmlnKGNvbmZpZylcbiAgT2JqZWN0LmFzc2lnbihjdHgsIGNvbmZpZylcblxuICBmdW5jdGlvbiBfcmVzZXRMYXlvdXQoKSB7XG4gICAgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgdGFibGUuY2xhc3NMaXN0LmFkZCgncG93ZXItdGFibGUnKVxuICAgIE9iamVjdC5hc3NpZ24oY3R4LCB7dGFibGV9KVxuICAgIGVsLmlubmVySFRNTCA9ICcnIC8vIGVtcHR5IGNvbnRlbnRzXG4gICAgZWwuYXBwZW5kQ2hpbGQodGFibGUpXG4gICAgcmV0dXJuIHRhYmxlXG4gIH1cbiAgZnVuY3Rpb24gX2luamVjdFN0eWxlcygpIHtcbiAgICBjc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZSNwb3dlci10YWJsZScpXG4gICAgaWYgKCFjc3MpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyAgPSByZXF1aXJlKCchY3NzIWxlc3MhLi9zdHlsZS5sZXNzJylcbiAgICAgIGNzcyAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgICBjc3MuaWQgICAgICAgID0gJ3Bvd2VyLVRhYmxlJ1xuICAgICAgY3NzLmlubmVySFRNTCA9IHN0eWxlc1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjc3MpXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9sb2FkUGx1Z2lucygpIHtcbiAgICAvLyBydW4gcGx1Z2lucyAtICd1bnBhY2tzJyB0aGVpciBpbnRlcmZhY2VzXG4gICAgY29uc3QgcGx1Z2lucyA9IGNvbmZpZy5wbHVnaW5zID8gY29uZmlnLnBsdWdpbnMubWFwKHAgPT4gcChjdHgpKSA6IFtdXG4gICAgLy8gZXh0ZW5kIGN0eCB3aXRoIHBsdWdpbi5taXhpbnMgbWV0aG9kc1xuICAgIHBsdWdpbnMubWFwKHAgPT4ge1xuICAgICAgaWYgKHAubmFtZSkge1xuICAgICAgICBjdHhbcC5uYW1lXSA9IGN0eFtwLm5hbWVdID8gY3R4W3AubmFtZV0gOiB7fVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbHVnaW4gbXVzdCBoYXZlIGEgYG5hbWVgIHByb3BlcnR5JylcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBwLm1peGlucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjdHhbcC5uYW1lXSwgcC5taXhpbnMpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwXG4gICAgfSlcbiAgICAvLyA7OyAvLyBBZGQgYGhvb2tzYCAmJiBgcGx1Z2luc2AgdG8gcmV0dXJuIG9iamVjdFxuICAgIE9iamVjdC5hc3NpZ24oY3R4LCB7cGx1Z2lucywgJ2hvb2tzJzogUGx1Z2luSG9va3Moe3BsdWdpbnN9KX0pXG4gICAgaG9va3MgPSBjdHguaG9va3NcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZW5kZXIoKSB7XG4gICAgaG9va3MucHJlUmVuZGVyKE9iamVjdC5hc3NpZ24oeydlbGVtJzogdGFibGV9LCBjdHgpKVxuXG4gICAgcmVuZGVyVGFibGVIZWFkKGN0eClcbiAgICAgIC50aGVuKHRoZWFkID0+IHtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGhlYWQpXG4gICAgICAgIGhvb2tzLnBvc3RIZWFkZXIoeydlbGVtJzogdGhlYWR9KVxuICAgICAgfSlcblxuICAgIHJlbmRlclRhYmxlQm9keShjdHgpXG4gICAgICAudGhlbih0Ym9keSA9PiB7XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRib2R5KVxuICAgICAgICBob29rcy5wb3N0UmVuZGVyKHsnZWxlbSc6IHRhYmxlfSlcbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gX2N1c3RvbUV2ZW50cygpIHtcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5jcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWUsIGUgPT4ge1xuICAgICAgY29uc29sZS53YXJuKGBUYWJsZSBDdXN0RXZlbnQgRmlyZWQ6ICR7ZXZlbnRzLmNyZWF0ZVJlbmRlckV2ZW50LmV2ZW50TmFtZX1gLCBlKVxuICAgICAgbGV0IHtkYXRhfSA9IGUuZGV0YWlscztcbiAgICAgIGN0eC5kYXRhID0gZGF0YTtcbiAgICAgIGNvbnNvbGUud2FybihgVGFibGUgQ3VzdEV2ZW50IHJlbmRlcjogQkVGT1JFICR7ZXZlbnRzLmNyZWF0ZVJlbmRlckV2ZW50LmV2ZW50TmFtZX1gLCBkYXRhKVxuICAgICAgZGVzdHJveSgpXG4gICAgICBpbml0KClcbiAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgX2luamVjdFN0eWxlcygpXG4gICAgX3Jlc2V0TGF5b3V0KClcbiAgICBfY3VzdG9tRXZlbnRzKClcbiAgICBfbG9hZFBsdWdpbnMoKVxuICAgIF9yZW5kZXIoKVxuICAgIHJldHVybiBjdHhcbiAgfVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGhvb2tzLmRlc3Ryb3koT2JqZWN0LmFzc2lnbih7J2VsZW0nOiB0YWJsZX0sIGN0eCkpXG4gICAgaWYgKGNzcykgICB7IGNzcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNzcykgICAgIH1cbiAgICBpZiAodGFibGUpIHsgdGFibGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWJsZSkgfVxuICAgIHJldHVybiBjdHhcbiAgfVxuXG4gIHJldHVybiBpbml0KClcbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90YWJsZS5qc1xuICoqLyIsImltcG9ydCB7Q29sdW1ufSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHtDb25maWd9O1xuXG5mdW5jdGlvbiBDb25maWcoe2NvbHVtbnMsIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoW10pLCBwbHVnaW5zID0gW10sIGRlYnVnID0gZmFsc2V9KSB7XG4gIGNvbHVtbnMgPSBjb2x1bW5zLm1hcChDb2x1bW4pXG4gIHJldHVybiB7Y29sdW1ucywgZGF0YSwgcGx1Z2lucywgZGVidWd9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uZmlnLmpzXG4gKiovIiwiXG5leHBvcnQge0NvbHVtbn07XG5cbi8vIDxpbnB1dCBpZD1cInRvZ2dsZUNoZWNrQWxsXCIgdHlwZT1cImNoZWNrYm94XCIgdGl0bGU9XCJDaGVjay9VbmNoZWNrIEFsbFwiIHZhbHVlPVwiXCIgLz5cblxuZnVuY3Rpb24gQ29sdW1uKG9wdHMpIHtcbiAgdmFyIGtleSA9ICh0eXBlb2Ygb3B0cy5yZW5kZXIgPT09ICdzdHJpbmcnID8gb3B0cy5yZW5kZXJcbiAgICAgICAgICAgIDogb3B0cy5rZXkgPyBvcHRzLmtleVxuICAgICAgICAgICAgOiBvcHRzLnNvcnQpIHx8IG51bGwsXG4gICAgICBjbGFzc2VzICA9IG9wdHMuY2xhc3MgfHwgb3B0cy5jbGFzc2VzIHx8ICcnLFxuICAgICAgdGl0bGUgICAgPSBvcHRzLnRpdGxlIHx8IGtleSxcbiAgICAgIHNvcnQgICAgID0gb3B0cy5zb3J0ICB8fCBrZXksXG4gICAgICBjb2xzICAgICA9IG9wdHMuY29scyAgfHwgMixcbiAgICAgIHJlbmRlciAgID0gb3B0cy5yZW5kZXI7XG4gIGNsYXNzZXMgPSBBcnJheS5pc0FycmF5KGNsYXNzZXMpID8gY2xhc3Nlc1xuICAgICAgICAgICAgOiB0eXBlb2YgY2xhc3NlcyA9PT0gJ3N0cmluZycgJiYgY2xhc3Nlcy5pbmRleE9mKCcgJykgPiAtMSA/IGNsYXNzZXMuc3BsaXQoJyAnKVxuICAgICAgICAgICAgOiB0eXBlb2YgY2xhc3NlcyA9PT0gJ3N0cmluZycgJiYgY2xhc3Nlcy5sZW5ndGggPj0gMSA/IFtjbGFzc2VzXSA6IFtdO1xuICBpZiAoY2xhc3Nlcy5sZW5ndGggPD0gMCkge1xuICAgIGNsYXNzZXMucHVzaChgdGJsLXhzLSR7Y29sc31gKTtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihvcHRzLCB7a2V5LCB0aXRsZSwgY2xhc3Nlcywgc29ydCwgcmVuZGVyfSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3R5cGVzLmpzXG4gKiovIiwiXG5leHBvcnQge3JlbmRlclRhYmxlSGVhZCwgcmVuZGVyVGFibGVCb2R5fTtcblxuZnVuY3Rpb24gcmVuZGVyVGFibGVIZWFkKHtjb2x1bW5zLCBob29rc30pIHtcbiAgY29uc3QgdGhlYWQgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xuICBjb25zdCB0ciAgICAgICA9IGNvbHVtbnMucmVkdWNlKCh0ciwgYykgPT4ge1xuICAgIGxldCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKTtcbiAgICBob29rcy5wcmVIZWFkZXJGaWVsZCh7ZWxlbSwgY29sdW1uOiBjfSlcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoLi4uYy5jbGFzc2VzKTtcbiAgICBlbGVtLmlubmVySFRNTCA9IGMudGl0bGU7XG4gICAgZWxlbS5yZW5kZXIgICAgPSBjLnJlbmRlcjtcbiAgICBlbGVtLm9wdHMgICAgICA9IGMub3B0cztcbiAgICBlbGVtLmNvbHVtbiAgICA9IGM7XG4gICAgdHIuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgaG9va3MucG9zdEhlYWRlckZpZWxkKHtlbGVtLCBjb2x1bW46IGN9KVxuICAgIHJldHVybiB0cjtcbiAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSk7XG4gIHRoZWFkLmFwcGVuZENoaWxkKHRyKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGVhZCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhYmxlQm9keSh7ZGF0YSwgY29sdW1ucywgaG9va3N9KSB7XG4gIGlmICghZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGEgaXMgbnVsbC4gVHJ5IHNldCB7IGRhdGE6IDxQcm9taXNlfEFycmF5PiB9IGluIFBvd2VyVGFibGUgb3B0aW9ucycpXG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEudGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoZGF0YSB8fCBbXSlcbiAgfVxuICByZXR1cm4gZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBiZWZvcmUgPSBob29rcy5wcmVSZW5kZXIoe2RhdGF9KVxuICAgIGNvbnNvbGUuZXJyb3IoJ3JlbmRlclRhYmxlQm9keS5wcmVSZW5kZXIuYmVmb3JlID0nLCBiZWZvcmUpXG5cbiAgICBkYXRhID0gQXJyYXkuaXNBcnJheShiZWZvcmUuZGF0YSkgPyBiZWZvcmUuZGF0YSA6IGRhdGEgfHwgW11cbiAgICByZXR1cm4gZGF0YS5yZWR1Y2UoKHRib2R5LCByb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICBjb25zdCBwcmUgPSBob29rcy5wcmVSb3coe2VsZW06IHRib2R5LCByb3dJbmRleCwgZGF0YTogcm93fSlcbiAgICAgIGlmICghcHJlLmRhdGEpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCdwbHVnaW4gc2tpcHBlZCByb3cnLCByb3dJbmRleCwgcm93KVxuICAgICAgICByZXR1cm4gdGJvZHlcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRibFJvdyA9IGNvbHVtbnMucmVkdWNlKCh0ciwgY29sdW1uKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgIHRyLmFwcGVuZENoaWxkKGVsZW0pXG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCguLi5jb2x1bW4uY2xhc3NlcylcbiAgICAgICAgZWxlbS5pbm5lckhUTUwgPSB0eXBlb2YgY29sdW1uLnJlbmRlciA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5yZW5kZXIoe3JvdywgZWxlbSwgY29sdW1ufSkgOiByb3dbY29sdW1uLmtleV1cbiAgICAgICAgaG9va3MucG9zdENlbGwoe2VsZW0sIGNvbHVtbiwgcm93SW5kZXgsIGRhdGE6IHJvd30pXG4gICAgICAgIHJldHVybiB0clxuICAgICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSlcbiAgICAgIGhvb2tzLnBvc3RSb3coe2VsZW06IHRibFJvdywgcm93SW5kZXgsIGRhdGE6IHJvd30pXG4gICAgICB0Ym9keS5hcHBlbmRDaGlsZCh0YmxSb3cpXG4gICAgICByZXR1cm4gdGJvZHlcbiAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKVxuICB9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyLmpzXG4gKiovIiwiLyoqXG4gKiBVdGlsaXR5ICYgcnVubmVyIGZvciBwbHVnaW5zIGxvYWRlZCBpbiBhIGdpdmVuIGNvbnRleHQ6XG4gKi9cbmV4cG9ydCB7UGx1Z2luSG9va3N9XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3Qgb2Yga2V5ZWQgZnVuY3Rpb25zIHdoaWNoIHdpbGwgcnVuIGFnYWluc3QgYW55IGBoYW5kbGVyc2AgaW4gYW55IG9mIHRoZSBwbHVnaW5zIGdpdmVuXG4gKi9cbmZ1bmN0aW9uIFBsdWdpbkhvb2tzKHtwbHVnaW5zfSkge1xuICBjb25zdCBjcmVhdGVIb29rID0gKGV2ZW50TmFtZSkgPT4gKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkgPT4ge1xuICAgIHJldHVybiBwbHVnaW5zLnJlZHVjZSgob2JqLCBwKSA9PiB7XG4gICAgICBpZiAoIW9iaikgeyByZXR1cm4gb2JqOyB9IC8vIHByb2Nlc3Npbmcgd2FzIGNhbmNlbGxlZCBieSBhIHBsdWdpblxuICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHlwZW9mIHAuaGFuZGxlcnNbZXZlbnROYW1lXSA9PT0gJ2Z1bmN0aW9uJyA/IHAuaGFuZGxlcnNbZXZlbnROYW1lXShvYmopIDogb2JqXG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWRcbiAgICB9LCB7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pXG4gIH1cbiAgLy8gQWRkIHRoZXNlIG9uIHRoZSBgaGFuZGxlcnNgIGtleSBvbiB5b3VyIHBsdWdpbnNcbiAgcmV0dXJuIHtcbiAgICBwcmVSZW5kZXI6ICAgICAgICAgIGNyZWF0ZUhvb2soJ3ByZVJlbmRlcicpLFxuICAgIHBvc3RSZW5kZXI6ICAgICAgICAgY3JlYXRlSG9vaygncG9zdFJlbmRlcicpLFxuICAgIHByZVJvdzogICAgICAgICAgICAgY3JlYXRlSG9vaygncHJlUm93JyksXG4gICAgcG9zdFJvdzogICAgICAgICAgICBjcmVhdGVIb29rKCdwb3N0Um93JyksXG4gICAgcHJlQ2VsbDogICAgICAgICAgICBjcmVhdGVIb29rKCdwcmVDZWxsJyksXG4gICAgcG9zdENlbGw6ICAgICAgICAgICBjcmVhdGVIb29rKCdwb3N0Q2VsbCcpLFxuICAgIHByZUhlYWRlckZpZWxkOiAgICAgY3JlYXRlSG9vaygncHJlSGVhZGVyRmllbGQnKSxcbiAgICBwb3N0SGVhZGVyRmllbGQ6ICAgIGNyZWF0ZUhvb2soJ3Bvc3RIZWFkZXJGaWVsZCcpLFxuICAgIHBvc3RIZWFkZXI6ICAgICAgICAgY3JlYXRlSG9vaygncG9zdEhlYWRlcicpLFxuICAgIGRlc3Ryb3k6ICAgICAgICAgICAgY3JlYXRlSG9vaygnZGVzdHJveScpLFxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudW5zZWxlY3RhYmxlIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi50YmwteHMtMSxcXG4udGJsLXhzLTIsXFxuLnRibC14cy0zLFxcbi50YmwteHMtNCxcXG4udGJsLXhzLTUsXFxuLnRibC14cy02LFxcbi50YmwteHMtNyxcXG4udGJsLXhzLTgsXFxuLnRibC14cy05LFxcbi50YmwteHMtMTAsXFxuLnRibC14cy0xMSxcXG4udGJsLXhzLTEyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi50YmwteHMtMSB7XFxuICB3aWR0aDogOC4zMzMzJTtcXG59XFxuLnRibC14cy0yIHtcXG4gIHdpZHRoOiAxNi42NjY2JTtcXG59XFxuLnRibC14cy0zIHtcXG4gIHdpZHRoOiAyNC45OTk5JTtcXG59XFxuLnRibC14cy00IHtcXG4gIHdpZHRoOiAzMy4zMzMyJTtcXG59XFxuLnRibC14cy01IHtcXG4gIHdpZHRoOiA0MS42NjY1JTtcXG59XFxuLnRibC14cy02IHtcXG4gIHdpZHRoOiA0OS45OTk4JTtcXG59XFxuLnRibC14cy03IHtcXG4gIHdpZHRoOiA1OC4zMzMxJTtcXG59XFxuLnRibC14cy04IHtcXG4gIHdpZHRoOiA2Ni42NjY0JTtcXG59XFxuLnRibC14cy05IHtcXG4gIHdpZHRoOiA3NC45OTk3JTtcXG59XFxuLnRibC14cy0xMCB7XFxuICB3aWR0aDogODMuMzMzMSU7XFxufVxcbi50YmwteHMtMTEge1xcbiAgd2lkdGg6IDkxLjY2NjMlO1xcbn1cXG4udGJsLXhzLTEyIHtcXG4gIHdpZHRoOiA5OS45OTk2JTtcXG59XFxuLnBvd2VyLXRhYmxlIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRyIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRoZWFkIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5wb3dlci10YWJsZSB0aGVhZCB0aCB7XFxuICAvKiBkZ3JpZC1pc2ggKi9cXG4gIGJhY2tncm91bmQ6ICNmMmYyZjI7XFxuICBjb2xvcjogIzYyNjI2MjtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQUFBO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGZvbnQtc2l6ZTogMS4zMWVtO1xcbiAgcGFkZGluZzogNnB4IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBtYXgtaGVpZ2h0OiAzNXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHtcXG4gIGJvcmRlci1jb2xvcjogI2RkZGRkZDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDBweCAwcHggMHB4IDFweDtcXG4gIHBhZGRpbmc6IDZweCAzcHg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIGhlaWdodDogMjUwcHg7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRkIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBtYXJnaW46IDA7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSAucm93LW9kZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlY2VjICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlLW91dDtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLmRpc2FibGVkIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoICFpbXBvcnRhbnQ7XFxuICBjdXJzb3I6IG5vbmU7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5kaXNhYmxlZCBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyOmhvdmVyIC5uYW1lIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuLnBvd2VyLXRhYmxlIHRib2R5IHRyLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNCMEIwQjAgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5zZWxlY3RlZCAubmFtZSB7XFxuICBwYWRkaW5nLWxlZnQ6IDRweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1sZWZ0IHtcXG4gIHRleHQtYWxpZ246IGxlZnQgICAgIWltcG9ydGFudDtcXG59XFxuLnBvd2VyLXRhYmxlIC50ZXh0LWNlbnRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXIgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1yaWdodCB7XFxuICB0ZXh0LWFsaWduOiByaWdodCAgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1qdXN0aWZ5IHtcXG4gIHRleHQtYWxpZ246IGp1c3RpZnkgIWltcG9ydGFudDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9zcmMvc3R5bGUubGVzc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7Z2V0SWR9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQge2V2ZW50c30gZnJvbSAnLi4vZXZlbnRzJ1xuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0YWJsZSh7dGFibGUsIGRhdGF9KSB7XG4gIGNvbnN0IHNlbGVjdGVkICAgICAgICA9IFtdXG4gIGNvbnN0IGNsZWFudXBIYW5kbGVycyA9IFtdXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnc2VsZWN0YWJsZScsXG4gICAgbWl4aW5zOiB7XG4gICAgICBpc1NlbGVjdGVkLFxuICAgICAgc2VsZWN0QWRkLFxuICAgICAgc2VsZWN0QWxsLFxuICAgICAgc2VsZWN0VG9nZ2xlLFxuICAgICAgZ2V0U2VsZWN0ZWQsXG4gICAgICBzZWxlY3ROb25lLFxuICAgICAgc2VsZWN0UmVtb3ZlXG4gICAgfSxcbiAgICBoYW5kbGVyczoge1xuICAgICAgZGVzdHJveTogICAgICAgICAgX2Rlc3Ryb3ksXG4gICAgICBwb3N0UmVuZGVyOiAgICAgICBfcG9zdFJlbmRlcixcbiAgICAgIHBvc3RIZWFkZXI6ICAgICAgIF9wb3N0SGVhZGVyLFxuICAgICAgcHJlSGVhZGVyRmllbGQ6ICAgX3ByZUhlYWRlckZpZWxkLFxuICAgIH0sXG4gIH1cblxuICBjb25zdCBzZWxlY3RBbGxUb2dnbGVDbGljayA9IChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgIHNlbGVjdEFsbCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdE5vbmUoKVxuICAgIH1cbiAgfVxuXG4gIC8vIGNvbnN0IHNlbGVjdEl0ZW1DbGljayA9IChlKSA9PiB7XG4gIC8vICAgbGV0IGVsID0gZS50YXJnZXRcbiAgLy8gICBpZiAoZWwuY2hlY2tlZCkge1xuICAvLyAgICAgc2VsZWN0SXRlbShlbC52YWx1ZSwgdHJ1ZSlcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgc2VsZWN0SXRlbShlbC52YWx1ZSwgZmFsc2UpXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgZnVuY3Rpb24gX2Rlc3Ryb3koKSB7XG4gICAgcmV0dXJuIGNsZWFudXBIYW5kbGVycy5tYXAocm0gPT4gcm0oKSkgLy8gc2hvdWxkIHJldHVybiBzcGFyc2UgYXJyYXkgdy8gbGVuZ3RoID09PSAjIG9mIGNsZWFudXAgbWV0aG9kIGNhbGxzXG4gIH1cblxuICBmdW5jdGlvbiBfcG9zdFJlbmRlcih7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pIHtcbiAgICBsZXQgdGJvZHkgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuICAgIGlmICghdGJvZHkpIHsgdGhyb3cgbmV3IEVycm9yKCdObyB0YWJsZSBib2R5IGZvdW5kISEhISEnKSB9XG4gICAgdGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfaGFuZGxlU2VsZWN0KVxuICAgIGNsZWFudXBIYW5kbGVycy5wdXNoKCgpID0+IHRib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2hhbmRsZVNlbGVjdCkpXG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXVxuICB9XG5cbiAgZnVuY3Rpb24gX3Bvc3RIZWFkZXIoe2VsZW19KSB7XG5cbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0QWxsVG9nZ2xlQ2xpY2spXG4gICAgY2xlYW51cEhhbmRsZXJzLnB1c2goKCkgPT4gZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEFsbFRvZ2dsZUNsaWNrKSlcblxuICB9XG5cbiAgZnVuY3Rpb24gX3ByZUhlYWRlckZpZWxkKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGlmIChjb2x1bW4uc2VsZWN0aW9uKSB7XG4gICAgICBjb2x1bW4udGl0bGUgPSBgPGlucHV0IGlkPVwidG9nZ2xlQ2hlY2tBbGxcIiB0eXBlPVwiY2hlY2tib3hcIiB0aXRsZT1cIkNoZWNrL1VuY2hlY2sgQWxsXCIgdmFsdWU9XCJcIiAvPmA7XG4gICAgICBjb2x1bW4ucmVuZGVyID0gKHtlbGVtLCBjb2x1bW4sIHJvd30pID0+IHtcbiAgICAgICAgbGV0IF9nZXRJZCA9IGNvbHVtbi5nZXRJZCB8fCBnZXRJZDtcbiAgICAgICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCIke19nZXRJZChyb3cpfVwiICR7aXNTZWxlY3RlZChfZ2V0SWQocm93KSkgPyAnIGNoZWNrZWQ9XCJjaGVja2VkXCInIDogJyd9IC8+YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdEFsbCgpIHtcbiAgICBBcnJheS5mcm9tKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rpb24tY29sIFt0eXBlPVwiY2hlY2tib3hcIl0nKSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oZWwpIHtyZXR1cm4gZWwudmFsdWU7fSlcbiAgICAgIC5tYXAoc2VsZWN0SXRlbSh0cnVlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdE5vbmUoKSB7XG4gICAgQXJyYXkuZnJvbSh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0aW9uLWNvbCBbdHlwZT1cImNoZWNrYm94XCJdJykpXG4gICAgICAubWFwKGZ1bmN0aW9uKGVsKSB7cmV0dXJuIGVsLnZhbHVlfSlcbiAgICAgIC5tYXAoc2VsZWN0SXRlbShmYWxzZSkpXG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RJdGVtKGlkLCBib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgaWQgPT09ICdib29sZWFuJykge1xuICAgICAgLy8gcmV2ZXJzZSBwYXJhbXNcbiAgICAgIFtpZCwgYm9vbF0gPSBbYm9vbCwgaWRdXG4gICAgfVxuICAgIGlmICghaWQpIHtyZXR1cm4gZmFsc2V9XG5cbiAgICB2YXIgY2hrID0gdGFibGUucXVlcnlTZWxlY3RvcignW3R5cGU9XCJjaGVja2JveFwiXVt2YWx1ZT1cIicgKyBpZCArICdcIl0nKVxuICAgIGlmIChjaGspIHtcbiAgICAgIC8vIHNlZSBpZiB3ZSBhcmUgaW4gJ3RvZ2dsZSBtb2RlJ1xuICAgICAgaWYgKHR5cGVvZiBib29sID09PSAndW5kZWZpbmVkJyB8fCBib29sID09PSBudWxsKSB7XG4gICAgICAgIGJvb2wgPSAhY2hrLmNoZWNrZWQgLy8gVG9nZ2xlIGl0IVxuICAgICAgfVxuICAgICAgaWYgKGJvb2wpIHtcbiAgICAgICAgY2hrLmNoZWNrZWQgPSAnY2hlY2tlZCdcbiAgICAgICAgY2hrLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJylcbiAgICAgICAgY2hrLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgIGlmIChzZWxlY3RlZC5pbmRleE9mKGlkKSA9PT0gLTEpIHtzZWxlY3RlZC5wdXNoKGlkKX1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoay5jaGVja2VkID0gdW5kZWZpbmVkXG4gICAgICAgIGNoay5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKVxuICAgICAgICBjaGsucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcbiAgICAgICAgaWYgKHNlbGVjdGVkLmluZGV4T2YoaWQpICE9PSAtMSkge3NlbGVjdGVkLnNwbGljZShzZWxlY3RlZC5pbmRleE9mKGlkKSwgMSl9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0U3RhdHVzVG90YWxzKHVzZXJzLmxlbmd0aCwgc2VsZWN0ZWQubGVuZ3RoKVxuICAgIHRhYmxlLmRpc3BhdGNoRXZlbnQoZXZlbnRzLmNyZWF0ZVN0YXR1c0V2ZW50KHtzZWxlY3RlZCwgZGF0YX0pKVxuICAgIHRhYmxlLmRpc3BhdGNoRXZlbnQoZXZlbnRzLmNyZWF0ZVNlbGVjdEV2ZW50KHtzZWxlY3RlZH0pKVxuXG4gICAgcmV0dXJuIHsnaWQnOiBpZCwgJ2NoZWNrZWQnOiBib29sLCAnZWxlbSc6IGNoa31cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdFRvZ2dsZShpZCkgeyAgIHJldHVybiBzZWxlY3RJdGVtKGlkLCB1bmRlZmluZWQpIH1cbiAgZnVuY3Rpb24gc2VsZWN0QWRkKGlkKSB7ICAgICAgcmV0dXJuIHNlbGVjdEl0ZW0oaWQsIHRydWUpIH1cbiAgZnVuY3Rpb24gc2VsZWN0UmVtb3ZlKGlkKSB7ICAgcmV0dXJuIHNlbGVjdEl0ZW0oaWQsIGZhbHNlKSB9XG4gIGZ1bmN0aW9uIGlzU2VsZWN0ZWQoaWQpIHsgICAgIHJldHVybiBzZWxlY3RlZC5pbmRleE9mKGlkKSA+IC0xIH1cbiAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWQoKSB7ICAgICAgcmV0dXJuIHNlbGVjdGVkIH1cblxuICBmdW5jdGlvbiBfaGFuZGxlU2VsZWN0KGUpIHtcbiAgICB2YXIgZWwsIHZhbFxuICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICB2YWwgPSBlLnRhcmdldC52YWx1ZVxuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RSJykge1xuICAgICAgZWwgPSBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgaWYgKGVsICYmIGVsLnZhbHVlKSB7IHZhbCA9IGVsLnZhbHVlIH1cbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURCcpIHtcbiAgICAgIGVsID0gZS50YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgaWYgKGVsICYmIGVsLnZhbHVlKSB7IHZhbCA9IGVsLnZhbHVlIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLndhcm4oJ19oYW5kbGVTZWxlY3QgVHJpZ2dlcmVkJywgdmFsLCBlbCwgZSlcbiAgICBpZiAodmFsKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHNlbGVjdFRvZ2dsZSh2YWwpXG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL3NlbGVjdGFibGUuanNcbiAqKi8iLCJcbi8qKlxuICogVXRpbGl0eSBhcnJheWlmeSBtZXRob2RcbiAqIEFkZCB0byAucHJvdG90eXBlIG9mIEl0ZXJhdG9ycywgQXJyYXlCdWZmZXIsIEFyZ3VtZW50cywgTm9kZUxpc3QsIFNldC9XZWFrU2V0LCB3aGF0ZXZlciAjWU9MT1xuICpcbiAqIC4uLiBPciBqdXN0IHVzZSBhcyB1dGlsLCBhcyBuZWVkZWQsICNKdXN0RG9JdFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuICBsaXN0ID0gQXJyYXkuaXNBcnJheShsaXN0KSA/IGxpc3QgOiB0aGlzXG4gIHJldHVybiBBcnJheS5mcm9tICYmIEFycmF5LmZyb20obGlzdCkgfHwgWyd1cGdyYWRlIHlvdXIgYnJvd3NlciwgcGZmdCddXG59XG5cbi8qKlxuICogR2V0IGBBcnJheS5zb3J0YCBmdW5jdGlvbiBmb3Iga2V5IG5hbWUgY29tcGFyaXNvbnMgKHN1cHBvcnRzIHJldmVyc2UpXG4gKlxuICogV2hlbiBuYW1lID09PSAnZW1haWwgICAtLS0gU29ydCBlbWFpbCBhc2NlbmRpbmcuXG4gKlxuICogV2hlbiBuYW1lID09PSAnLWVtYWlsICAtLS0gU29ydCBlbWFpbCBkZXNjZW5kaW5nXG4gKlxuICogQHJldHVybnMgW2Z1bmN0aW9uXSBjb21wYXJlciB1c2VkIGluIGBBcnJheS5zb3J0KClgXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U29ydGVyKGtleSkge1xuICBjb25zdCBfZW5nbGlzaFNvcnQgICAgICAgICA9IChhLCBiKSA9PiAoYVtrZXldIDwgYltrZXldID8gLTEgOiAoYVtrZXldID4gYltrZXldID8gMSA6IDApKVxuICBjb25zdCBfZW5nbGlzaFNvcnRSZXZlcnNlZCA9IChhLCBiKSA9PiAoYVtrZXldID49IGJba2V5XSA/IC0xIDogKGFba2V5XSA8IGJba2V5XSA/IDEgOiAwKSlcblxuICBpZiAoa2V5WzBdID09PSAnLScpIHtcbiAgICBrZXkgPSBrZXkuc3Vic3RyKDEpO1xuICAgIHJldHVybiBfZW5nbGlzaFNvcnRSZXZlcnNlZDtcbiAgfVxuICByZXR1cm4gX2VuZ2xpc2hTb3J0O1xufVxuXG4vKipcbiAqIEFjY2VwdHMgZWxlbWVudHMgZnJvbSBgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbGBcbiAqXG4gKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBvZiBAbm9kZVxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFsbChub2RlKSB7XG4gIGlmICh0aGlzIGluc3RhbmNlb2YgTm9kZUxpc3QpIHsgbm9kZSA9IHRoaXM7IH1cblxuICB0b0FycmF5KG5vZGUpXG4gICAgLmZvckVhY2goZWwgPT4gZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKSlcbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBUb3RlcyBvYnZpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZCh7aWQsIF9pZH0pIHsgcmV0dXJuIGlkIHx8IF9pZDsgfVxuXG5cbi8qKlxuICogV2FybmluZzogUHJpdmF0ZS9sb2NhbCB1c2Ugb25seS4gRG8gbm90IGhvaXN0LlxuICogKioqIFVuc2FmZSBIVE1ML3N0cmluZyBoYW5kbGluZyAqKipcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW0gPSBodG1sID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGRpdi5pbm5lckhUTUwgPSBodG1sIC8vIFBvdGVudGlhbCBTZWN1cml0eSBFeHBsb2l0IFZlY3RvciEhISEhIVxuICB0b0FycmF5KGRpdi5jaGlsZHJlbilcbiAgICAuZm9yRWFjaChlbCA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwpKVxuICByZXR1cm4gY29udGFpbmVyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsIlxuLy8gTGlzdCBzeW50aGV0aWMgZXZlbnQgaGFuZGxlcnNcbmNvbnN0IGNyZWF0ZVJlbmRlckV2ZW50ID0gKG9wdHMpID0+IG5ldyBDdXN0b21FdmVudChjcmVhdGVSZW5kZXJFdmVudC5ldmVudE5hbWUsIHsgJ2RldGFpbCc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCAnYnViYmxlcyc6IHRydWUsICdjYW5jZWxhYmxlJzogZmFsc2UgfSlcbmNyZWF0ZVJlbmRlckV2ZW50LmV2ZW50TmFtZSA9ICdyZW5kZXInXG5jb25zdCBjcmVhdGVTdGF0dXNFdmVudCA9IChvcHRzKSA9PiBuZXcgQ3VzdG9tRXZlbnQoY3JlYXRlU3RhdHVzRXZlbnQuZXZlbnROYW1lLCB7ICdkZXRhaWwnOiBPYmplY3QuYXNzaWduKHt9LCBvcHRzKSwgJ2J1YmJsZXMnOiB0cnVlLCAnY2FuY2VsYWJsZSc6IGZhbHNlIH0pXG5jcmVhdGVTdGF0dXNFdmVudC5ldmVudE5hbWUgPSAnc3RhdHVzJ1xuY29uc3QgY3JlYXRlU2VsZWN0RXZlbnQgPSAob3B0cykgPT4gbmV3IEN1c3RvbUV2ZW50KGNyZWF0ZVNlbGVjdEV2ZW50LmV2ZW50TmFtZSwgeyAnZGV0YWlsJzogT2JqZWN0LmFzc2lnbih7fSwgb3B0cyksICdidWJibGVzJzogdHJ1ZSwgJ2NhbmNlbGFibGUnOiBmYWxzZSB9KVxuY3JlYXRlU2VsZWN0RXZlbnQuZXZlbnROYW1lID0gJ3NlbGVjdCdcbmNvbnN0IGNyZWF0ZVNvcnRlZEV2ZW50ID0gKG9wdHMpID0+IG5ldyBDdXN0b21FdmVudChjcmVhdGVTb3J0ZWRFdmVudC5ldmVudE5hbWUsIHsgJ2RldGFpbCc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpLCAnYnViYmxlcyc6IHRydWUsICdjYW5jZWxhYmxlJzogZmFsc2UgfSlcbmNyZWF0ZVNvcnRlZEV2ZW50LmV2ZW50TmFtZSA9ICdzb3J0ZWQnXG5cbi8qKlxuICogSSBkb24ndCBrbm93IGhvdyBJIGZlZWwgYWJvdXQgdGhpcy4uLlxuICogSG1tbSwgaSB0aGluayBhIGZhY3RvcnkgZnVuY3Rpb24gaXMgbmVlZGVkLi4uXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudHMgPSB7XG4gIGNyZWF0ZVJlbmRlckV2ZW50LFxuICBjcmVhdGVTdGF0dXNFdmVudCxcbiAgY3JlYXRlU2VsZWN0RXZlbnQsXG4gIGNyZWF0ZVNvcnRlZEV2ZW50LFxufVxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V2ZW50cy5qc1xuICoqLyIsImltcG9ydCB7Z2V0U29ydGVyLCBjcmVhdGVFbGVtLCB0b0FycmF5LCByZW1vdmVBbGx9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQge2V2ZW50c30gZnJvbSAnLi4vZXZlbnRzJ1xuXG5leHBvcnQgZnVuY3Rpb24gU29ydGFibGUoe3RhYmxlLCBjb25maWd9KSB7XG4gIGNvbnN0IGNsZWFudXBIYW5kbGVycyA9IFtdXG4gIGxldCBzb3J0QnkgPSAnJztcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdzb3J0YWJsZScsXG4gICAgbWl4aW5zOiB7XG4gICAgICBzb3J0QnlDb2x1bW4sXG4gICAgfSxcbiAgICBoYW5kbGVyczoge1xuICAgICAgZGVzdHJveTogICAgICAgIF9kZXN0cm95LFxuICAgICAgcHJlUmVuZGVyOiAgICAgIF9wcmVSZW5kZXIsXG4gICAgICBwb3N0UmVuZGVyOiAgICAgX3Bvc3RSZW5kZXIsXG4gICAgICBwcmVIZWFkZXJGaWVsZDogX3ByZUhlYWRlckZpZWxkLFxuICAgIH0sXG4gIH1cblxuICBjb25zdCBfY29sdW1uQ2xpY2tlZCA9IChlKSA9PiB7XG4gICAgbGV0IGVsID0gZS50YXJnZXRcbiAgICBlbCA9IGVsLm1hdGNoZXMoJ3RoJykgPyBlbCA6IChlbC5jbG9zZXN0ICYmIGVsLmNsb3Nlc3QoJ3RoJykgfHwgZWwpXG4gICAgbGV0IGNsaWNrZWRTb3J0ID0gZWwuZ2V0QXR0cmlidXRlKCdzb3J0JylcbiAgICBjb25zb2xlLmluZm8oJ3NvcnQgY2xpY2tlZD8sIEVMRU06ICcsIGVsLCAnXFxuU09SVC5SRVFVRVNURUQ6JywgY2xpY2tlZFNvcnQpXG4gICAgaWYgKGNsaWNrZWRTb3J0KSB7XG4gICAgICBzb3J0QnkgPSBjbGlja2VkU29ydCA9PT0gc29ydEJ5ID8gJy0nLmNvbmNhdChjbGlja2VkU29ydCkgOiBjbGlja2VkU29ydFxuICAgICAgc29ydEJ5Q29sdW1uKHNvcnRCeSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdza2lwcGluZyBzb3J0LCBFTEVNOiAnLCBlbCwgJ1xcbkVWRU5UOicsIGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdHJpZ2dlclJlbmRlcihkYXRhKSB7XG4gICAgdGFibGUuZGlzcGF0Y2hFdmVudChldmVudHMuY3JlYXRlUmVuZGVyRXZlbnQoe2RhdGEsIHRhYmxlfSkpXG4gIH1cblxuICBmdW5jdGlvbiB0cmlnZ2VyU29ydGVkKCkge1xuICAgIHRhYmxlLmRpc3BhdGNoRXZlbnQoZXZlbnRzLmNyZWF0ZVNvcnRlZEV2ZW50KHtzb3J0Qnl9KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpZXcoKSB7XG4gICAgLy8gc2V0IHRoZSB1cC9kb3duIGFycm93IGluIGNvbCBuYW1lc1xuICAgIGNvbnN0IHVwQXJyb3cgICAgID0gJyYjOTY1MDsnXG4gICAgY29uc3QgZG93bkFycm93ICAgPSAnJiM5NjYwOydcbiAgICBjb25zdCBzb3J0SWNvbnMgICA9IHRvQXJyYXkodGFibGUucXVlcnlTZWxlY3RvckFsbCgnYi5zb3J0LWFycm93JykpXG4gICAgY29uc3QgZWwgICAgICAgICAgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKGB0aFtzb3J0PSR7c29ydEJ5LnJlcGxhY2UoLy0vLCAnJyl9XWApXG4gICAgcmVtb3ZlQWxsKHNvcnRJY29ucylcbiAgICBpZiAoZWwpIHtcbiAgICAgIGxldCBzb3J0ID0gZWwuZ2V0QXR0cmlidXRlKCdzb3J0JylcbiAgICAgIGxldCBkZXNjID0gc29ydC5pbmRleE9mKCctJykgPT09IDBcbiAgICAgIGxldCBpY29uID0gY3JlYXRlRWxlbShgPGIgY2xhc3M9J3NvcnQtYXJyb3cnPiR7ZGVzYyA/IGRvd25BcnJvdyA6IHVwQXJyb3d9PC9iPmApXG4gICAgICBlbC5hcHBlbmRDaGlsZChpY29uKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZXN0cm95KCkge1xuICAgIHJldHVybiBjbGVhbnVwSGFuZGxlcnMubWFwKHJtID0+IHJtKCkpIC8vIHNob3VsZCBiZSBzcGFyc2UgYXJyYXkgdy8gbGVuZ3RoID09PSAjIG9mIGNsZWFudXAgbWV0aG9kIGNhbGxzXG4gIH1cblxuICBmdW5jdGlvbiBfcHJlUmVuZGVyKHtkYXRhfSkge1xuICAgIGNvbnN0IGRhdGFTb3J0ZXIgPSAoZGF0YSwgc29ydEtleSkgPT4gZGF0YS5zb3J0KGdldFNvcnRlcihzb3J0S2V5KSlcblxuICAgIGlmICghc29ydEJ5IHx8IHNvcnRCeS5sZW5ndGggPD0gMCkgeyByZXR1cm4gZGF0YTsgfVxuXG4gICAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGRhdGEudGhlbihkYXRhID0+IGRhdGFTb3J0ZXIoZGF0YSwgc29ydEJ5KSlcbiAgICB9IGVsc2UgaWYgKGRhdGEgJiYgQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGFTb3J0ZXIoZGF0YSwgc29ydEJ5KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9wb3N0UmVuZGVyKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGxldCB0aGVhZCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkJyk7XG4gICAgaWYgKCF0aGVhZCkgeyB0aHJvdyBuZXcgRXJyb3IoJ05vIHRhYmxlIGhlYWQgZm91bmQhISEhIScpIH1cbiAgICB0aGVhZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jb2x1bW5DbGlja2VkKVxuICAgIGNsZWFudXBIYW5kbGVycy5wdXNoKCgpID0+IHRoZWFkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2NvbHVtbkNsaWNrZWQpKVxuICAgIHJldHVybiBhcmd1bWVudHNbMF1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIF9wb3N0SGVhZGVyKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAvLyAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY29sdW1uQ2xpY2tlZClcbiAgLy8gICByZXR1cm4gYXJndW1lbnRzWzBdXG4gIC8vIH1cblxuICBmdW5jdGlvbiBzb3J0QnlDb2x1bW4oX3NvcnRCeSkge1xuICAgIHNvcnRCeSA9IF9zb3J0QnlcbiAgICB1cGRhdGVWaWV3KClcbiAgICB0cmlnZ2VyUmVuZGVyKClcbiAgICB0cmlnZ2VyU29ydGVkKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9wcmVIZWFkZXJGaWVsZCh7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pIHtcbiAgICBlbGVtLnNldEF0dHJpYnV0ZSgnc29ydCcsIGNvbHVtbi5zb3J0KVxuICAgIHJldHVybiBhcmd1bWVudHNbMF1cbiAgfVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL3NvcnRhYmxlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==