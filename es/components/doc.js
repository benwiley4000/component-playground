var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

var propTypesArray = [{
  key: "array",
  test: PropTypes.array,
  isRequired: PropTypes.array.isRequired
}, {
  key: "boolean",
  test: PropTypes.bool,
  isRequired: PropTypes.bool.isRequired
}, {
  key: "function",
  test: PropTypes.func,
  isRequired: PropTypes.func.isRequired
}, {
  key: "number",
  test: PropTypes.number,
  isRequired: PropTypes.number.isRequired
}, {
  key: "object",
  test: PropTypes.object,
  isRequired: PropTypes.array.isRequired
}, {
  key: "string",
  test: PropTypes.string,
  isRequired: PropTypes.string.isRequired
}, {
  key: "node",
  test: PropTypes.node,
  isRequired: PropTypes.node.isRequired
}, {
  key: "element",
  test: PropTypes.element,
  isRequired: PropTypes.element.isRequired
}];

var getReactPropType = function getReactPropType(propTypeFunc) {
  var name = "custom";
  var isRequired = false;

  propTypesArray.some(function (propType) {
    if (propTypeFunc === propType.test) {
      name = propType.key;
      return true;
    }
    if (propTypeFunc === propType.isRequired) {
      name = propType.key;
      isRequired = true;
      return true;
    }
    return false;
  });
  return { name: name, isRequired: isRequired };
};

var Doc = function (_Component) {
  _inherits(Doc, _Component);

  function Doc() {
    _classCallCheck(this, Doc);

    return _possibleConstructorReturn(this, (Doc.__proto__ || Object.getPrototypeOf(Doc)).apply(this, arguments));
  }

  _createClass(Doc, [{
    key: "render",
    value: function render() {

      var propTypes = [];
      var _props = this.props,
          componentClass = _props.componentClass,
          ignore = _props.ignore,
          propDescriptionMap = _props.propDescriptionMap;

      for (var propName in componentClass.propTypes) {
        if (ignore.indexOf(propName)) {
          propTypes.push({
            propName: propName,
            type: getReactPropType(componentClass.propTypes[propName]),
            description: propDescriptionMap[propName] || ""
          });
        }
      }

      return React.createElement(
        "div",
        { className: "playgroundDocs" },
        React.createElement(
          "ul",
          null,
          propTypes.map(function (propObj) {
            return React.createElement(
              "li",
              { key: propObj.propName },
              React.createElement(
                "b",
                null,
                propObj.propName + ": "
              ),
              React.createElement(
                "i",
                null,
                propObj.type.name
              ),
              propObj.description && " - " + propObj.description,
              React.createElement(
                "b",
                null,
                "" + (propObj.type.isRequired ? " required" : "")
              )
            );
          })
        )
      );
    }
  }]);

  return Doc;
}(Component);

Doc.defaultProps = {
  propDescriptionMap: {},
  ignore: []
};
Doc.propTypes = {
  componentClass: PropTypes.func,
  ignore: PropTypes.array,
  propDescriptionMap: PropTypes.object
};


export default Doc;