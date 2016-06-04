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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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
	    var plugins = !config.plugins ? config.plugins.map(function (p) {
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
	  return { key: key, title: title, classes: classes, sort: sort, render: render };
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
	exports.push([module.id, ".unselectable {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.text-left {\n  text-align: left    !important;\n}\n.text-center {\n  text-align: center  !important;\n}\n.text-right {\n  text-align: right   !important;\n}\n.text-justify {\n  text-align: justify !important;\n}\n.tbl-xs-1,\n.tbl-xs-2,\n.tbl-xs-3,\n.tbl-xs-4,\n.tbl-xs-5,\n.tbl-xs-6,\n.tbl-xs-7,\n.tbl-xs-8,\n.tbl-xs-9,\n.tbl-xs-10,\n.tbl-xs-11,\n.tbl-xs-12 {\n  display: inline-block;\n  box-sizing: border-box;\n}\n.tbl-xs-1 {\n  width: 8.3333%;\n}\n.tbl-xs-2 {\n  width: 16.6666%;\n}\n.tbl-xs-3 {\n  width: 24.9999%;\n}\n.tbl-xs-4 {\n  width: 33.3332%;\n}\n.tbl-xs-5 {\n  width: 41.6665%;\n}\n.tbl-xs-6 {\n  width: 49.9998%;\n}\n.tbl-xs-7 {\n  width: 58.3331%;\n}\n.tbl-xs-8 {\n  width: 66.6664%;\n}\n.tbl-xs-9 {\n  width: 74.9997%;\n}\n.tbl-xs-10 {\n  width: 83.3331%;\n}\n.tbl-xs-11 {\n  width: 91.6663%;\n}\n.tbl-xs-12 {\n  width: 99.9996%;\n}\n.power-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.power-table tr {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  display: inline-block;\n  width: 100%;\n}\n.power-table thead {\n  display: block;\n  position: relative;\n  width: 100%;\n}\n.power-table thead th {\n  /* dgrid-ish */\n  background: #f2f2f2;\n  color: #626262;\n  border: 0;\n  border-bottom: 1px solid #AAA;\n  display: inline-block;\n  font-weight: 900;\n  font-size: 1.31em;\n  padding: 6px 0;\n  cursor: pointer;\n  max-height: 35px;\n  overflow: hidden;\n}\n.power-table tbody {\n  border-color: #dddddd;\n  border-style: solid;\n  border-width: 0px 0px 0px 1px;\n  padding: 6px 3px;\n  max-height: 35px;\n  overflow-y: hidden;\n  display: block;\n  overflow-y: scroll;\n  height: 250px;\n  width: 100%;\n}\n.power-table tbody td {\n  display: inline-block;\n  text-align: left;\n  margin: 0;\n}\n.power-table tbody .row-odd {\n  background-color: #ececec !important;\n}\n.power-table tbody tr {\n  cursor: pointer;\n  width: 100%;\n  display: inline-block;\n  transition: background-color 0.2s ease-out;\n}\n.power-table tbody tr.disabled {\n  text-decoration: line-through !important;\n  cursor: none;\n}\n.power-table tbody tr.disabled input[type=\"checkbox\"] {\n  display: none;\n  -ms-user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n.power-table tbody tr:hover .name {\n  font-style: italic;\n}\n.power-table tbody tr.selected {\n  background-color: #B0B0B0 !important;\n  font-weight: 700;\n}\n.power-table tbody tr.selected .name {\n  padding-left: 4px;\n  font-weight: 700;\n}\n", ""]);

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

	    column.title = '<input id="toggleCheckAll" type="checkbox" title="Check/Uncheck All" value="" />';
	    column.render = function (_ref4) {
	      var elem = _ref4.elem;
	      var column = _ref4.column;
	      var row = _ref4.row;

	      var _getId = column.getId || _util.getId;
	      return '<input type="checkbox" value="' + _getId(row) + '" ' + (isSelected(_getId(row)) ? ' checked="checked"' : '') + ' />';
	    };
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
	function toArray() {
	  return Array.from && Array.from(this) || ['upgrade your browser, pfft'];
	}

	function getSorter(name) {
	  if (name[0] === '-') {
	    name = name.substr(1);
	    return function reverseEnglishSort(a, b) {
	      return a[name] >= b[name] ? -1 : a[name] < b[name] ? 1 : 0;
	    };
	  }

	  return function englishSort(a, b) {
	    return a[name] < b[name] ? -1 : a[name] > b[name] ? 1 : 0;
	  };
	}

	function removeAll(_this) {
	  if (this instanceof NodeList) {
	    _this = this;
	  }

	  _this.toArray().forEach(function (el) {
	    el.parentNode && el.parentNode.removeChild(el);
	  });
	}

	function getId(_ref) {
	  var id = _ref.id;
	  var _id = _ref._id;
	  return id || _id;
	}

/***/ }
/******/ ])
});
;