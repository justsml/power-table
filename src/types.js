
export {Column};

// <input id="toggleCheckAll" type="checkbox" title="Check/Uncheck All" value="" />

function Column(opts) {
  var key = (typeof opts.render === 'string' ? opts.render
            : opts.key ? opts.key
            : opts.sort) || null,
      classes  = opts.class || opts.classes || '',
      title    = opts.title || key,
      sort     = opts.sort  || key,
      cols     = opts.cols  || 2,
      render   = opts.render;
  classes = Array.isArray(classes) ? classes
            : typeof classes === 'string' && classes.indexOf(' ') > -1 ? classes.split(' ')
            : typeof classes === 'string' && classes.length >= 1 ? [classes] : [];
  if (classes.length <= 0) {
    classes.push(`tbl-xs-${cols}`);
  }
  return Object.assign(opts, {key, title, classes, sort, render});
}

