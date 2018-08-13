var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable max-statements */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import ReactDOMServer from "react-dom/server";
import { transform } from "babel-standalone";

var Preview = function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Preview.__proto__ || Object.getPrototypeOf(Preview)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      error: null
    }, _this._compileCode = function () {
      var _this$props = _this.props,
          code = _this$props.code,
          context = _this$props.context,
          noRender = _this$props.noRender,
          scope = _this$props.scope;

      var generateContextTypes = function generateContextTypes(c) {
        return "{ " + Object.keys(c).map(function (val) {
          return val + ": PropTypes.any.isRequired";
        }).join(", ") + " }";
      };

      var scopeWithProps = _extends({}, scope, { PropTypes: PropTypes });

      if (noRender) {
        return transform("\n        ((" + Object.keys(scopeWithProps).join(", ") + ", mountNode) => {\n          class Comp extends React.Component {\n\n            getChildContext() {\n              return " + JSON.stringify(context) + ";\n            }\n\n            render() {\n              return (\n                " + code + "\n              );\n            }\n          }\n\n          Comp.childContextTypes = " + generateContextTypes(context) + ";\n\n          return Comp;\n        });\n      ", { presets: ["es2015", "react", "stage-1"] }).code;
      } else {
        return transform("\n        ((" + Object.keys(scopeWithProps).join(",") + ", mountNode) => {\n          " + code + "\n        });\n      ", { presets: ["es2015", "react", "stage-1"] }).code;
      }
    }, _this._executeCode = function () {
      var mountNode = _this.mount;
      var _this$props2 = _this.props,
          scope = _this$props2.scope,
          noRender = _this$props2.noRender,
          previewComponent = _this$props2.previewComponent;


      var scopeWithProps = _extends({}, scope, { PropTypes: PropTypes });

      var tempScope = [];

      try {
        Object.keys(scopeWithProps).forEach(function (s) {
          return tempScope.push(scopeWithProps[s]);
        });
        tempScope.push(mountNode);
        var compiledCode = _this._compileCode();
        if (noRender) {
          /* eslint-disable no-eval, max-len */
          var Comp = React.createElement(eval(compiledCode).apply(undefined, tempScope));
          ReactDOMServer.renderToString(React.createElement(previewComponent, {}, Comp));
          render(React.createElement(previewComponent, {}, Comp), mountNode);
        } else {
          eval(compiledCode).apply(undefined, tempScope);
        }
        /* eslint-enable no-eval, max-len */
        clearTimeout(_this.timeoutID);
        _this.props.onError(null);
        _this.setState({ error: null });
      } catch (err) {
        var error = err.toString();
        clearTimeout(_this.timeoutID); //eslint-disable-line no-undef
        _this.props.onError(err);
        _this.timeoutID = setTimeout(function () {
          _this.setState({ error: error });
        }, 500);
      }
    }, _this.componentDidMount = function () {
      _this._executeCode();
    }, _this.componentDidUpdate = function (prevProps) {
      if (_this.props.code !== prevProps.code) {
        _this._executeCode();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Preview, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var error = this.state.error;

      return React.createElement(
        "div",
        null,
        error !== null ? React.createElement(
          "div",
          { className: "playgroundError" },
          error
        ) : null,
        React.createElement("div", { ref: function ref(c) {
            _this2.mount = c;
          }, className: "previewArea" })
      );
    }
  }]);

  return Preview;
}(Component);

Preview.defaultProps = {
  previewComponent: "div"
};
Preview.propTypes = {
  code: PropTypes.string.isRequired,
  scope: PropTypes.object.isRequired,
  previewComponent: PropTypes.node,
  noRender: PropTypes.bool,
  onError: PropTypes.func.isRequired,
  context: PropTypes.object
};


export default Preview;