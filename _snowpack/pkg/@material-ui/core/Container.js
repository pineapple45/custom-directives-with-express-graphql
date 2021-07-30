import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-c0e5a12b.js';
import { i as interopRequireDefault, a as interopRequireWildcard } from '../../common/interopRequireWildcard-44ec3d3b.js';
import { _ as _extends_1, o as objectWithoutProperties, d as defineProperty, w as withStyles_1 } from '../../common/withStyles-73d49942.js';
import { r as react } from '../../common/index-38daf66a.js';
import { p as propTypes } from '../../common/hoist-non-react-statics.cjs-5ca4b40e.js';
import { r as require$$4 } from '../../common/withStyles-92473d18.js';
import { c as capitalize_1 } from '../../common/capitalize-5b4fe8a1.js';
import '../../common/styled-afa98a7a.js';

var Container_1 = createCommonjsModule(function (module, exports) {





Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

var _defineProperty2 = interopRequireDefault(defineProperty);

var React = interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(require$$4);

var _withStyles = interopRequireDefault(withStyles_1);

var _capitalize = interopRequireDefault(capitalize_1);

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: (0, _defineProperty2.default)({
      width: '100%',
      marginLeft: 'auto',
      boxSizing: 'border-box',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      display: 'block'
    }, theme.breakpoints.up('sm'), {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }),

    /* Styles applied to the root element if `disableGutters={true}`. */
    disableGutters: {
      paddingLeft: 0,
      paddingRight: 0
    },

    /* Styles applied to the root element if `fixed={true}`. */
    fixed: Object.keys(theme.breakpoints.values).reduce(function (acc, breakpoint) {
      var value = theme.breakpoints.values[breakpoint];

      if (value !== 0) {
        acc[theme.breakpoints.up(breakpoint)] = {
          maxWidth: value
        };
      }

      return acc;
    }, {}),

    /* Styles applied to the root element if `maxWidth="xs"`. */
    maxWidthXs: (0, _defineProperty2.default)({}, theme.breakpoints.up('xs'), {
      maxWidth: Math.max(theme.breakpoints.values.xs, 444)
    }),

    /* Styles applied to the root element if `maxWidth="sm"`. */
    maxWidthSm: (0, _defineProperty2.default)({}, theme.breakpoints.up('sm'), {
      maxWidth: theme.breakpoints.values.sm
    }),

    /* Styles applied to the root element if `maxWidth="md"`. */
    maxWidthMd: (0, _defineProperty2.default)({}, theme.breakpoints.up('md'), {
      maxWidth: theme.breakpoints.values.md
    }),

    /* Styles applied to the root element if `maxWidth="lg"`. */
    maxWidthLg: (0, _defineProperty2.default)({}, theme.breakpoints.up('lg'), {
      maxWidth: theme.breakpoints.values.lg
    }),

    /* Styles applied to the root element if `maxWidth="xl"`. */
    maxWidthXl: (0, _defineProperty2.default)({}, theme.breakpoints.up('xl'), {
      maxWidth: theme.breakpoints.values.xl
    })
  };
};

exports.styles = styles;
var Container = /*#__PURE__*/React.forwardRef(function Container(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      _props$fixed = props.fixed,
      fixed = _props$fixed === void 0 ? false : _props$fixed,
      _props$maxWidth = props.maxWidth,
      maxWidth = _props$maxWidth === void 0 ? 'lg' : _props$maxWidth,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "component", "disableGutters", "fixed", "maxWidth"]);
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, fixed && classes.fixed, disableGutters && classes.disableGutters, maxWidth !== false && classes["maxWidth".concat((0, _capitalize.default)(String(maxWidth)))]),
    ref: ref
  }, other));
});

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiContainer'
})(Container);

exports.default = _default;
});

var Container = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _Container.default;
  }
});

var _Container = interopRequireDefault(Container_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(Container);

export default __pika_web_default_export_for_treeshaking__;
