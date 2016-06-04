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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4NDlkZjhlNDc0NWVkMWMyYzcyMCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcz85NDg4Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5sZXNzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbnMvc2VsZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsNEdBQWtKLEU7Ozs7Ozs7Ozs7OztTQ0dsSSxLLEdBQUEsSzs7QUFIaEI7O0FBQ0E7O0FBRU8sVUFBUyxLQUFULENBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QjtBQUNsQyxPQUFJLENBQUMsSUFBTCxFQUFhO0FBQUUsV0FBTSxJQUFJLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQThEO0FBQzdFLE9BQUksQ0FBQyxN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QVUsRUFBRSxJQUFGLENBQVYsR0FBb0IsQ0FBcEIsR0FBd0IsQ0FBMUQ7QUFDRCxJQUZEO0FBR0Q7O0FBRU0sVUFBUyxTQUFULENBQW1CLEtBQW5CLEVBQTBCO0FBQy9CLE9BQUksZ0JBQWdCLFFBQXBCLEVBQThCO0FBQUUsYUFBUSxJQUFSO0FBQWU7O0FBRS9DLFNBQU0sT0FBTixHQUFnQixPQUFoQixDQUF3QixVQUFTLEVBQVQsRUFBYTtBQUFDLFFBQUcsVUFBSCxJQUFpQixHQUFHLFVBQUgsQ0FBYyxXQUFkLENBQTBCLEVBQTFCLENBQWpCO0FBQStDLElBQXJGO0FBQ0Q7O0FBRU0sVUFBUyxLQUFULE9BQTBCO0FBQUEsT0FBVixFQUFVLFFBQVYsRUFBVTtBQUFBLE9BQU4sR0FBTSxRQUFOLEdBQU07QUFBRSxVQUFPLE1BQU0sR0FBYjtBQUFtQixFIiwiZmlsZSI6InBvd2VyLXRhYmxlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlBvd2VyVGFibGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiUG93ZXJUYWJsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODQ5ZGY4ZTQ3NDVlZDFjMmM3MjBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIlBvd2VyVGFibGVcIl0gPSByZXF1aXJlKFwiLSEvVXNlcnMvZGxldnkvY29kZS9vc3MvcG93ZXItdGFibGUvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcz97XFxcInByZXNldHNcXFwiOltcXFwiZXMyMDE1XFxcIl19IS9Vc2Vycy9kbGV2eS9jb2RlL29zcy9wb3dlci10YWJsZS9pbmRleC5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge1RhYmxlIGFzIFR9IGZyb20gJy4vc3JjL3RhYmxlJztcbmltcG9ydCB7U2VsZWN0YWJsZX0gZnJvbSAnLi9zcmMvcGx1Z2lucy9zZWxlY3RhYmxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlKGVsZW0sIGNvbmZpZykge1xuICBpZiAoIWVsZW0pICAgeyB0aHJvdyBuZXcgRXJyb3IoJ1RhYmxlIGluc3RhbmNlIHJlcXVpcmVzIDFzdCBwYXJhbSBgZWxlbWAnKTsgfVxuICBpZiAoIWNvbmZpZykgeyB0aHJvdyBuZXcgRXJyb3IoJ1RhYmxlIGluc3RhbmNlIHJlcXVpcmVzIDJuZCBwYXJhbSBgY29uZmlnYCcpOyB9XG4gIGlmICghY29uZmlnLnBsdWdpbnMpIHtjb25maWcucGx1Z2lucyA9IFtdO31cbiAgY29uZmlnLnBsdWdpbnMucHVzaChTZWxlY3RhYmxlKTtcbiAgcmV0dXJuIFQoZWxlbSwgY29uZmlnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQge3JlbmRlclRhYmxlSGVhZCwgcmVuZGVyVGFibGVCb2R5fSBmcm9tICcuL3JlbmRlcidcbmltcG9ydCB7UGx1Z2luSG9va3N9IGZyb20gJy4vcGx1Z2lucydcblxuZXhwb3J0IHtUYWJsZX1cblxuZnVuY3Rpb24gVGFibGUoZWwsIGNvbmZpZykge1xuICBsZXQgdGFibGUsIGNzcywgaG9va3M7XG4gIGNvbnN0IGN0eCA9IHsgZGVzdHJveSB9OyAvLyBQbGFpbiBvYmplY3QgYGN0eGAgd2lsbCBiZSByZXR1cm5lZCAtIHVzZSBPYmplY3QuYXNzaWduIHRvIGV4dGVuZFxuXG4gIGNvbmZpZyA9IENvbmZpZyhjb25maWcpO1xuXG4gIE9iamVjdC5hc3NpZ24oY3R4LCBjb25maWcpO1xuXG4gIGZ1bmN0aW9uIF9yZXNldExheW91dCgpIHtcbiAgICB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcbiAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKCdwb3dlci10YWJsZScpXG4gICAgT2JqZWN0LmFzc2lnbihjdHgsIHt0YWJsZX0pXG4gICAgLy8gZW1wdHkgY29udGVudHNcbiAgICBlbC5pbm5lckhUTUwgPSAnJztcbiAgICAvLyBBcnJheS5mcm9tKGVsLmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IGVsLnJlbW92ZUNoaWxkKGNoaWxkKSlcbiAgICBlbC5hcHBlbmRDaGlsZCh0YWJsZSlcbiAgICByZXR1cm4gdGFibGVcbiAgfVxuICBmdW5jdGlvbiBfaW5qZWN0U3R5bGVzKCkge1xuICAgIGNzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlI2hvcml6b250YWwtdGFibGUnKVxuICAgIGlmICghY3NzKSB7XG4gICAgICBsZXQgc3R5bGVzID0gcmVxdWlyZShcIiFjc3MhbGVzcyEuL3N0eWxlLmxlc3NcIilcbiAgICAgIGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICAgIGNzcy5pZCA9ICdob3Jpem9udGFsLVRhYmxlJ1xuICAgICAgY3NzLmlubmVySFRNTCA9IHN0eWxlc1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjc3MpXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9sb2FkUGx1Z2lucygpIHtcbiAgICAvLyAndW5wYWNrcycvcnVucyBwbHVnaW5zXG4gICAgY29uc3QgcGx1Z2lucyA9IGNvbmZpZy5wbHVnaW5zID8gY29uZmlnLnBsdWdpbnMubWFwKHAgPT4gcChjdHgpKSA6IFtdXG4gICAgLy8gZXh0ZW5kIGN0eCB3aXRoIHBsdWdpbi5taXhpbnNcbiAgICBwbHVnaW5zLm1hcChwID0+IHR5cGVvZiBwLm1peGlucyA9PT0gJ29iamVjdCcgPyBPYmplY3QuYXNzaWduKGN0eCwgcC5taXhpbnMpIDogY3R4KVxuICAgIC8vIEFkZCBgaG9va3NgICYgYHBsdWdpbnNgIHRvIHJldHVybiBvYmplY3RcbiAgICBPYmplY3QuYXNzaWduKGN0eCwge3BsdWdpbnMsICdob29rcyc6IFBsdWdpbkhvb2tzKHtwbHVnaW5zfSl9KVxuICAgIGhvb2tzID0gY3R4Lmhvb2tzXG4gIH1cbiAgZnVuY3Rpb24gX3JlbmRlcigpIHtcblxuICAgIHJlbmRlclRhYmxlSGVhZChjdHgpXG4gICAgICAudGhlbih0aGVhZCA9PiB7XG4gICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRoZWFkKVxuICAgICAgICBob29rcy5wb3N0SGVhZGVyKHtlbGVtOiB0aGVhZH0pXG4gICAgICB9KVxuXG4gICAgcmVuZGVyVGFibGVCb2R5KGN0eClcbiAgICAgIC50aGVuKHRib2R5ID0+IHtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGJvZHkpXG4gICAgICAgIGhvb2tzLnBvc3RSZW5kZXIoe2VsZW06IHRhYmxlfSlcbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBfaW5qZWN0U3R5bGVzKCk7XG4gICAgX3Jlc2V0TGF5b3V0KCk7XG4gICAgX2xvYWRQbHVnaW5zKCk7XG4gICAgX3JlbmRlcigpO1xuICAgIHJldHVybiBjdHg7XG4gIH1cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAoY3NzKSAgIHsgY3NzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY3NzKTsgfVxuICAgIGlmICh0YWJsZSkgeyB0YWJsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhYmxlKTsgfVxuICAgIHJldHVybiBjdHg7XG4gIH1cbiAgcmV0dXJuIGluaXQoKTtcbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90YWJsZS5qc1xuICoqLyIsImltcG9ydCB7Q29sdW1ufSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHtDb25maWd9O1xuXG5mdW5jdGlvbiBDb25maWcoe2NvbHVtbnMsIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoW10pLCBwbHVnaW5zID0gW10sIGRlYnVnID0gZmFsc2UsIGhhbmRsZXJzID0gW119KSB7XG4gIGNvbHVtbnMgPSBjb2x1bW5zLm1hcChDb2x1bW4pXG4gIHJldHVybiB7Y29sdW1ucywgZGF0YSwgcGx1Z2lucywgZGVidWcsIGhhbmRsZXJzfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbmZpZy5qc1xuICoqLyIsIlxuZXhwb3J0IHtDb2x1bW59O1xuXG4vLyA8aW5wdXQgaWQ9XCJ0b2dnbGVDaGVja0FsbFwiIHR5cGU9XCJjaGVja2JveFwiIHRpdGxlPVwiQ2hlY2svVW5jaGVjayBBbGxcIiB2YWx1ZT1cIlwiIC8+XG5cbmZ1bmN0aW9uIENvbHVtbihvcHRzKSB7XG4gIHZhciBrZXkgPSAodHlwZW9mIG9wdHMucmVuZGVyID09PSAnc3RyaW5nJyA/IG9wdHMucmVuZGVyXG4gICAgICAgICAgICA6IG9wdHMua2V5ID8gb3B0cy5rZXlcbiAgICAgICAgICAgIDogb3B0cy5zb3J0KSB8fCBudWxsLFxuICAgICAgY2xhc3NlcyAgPSBvcHRzLmNsYXNzIHx8IG9wdHMuY2xhc3NlcyB8fCAnJyxcbiAgICAgIHRpdGxlICAgID0gb3B0cy50aXRsZSB8fCBrZXksXG4gICAgICBzb3J0ICAgICA9IG9wdHMuc29ydCAgfHwga2V5LFxuICAgICAgY29scyAgICAgPSBvcHRzLmNvbHMgIHx8IDIsXG4gICAgICByZW5kZXIgICA9IG9wdHMucmVuZGVyO1xuICBjbGFzc2VzID0gQXJyYXkuaXNBcnJheShjbGFzc2VzKSA/IGNsYXNzZXNcbiAgICAgICAgICAgIDogdHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnICYmIGNsYXNzZXMuaW5kZXhPZignICcpID4gLTEgPyBjbGFzc2VzLnNwbGl0KCcgJylcbiAgICAgICAgICAgIDogdHlwZW9mIGNsYXNzZXMgPT09ICdzdHJpbmcnICYmIGNsYXNzZXMubGVuZ3RoID49IDEgPyBbY2xhc3Nlc10gOiBbXTtcbiAgaWYgKGNsYXNzZXMubGVuZ3RoIDw9IDApIHtcbiAgICBjbGFzc2VzLnB1c2goYHRibC14cy0ke2NvbHN9YCk7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3B0cywge2tleSwgdGl0bGUsIGNsYXNzZXMsIHNvcnQsIHJlbmRlcn0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90eXBlcy5qc1xuICoqLyIsIlxuZXhwb3J0IHtyZW5kZXJUYWJsZUhlYWQsIHJlbmRlclRhYmxlQm9keX07XG5cbmZ1bmN0aW9uIHJlbmRlclRhYmxlSGVhZCh7Y29sdW1ucywgaG9va3N9KSB7XG4gIGNvbnN0IHRoZWFkICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgY29uc3QgdHIgICAgICAgPSBjb2x1bW5zLnJlZHVjZSgodHIsIGMpID0+IHtcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gICAgaG9va3MucHJlSGVhZGVyRmllbGQoe2VsZW0sIGNvbHVtbjogY30pXG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKC4uLmMuY2xhc3Nlcyk7XG4gICAgZWxlbS5pbm5lckhUTUwgPSBjLnRpdGxlO1xuICAgIGVsZW0ucmVuZGVyICAgID0gYy5yZW5kZXI7XG4gICAgZWxlbS5vcHRzICAgICAgPSBjLm9wdHM7XG4gICAgdHIuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgcmV0dXJuIHRyO1xuICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcbiAgdGhlYWQuYXBwZW5kQ2hpbGQodHIpO1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoZWFkKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFibGVCb2R5KHtkYXRhLCBjb2x1bW5zLCBob29rc30pIHtcbiAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEudGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGRhdGEgPSBQcm9taXNlLnJlc29sdmUoZGF0YSB8fCBbXSlcbiAgfVxuICByZXR1cm4gZGF0YS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBiZWZvcmUgPSBob29rcy5wcmVSZW5kZXIoe2RhdGF9KVxuICAgIGRhdGEgPSBBcnJheS5pc0FycmF5KGJlZm9yZS5kYXRhKSA/IGJlZm9yZS5kYXRhIDogZGF0YSB8fCBbXVxuICAgIHJldHVybiBkYXRhLnJlZHVjZSgodGJvZHksIHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHByZSA9IGhvb2tzLnByZVJvdyh7ZWxlbTogdGJvZHksIHJvd0luZGV4LCBkYXRhOiByb3d9KVxuICAgICAgaWYgKCFwcmUuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdwbHVnaW4gc2tpcHBlZCByb3cnLCByb3dJbmRleCwgcm93KVxuICAgICAgICByZXR1cm4gdGJvZHlcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRibFJvdyA9IGNvbHVtbnMucmVkdWNlKCh0ciwgY29sdW1uKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgIHRyLmFwcGVuZENoaWxkKGVsZW0pXG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCguLi5jb2x1bW4uY2xhc3NlcylcbiAgICAgICAgZWxlbS5pbm5lckhUTUwgPSB0eXBlb2YgY29sdW1uLnJlbmRlciA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5yZW5kZXIoe3JvdywgZWxlbSwgY29sdW1ufSkgOiByb3dbY29sdW1uLmtleV1cbiAgICAgICAgaG9va3MucG9zdENlbGwoe2VsZW0sIGNvbHVtbiwgcm93SW5kZXgsIGRhdGE6IHJvd30pXG4gICAgICAgIHJldHVybiB0clxuICAgICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSlcbiAgICAgIGhvb2tzLnBvc3RSb3coe2VsZW06IHRibFJvdywgcm93SW5kZXgsIGRhdGE6IHJvd30pXG4gICAgICB0Ym9keS5hcHBlbmRDaGlsZCh0YmxSb3cpXG4gICAgICByZXR1cm4gdGJvZHlcbiAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpKVxuICB9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyLmpzXG4gKiovIiwiLyoqXG4gKiBVdGlsaXR5ICYgcnVubmVyIGZvciBwbHVnaW5zIGxvYWRlZCBpbiBhIGdpdmVuIGNvbnRleHQ6XG4gKi9cbmV4cG9ydCB7UGx1Z2luSG9va3N9XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3Qgb2Yga2V5ZWQgZnVuY3Rpb25zIHdoaWNoIHdpbGwgcnVuIGFnYWluc3QgYW55IGBoYW5kbGVyc2AgaW4gYW55IG9mIHRoZSBwbHVnaW5zIGdpdmVuXG4gKi9cbmZ1bmN0aW9uIFBsdWdpbkhvb2tzKHtwbHVnaW5zfSkge1xuICBjb25zdCBjcmVhdGVIb29rID0gKGV2ZW50TmFtZSkgPT4gKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkgPT4ge1xuICAgIHJldHVybiBwbHVnaW5zLnJlZHVjZSgob2JqLCBwKSA9PiB7XG4gICAgICBpZiAoIW9iaikgeyByZXR1cm4gb2JqOyB9IC8vIHByb2Nlc3Npbmcgd2FzIGNhbmNlbGxlZCBieSBhIHBsdWdpblxuICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHlwZW9mIHAuaGFuZGxlcnNbZXZlbnROYW1lXSA9PT0gJ2Z1bmN0aW9uJyA/IHAuaGFuZGxlcnNbZXZlbnROYW1lXShvYmopIDogb2JqXG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWRcbiAgICB9LCB7ZWxlbSwgZGF0YSwgY29sdW1uLCByb3dJbmRleH0pXG4gIH1cbiAgLy8gQWRkIHRoZXNlIG9uIHRoZSBgaGFuZGxlcnNgIGtleSBvbiB5b3VyIHBsdWdpbnNcbiAgcmV0dXJuIHtcbiAgICBwcmVSZW5kZXI6ICAgICAgICAgIGNyZWF0ZUhvb2soJ3ByZVJlbmRlcicpLFxuICAgIHBvc3RSZW5kZXI6ICAgICAgICAgY3JlYXRlSG9vaygncG9zdFJlbmRlcicpLFxuICAgIHByZVJvdzogICAgICAgICAgICAgY3JlYXRlSG9vaygncHJlUm93JyksXG4gICAgcG9zdFJvdzogICAgICAgICAgICBjcmVhdGVIb29rKCdwb3N0Um93JyksXG4gICAgcHJlQ2VsbDogICAgICAgICAgICBjcmVhdGVIb29rKCdwcmVDZWxsJyksXG4gICAgcG9zdENlbGw6ICAgICAgICAgICBjcmVhdGVIb29rKCdwb3N0Q2VsbCcpLFxuICAgIHByZUhlYWRlckZpZWxkOiAgICAgY3JlYXRlSG9vaygncHJlSGVhZGVyRmllbGQnKSxcbiAgICBwb3N0SGVhZGVyOiAgICAgICAgIGNyZWF0ZUhvb2soJ3Bvc3RIZWFkZXInKSxcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGx1Z2lucy9pbmRleC5qc1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnVuc2VsZWN0YWJsZSB7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4udGJsLXhzLTEsXFxuLnRibC14cy0yLFxcbi50YmwteHMtMyxcXG4udGJsLXhzLTQsXFxuLnRibC14cy01LFxcbi50YmwteHMtNixcXG4udGJsLXhzLTcsXFxuLnRibC14cy04LFxcbi50YmwteHMtOSxcXG4udGJsLXhzLTEwLFxcbi50YmwteHMtMTEsXFxuLnRibC14cy0xMiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4udGJsLXhzLTEge1xcbiAgd2lkdGg6IDguMzMzMyU7XFxufVxcbi50YmwteHMtMiB7XFxuICB3aWR0aDogMTYuNjY2NiU7XFxufVxcbi50YmwteHMtMyB7XFxuICB3aWR0aDogMjQuOTk5OSU7XFxufVxcbi50YmwteHMtNCB7XFxuICB3aWR0aDogMzMuMzMzMiU7XFxufVxcbi50YmwteHMtNSB7XFxuICB3aWR0aDogNDEuNjY2NSU7XFxufVxcbi50YmwteHMtNiB7XFxuICB3aWR0aDogNDkuOTk5OCU7XFxufVxcbi50YmwteHMtNyB7XFxuICB3aWR0aDogNTguMzMzMSU7XFxufVxcbi50YmwteHMtOCB7XFxuICB3aWR0aDogNjYuNjY2NCU7XFxufVxcbi50YmwteHMtOSB7XFxuICB3aWR0aDogNzQuOTk5NyU7XFxufVxcbi50YmwteHMtMTAge1xcbiAgd2lkdGg6IDgzLjMzMzElO1xcbn1cXG4udGJsLXhzLTExIHtcXG4gIHdpZHRoOiA5MS42NjYzJTtcXG59XFxuLnRibC14cy0xMiB7XFxuICB3aWR0aDogOTkuOTk5NiU7XFxufVxcbi5wb3dlci10YWJsZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxufVxcbi5wb3dlci10YWJsZSB0ciB7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5wb3dlci10YWJsZSB0aGVhZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4ucG93ZXItdGFibGUgdGhlYWQgdGgge1xcbiAgLyogZGdyaWQtaXNoICovXFxuICBiYWNrZ3JvdW5kOiAjZjJmMmYyO1xcbiAgY29sb3I6ICM2MjYyNjI7XFxuICBib3JkZXI6IDA7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0FBQTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBmb250LXNpemU6IDEuMzFlbTtcXG4gIHBhZGRpbmc6IDZweCAwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgbWF4LWhlaWdodDogMzVweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB7XFxuICBib3JkZXItY29sb3I6ICNkZGRkZGQ7XFxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgYm9yZGVyLXdpZHRoOiAwcHggMHB4IDBweCAxcHg7XFxuICBwYWRkaW5nOiA2cHggM3B4O1xcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxuICBoZWlnaHQ6IDI1MHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ZCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgbWFyZ2luOiAwO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgLnJvdy1vZGQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWNlYyAhaW1wb3J0YW50O1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgZWFzZS1vdXQ7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5kaXNhYmxlZCB7XFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCAhaW1wb3J0YW50O1xcbiAgY3Vyc29yOiBub25lO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuZGlzYWJsZWQgaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0cjpob3ZlciAubmFtZSB7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcbi5wb3dlci10YWJsZSB0Ym9keSB0ci5zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQjBCMEIwICFpbXBvcnRhbnQ7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG4ucG93ZXItdGFibGUgdGJvZHkgdHIuc2VsZWN0ZWQgLm5hbWUge1xcbiAgcGFkZGluZy1sZWZ0OiA0cHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG4ucG93ZXItdGFibGUgLnRleHQtbGVmdCB7XFxuICB0ZXh0LWFsaWduOiBsZWZ0ICAgICFpbXBvcnRhbnQ7XFxufVxcbi5wb3dlci10YWJsZSAudGV4dC1jZW50ZXIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyICAhaW1wb3J0YW50O1xcbn1cXG4ucG93ZXItdGFibGUgLnRleHQtcmlnaHQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQgICAhaW1wb3J0YW50O1xcbn1cXG4ucG93ZXItdGFibGUgLnRleHQtanVzdGlmeSB7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5ICFpbXBvcnRhbnQ7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2xlc3MtbG9hZGVyIS4vc3JjL3N0eWxlLmxlc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge2dldElkfSBmcm9tICcuLi91dGlsJ1xuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0YWJsZSh7dGFibGV9KSB7XG4gIGNvbnN0IHNlbGVjdGVkID0gW107XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3NlbGVjdGFibGUnLFxuICAgIG1peGluczoge1xuICAgICAgaXNTZWxlY3RlZCxcbiAgICAgIHNlbGVjdEFkZCxcbiAgICAgIHNlbGVjdEFsbCxcbiAgICAgIHNlbGVjdFRvZ2dsZSxcbiAgICAgIGdldFNlbGVjdGVkLFxuICAgICAgc2VsZWN0Tm9uZSxcbiAgICAgIHNlbGVjdFJlbW92ZVxuICAgIH0sXG4gICAgaGFuZGxlcnM6IHtcbiAgICAgIHByZUhlYWRlckZpZWxkOiAgIF9wcmVIZWFkZXJGaWVsZCxcbiAgICAgIHBvc3RIZWFkZXI6ICAgICAgIF9wb3N0SGVhZGVyLFxuXG4gICAgfSxcbiAgfVxuXG4gIGZ1bmN0aW9uIF9wb3N0SGVhZGVyKHtlbGVtLCBkYXRhLCBjb2x1bW4sIHJvd0luZGV4fSkge1xuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfaGFuZGxlU2VsZWN0KVxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gIH1cblxuICBmdW5jdGlvbiBfcHJlSGVhZGVyRmllbGQoe2VsZW0sIGRhdGEsIGNvbHVtbiwgcm93SW5kZXh9KSB7XG4gICAgaWYgKGNvbHVtbi5zZWxlY3Rpb24pIHtcbiAgICAgIGNvbHVtbi50aXRsZSA9IGA8aW5wdXQgaWQ9XCJ0b2dnbGVDaGVja0FsbFwiIHR5cGU9XCJjaGVja2JveFwiIHRpdGxlPVwiQ2hlY2svVW5jaGVjayBBbGxcIiB2YWx1ZT1cIlwiIC8+YDtcbiAgICAgIGNvbHVtbi5yZW5kZXIgPSAoe2VsZW0sIGNvbHVtbiwgcm93fSkgPT4ge1xuICAgICAgICBsZXQgX2dldElkID0gY29sdW1uLmdldElkIHx8IGdldElkO1xuICAgICAgICByZXR1cm4gYDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIiR7X2dldElkKHJvdyl9XCIgJHtpc1NlbGVjdGVkKF9nZXRJZChyb3cpKSA/ICcgY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJ30gLz5gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICAgIEFycmF5LmZyb20odGFibGUucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdGlvbi1jb2wgW3R5cGU9XCJjaGVja2JveFwiXScpKVxuICAgICAgLm1hcChmdW5jdGlvbihlbCkge3JldHVybiBlbC52YWx1ZTt9KVxuICAgICAgLm1hcChzZWxlY3RJdGVtLmJpbmQobnVsbCwgdHJ1ZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0Tm9uZSgpIHtcbiAgICBBcnJheS5mcm9tKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rpb24tY29sIFt0eXBlPVwiY2hlY2tib3hcIl0nKSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oZWwpIHtyZXR1cm4gZWwudmFsdWU7fSlcbiAgICAgIC5tYXAoc2VsZWN0SXRlbS5iaW5kKG51bGwsIGZhbHNlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RJdGVtKGlkLCBib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgaWQgPT09ICdib29sZWFuJykge1xuICAgICAgLy8gcmV2ZXJzZSBwYXJhbXNcbiAgICAgIFtpZCwgYm9vbF0gPSBbYm9vbCwgaWRdO1xuICAgIH1cbiAgICBpZiAoIWlkKSB7cmV0dXJuIGZhbHNlO31cblxuICAgIHZhciBjaGsgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1cImNoZWNrYm94XCJdW3ZhbHVlPVwiJyArIGlkICsgJ1wiXScpO1xuICAgIGlmIChjaGspIHtcbiAgICAgIC8vIHNlZSBpZiB3ZSBhcmUgaW4gJ3RvZ2dsZSBtb2RlJ1xuICAgICAgaWYgKHR5cGVvZiBib29sID09PSAndW5kZWZpbmVkJyB8fCBib29sID09PSBudWxsKSB7XG4gICAgICAgIGJvb2wgPSAhY2hrLmNoZWNrZWQ7IC8vIFRvZ2dsZSBpdCFcbiAgICAgIH1cbiAgICAgIGlmIChib29sKSB7XG4gICAgICAgIGNoay5jaGVja2VkID0gJ2NoZWNrZWQnO1xuICAgICAgICBjaGsuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgY2hrLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQuaW5kZXhPZihpZCkgPT09IC0xKSB7c2VsZWN0ZWQucHVzaChpZCk7fVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hrLmNoZWNrZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNoay5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICAgICAgY2hrLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQuaW5kZXhPZihpZCkgIT09IC0xKSB7c2VsZWN0ZWQuc3BsaWNlKHNlbGVjdGVkLmluZGV4T2YoaWQpLCAxKTt9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0dXNUb3RhbHModGhpcy51c2Vycy5sZW5ndGgsIHNlbGVjdGVkLmxlbmd0aCk7XG5cbiAgICByZXR1cm4geydpZCc6IGlkLCAnY2hlY2tlZCc6IGJvb2wsICdlbGVtJzogY2hrfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNlbGVjdGVkKCkgeyByZXR1cm4gc2VsZWN0ZWQ7IH1cblxuICBmdW5jdGlvbiBzZWxlY3RUb2dnbGUoaWQpIHtcbiAgICByZXR1cm4gc2VsZWN0SXRlbS5iaW5kKHRoaXMpKGlkLCB1bmRlZmluZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0QWRkKGlkKSB7XG4gICAgcmV0dXJuIHNlbGVjdEl0ZW0uYmluZCh0aGlzKShpZCwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RSZW1vdmUoaWQpIHtcbiAgICByZXR1cm4gc2VsZWN0SXRlbS5iaW5kKHRoaXMpKGlkLCBmYWxzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1NlbGVjdGVkKGlkKSB7XG4gICAgcmV0dXJuIHNlbGVjdGVkLmluZGV4T2YoaWQpID4gLTE7XG4gIH1cblxuICBmdW5jdGlvbiBfaGFuZGxlU2VsZWN0KGUpIHtcbiAgICB2YXIgZWwsIHZhbDtcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgdmFsID0gZS50YXJnZXQudmFsdWU7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVFInKSB7XG4gICAgICBlbCA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuICAgICAgaWYgKGVsICYmIGVsLnZhbHVlKSB7IHZhbCA9IGVsLnZhbHVlOyB9XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnVEQnKSB7XG4gICAgICBlbCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG4gICAgICBpZiAoZWwgJiYgZWwudmFsdWUpIHsgdmFsID0gZWwudmFsdWU7IH1cbiAgICB9XG5cbiAgICBjb25zb2xlLndhcm4oJ19oYW5kbGVTZWxlY3QgVHJpZ2dlcmVkJywgdmFsLCBlbCwgZSk7XG4gICAgaWYgKHZhbCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZWxlY3RUb2dnbGUodmFsKTtcbiAgICB9XG4gIH1cblxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbHVnaW5zL3NlbGVjdGFibGUuanNcbiAqKi8iLCJcbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KCkgeyByZXR1cm4gQXJyYXkuZnJvbSAmJiBBcnJheS5mcm9tKHRoaXMpIHx8IFsndXBncmFkZSB5b3VyIGJyb3dzZXIsIHBmZnQnXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U29ydGVyKG5hbWUpIHtcbiAgaWYgKG5hbWVbMF0gPT09ICctJykge1xuICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gcmV2ZXJzZUVuZ2xpc2hTb3J0KGEsIGIpIHtcbiAgICAgIHJldHVybiAoYVtuYW1lXSA+PSBiW25hbWVdID8gLTEgOiAoYVtuYW1lXSA8IGJbbmFtZV0gPyAxIDogMCkpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gZW5nbGlzaFNvcnQoYSwgYikge1xuICAgIHJldHVybiAoYVtuYW1lXSA8IGJbbmFtZV0gPyAtMSA6IChhW25hbWVdID4gYltuYW1lXSA/IDEgOiAwKSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGwoX3RoaXMpIHtcbiAgaWYgKHRoaXMgaW5zdGFuY2VvZiBOb2RlTGlzdCkgeyBfdGhpcyA9IHRoaXM7IH1cblxuICBfdGhpcy50b0FycmF5KCkuZm9yRWFjaChmdW5jdGlvbihlbCkge2VsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCl9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldElkKHtpZCwgX2lkfSkgeyByZXR1cm4gaWQgfHwgX2lkOyB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==