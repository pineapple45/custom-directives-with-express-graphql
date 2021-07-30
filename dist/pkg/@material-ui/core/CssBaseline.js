import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-c0e5a12b.js';
import { i as interopRequireDefault, a as interopRequireWildcard } from '../../common/interopRequireWildcard-44ec3d3b.js';
import { _ as _extends_1, w as withStyles_1 } from '../../common/withStyles-73d49942.js';
import { r as react } from '../../common/index-38daf66a.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-5ca4b40e.js';
import '../../common/withStyles-92473d18.js';
import '../../common/styled-afa98a7a.js';

var CssBaseline_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = exports.body = exports.html = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var React = interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _withStyles = interopRequireDefault(withStyles_1);



var html = {
  WebkitFontSmoothing: 'antialiased',
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box'
};
exports.html = html;

var body = function body(theme) {
  return (0, _extends2.default)({
    color: theme.palette.text.primary
  }, theme.typography.body2, {
    backgroundColor: theme.palette.background.default,
    '@media print': {
      // Save printer ink.
      backgroundColor: theme.palette.common.white
    }
  });
};

exports.body = body;

var styles = function styles(theme) {
  return {
    '@global': {
      html: html,
      '*, *::before, *::after': {
        boxSizing: 'inherit'
      },
      'strong, b': {
        fontWeight: theme.typography.fontWeightBold
      },
      body: (0, _extends2.default)({
        margin: 0
      }, body(theme), {
        // Add support for document.body.requestFullScreen().
        // Other elements, if background transparent, are not supported.
        '&::backdrop': {
          backgroundColor: theme.palette.background.default
        }
      })
    }
  };
};
/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */


exports.styles = styles;

function CssBaseline(props) {
  /* eslint-disable no-unused-vars */
  var _props$children = props.children,
      children = _props$children === void 0 ? null : _props$children,
      classes = props.classes;
  /* eslint-enable no-unused-vars */

  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
}

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiCssBaseline'
})(CssBaseline);

exports.default = _default;
});

var CssBaseline = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _CssBaseline.default;
  }
});

var _CssBaseline = interopRequireDefault(CssBaseline_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(CssBaseline);

export default __pika_web_default_export_for_treeshaking__;
