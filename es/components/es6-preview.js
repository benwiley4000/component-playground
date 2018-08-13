var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint new-cap:0 no-unused-vars:0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { render, unmountComponentAtNode } from "react-dom";
import { transform } from "babel-standalone";

var getType = function getType(el) {
  var t = typeof el === "undefined" ? "undefined" : _typeof(el);

  if (Array.isArray(el)) {
    t = "array";
  } else if (el === null) {
    t = "null";
  }

  return t;
};

var wrapMap = {
  wrapnumber: function wrapnumber(num) {
    return React.createElement(
      "span",
      { style: { color: "#6170d5" } },
      num
    );
  },
  wrapstring: function wrapstring(str) {
    return React.createElement(
      "span",
      { style: { color: "#F2777A" } },
      "'" + str + "'"
    );
  },
  wrapboolean: function wrapboolean(bool) {
    return React.createElement(
      "span",
      { style: { color: "#48A1CF" } },
      bool ? "true" : "false"
    );
  },
  wraparray: function wraparray(arr) {
    return React.createElement(
      "span",
      null,
      "[",
      arr.map(function (entry, i) {
        return React.createElement(
          "span",
          { key: i },
          wrapMap["wrap" + getType(entry)](entry),
          i !== arr.length - 1 ? ", " : ""
        );
      }),
      "]"
    );
  },
  wrapobject: function wrapobject(obj) {
    var pairs = [];
    var first = true;

    for (var key in obj) {
      pairs.push(React.createElement(
        "span",
        { key: key },
        React.createElement(
          "span",
          { style: { color: "#8A6BA1" } },
          (first ? "" : ", ") + key
        ),
        ": ",
        wrapMap["wrap" + getType(obj[key])](obj[key])
      ));

      first = false;
    }

    return React.createElement(
      "i",
      null,
      "Object {",
      pairs,
      "}"
    );
  },
  wrapfunction: function wrapfunction() {
    return React.createElement(
      "i",
      { style: { color: "#48A1CF" } },
      "function"
    );
  },
  wrapnull: function wrapnull() {
    return React.createElement(
      "span",
      { style: { color: "#777" } },
      "null"
    );
  },
  wrapundefined: function wrapundefined() {
    return React.createElement(
      "span",
      { style: { color: "#777" } },
      "undefined"
    );
  }
};

var EsPreview = function (_Component) {
  _inherits(EsPreview, _Component);

  function EsPreview() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EsPreview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EsPreview.__proto__ || Object.getPrototypeOf(EsPreview)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EsPreview, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", { ref: function ref(c) {
          _this2.mount = c;
        } });
    }
  }]);

  return EsPreview;
}(Component);

EsPreview.propTypes = {
  code: PropTypes.string.isRequired,
  scope: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._compileCode = function () {
    var _props = _this3.props,
        code = _props.code,
        scope = _props.scope;

    return transform("\n      ((" + Object.keys(scope).join(",") + ") => {\n        var list = [];\n        var console = { log(...x) {\n          list.push({val: x, multipleArgs: x.length !== 1})\n        }};\n        " + code + "\n        return list;\n      });\n    ", { presets: ["es2015", "react", "stage-1"] }).code;
  };

  this._setTimeout = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    clearTimeout(_this3.timeoutID); //eslint-disable-line
    _this3.timeoutID = setTimeout.apply(null, args); //eslint-disable-line
  };

  this._executeCode = function () {
    var mountNode = _this3.mount;

    try {
      unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e); //eslint-disable-line
    }

    try {
      var scope = _this3.props.scope;

      var tempScope = [];
      Object.keys(scope).forEach(function (s) {
        return tempScope.push(scope[s]);
      });
      tempScope.push(mountNode);
      var compiledCode = _this3._compileCode();

      var Comp = function (_Component2) {
        _inherits(Comp, _Component2);

        function Comp() {
          var _ref2;

          var _temp2, _this4, _ret2;

          _classCallCheck(this, Comp);

          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref2 = Comp.__proto__ || Object.getPrototypeOf(Comp)).call.apply(_ref2, [this].concat(args))), _this4), _this4._createConsoleLine = function (_ref3) {
            var val = _ref3.val,
                multipleArgs = _ref3.multipleArgs;
            return React.createElement(
              "span",
              { style: { marginRight: "20px" } },
              multipleArgs ? val.map(function (y) {
                return _this4._createConsoleLine([y], false);
              }) : wrapMap["wrap" + getType(val[0])](val[0])
            );
          }, _temp2), _possibleConstructorReturn(_this4, _ret2);
        }

        _createClass(Comp, [{
          key: "render",
          value: function render() {
            var _this5 = this;

            return React.createElement(
              "div",
              { style: { padding: 15, fontFamily: "Consolas, Courier, monospace" } },
              eval(compiledCode).apply(null, tempScope).map(function (x, i) {
                return (//eslint-disable-line
                  React.createElement(
                    "div",
                    {
                      key: i,
                      style: {
                        borderBottom: "1px solid #ccc",
                        padding: "4px 0"
                      }
                    },
                    _this5._createConsoleLine(x)
                  )
                );
              })
            );
          }
        }]);

        return Comp;
      }(Component);

      render(React.createElement(Comp, null), mountNode);
      _this3.props.onError(null);
    } catch (err) {
      _this3.props.onError(err);
      _this3._setTimeout(function () {
        render(React.createElement(
          "div",
          { className: "playgroundError" },
          err.toString()
        ), mountNode);
      }, 500);
    }
  };

  this.componentDidMount = function () {
    _this3._executeCode();
  };

  this.componentDidUpdate = function (prevProps) {
    clearTimeout(_this3.timeoutID); //eslint-disable-line
    if (_this3.props.code !== prevProps.code) {
      _this3._executeCode();
    }
  };
};

export default EsPreview;