var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-unused-vars:0 */
import "babel-polyfill";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Editor from "./editor";
import Preview from "./preview";
import EsPreview from "./es6-preview";
import Doc from "./doc";

// TODO: refactor to remove componentWillReceiveProps
// eslint-disable-next-line react/no-deprecated

var ReactPlayground = function (_Component) {
  _inherits(ReactPlayground, _Component);

  function ReactPlayground() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactPlayground);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactPlayground.__proto__ || Object.getPrototypeOf(ReactPlayground)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      code: _this.props.codeText,
      expandedCode: _this.props.initiallyExpanded,
      external: true
    }, _this.componentWillReceiveProps = function (nextProps) {
      _this.setState({
        code: nextProps.codeText,
        external: true
      });
    }, _this.componentDidUpdate = function (prevProps, prevState) {
      if (_this.state.code !== prevState.code && _this.props.onUpdate) {
        _this.props.onUpdate({
          code: _this.state.code,
          evalError: _this.previewError
        });
      }
    }, _this._handleCodeChange = function (code) {
      _this.setState({
        code: code,
        external: false
      });
    }, _this._handlePreviewError = function (error) {
      // error may be an error object, or null (if there was no problem).
      // this callback is expected to run before componentDidUpdate.
      _this.previewError = error;
    }, _this._toggleCode = function () {
      _this.setState({
        expandedCode: !_this.state.expandedCode
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactPlayground, [{
    key: "render",
    value: function render() {
      var _state = this.state,
          code = _state.code,
          external = _state.external,
          expandedCode = _state.expandedCode;
      var _props = this.props,
          codeText = _props.codeText,
          collapsableCode = _props.collapsableCode,
          context = _props.context,
          docClass = _props.docClass,
          es6Console = _props.es6Console,
          noRender = _props.noRender,
          previewComponent = _props.previewComponent,
          propDescriptionMap = _props.propDescriptionMap,
          scope = _props.scope,
          selectedLines = _props.selectedLines,
          theme = _props.theme;


      return React.createElement(
        "div",
        { className: "playground" + (collapsableCode ? " collapsableCode" : "") },
        docClass ? React.createElement(Doc, {
          componentClass: docClass,
          propDescriptionMap: propDescriptionMap
        }) : null,
        React.createElement(
          "div",
          { className: "playgroundCode" + (expandedCode ? " expandedCode" : "") },
          React.createElement(Editor, {
            className: "playgroundStage",
            codeText: codeText,
            external: external,
            onChange: this._handleCodeChange,
            selectedLines: selectedLines,
            theme: theme
          })
        ),
        collapsableCode ? React.createElement(
          "div",
          { className: "playgroundToggleCodeBar" },
          React.createElement(
            "span",
            { className: "playgroundToggleCodeLink", onClick: this._toggleCode },
            expandedCode ? "collapse" : "expand"
          )
        ) : null,
        React.createElement(
          "div",
          { className: "playgroundPreview" },
          es6Console ? React.createElement(EsPreview, {
            code: code,
            scope: scope,
            onError: this._handlePreviewError
          }) : React.createElement(Preview, {
            context: context,
            code: code,
            scope: scope,
            noRender: noRender,
            previewComponent: previewComponent,
            onError: this._handlePreviewError
          })
        )
      );
    }
  }]);

  return ReactPlayground;
}(Component);

ReactPlayground.defaultProps = {
  theme: "monokai",
  noRender: true,
  context: {},
  initiallyExpanded: false
};
ReactPlayground.propTypes = {
  codeText: PropTypes.string.isRequired,
  scope: PropTypes.object.isRequired,
  collapsableCode: PropTypes.bool,
  docClass: PropTypes.func,
  propDescriptionMap: PropTypes.object,
  theme: PropTypes.string,
  selectedLines: PropTypes.array,
  noRender: PropTypes.bool,
  es6Console: PropTypes.bool,
  context: PropTypes.object,
  initiallyExpanded: PropTypes.bool,
  previewComponent: PropTypes.node,
  onUpdate: PropTypes.func
};


export default ReactPlayground;