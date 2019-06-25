"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var useState = React.useState;
var noop = function () { };
var useHover = function (elemnt) {
    var _a = useState(false), state = _a[0], setState = _a[1];
    var onMouseEnter = function (originalOnMouseEnter) { return function (event) {
        (originalOnMouseEnter || noop)(event);
        setState(true);
    }; };
    var onMouseLeave = function (originalOnMouseLeave) { return function (event) {
        (originalOnMouseLeave || noop)(event);
        setState(false);
    }; };
    if (typeof elemnt === 'function') {
        elemnt = elemnt(state);
    }
    var hoverd = React.cloneElement(elemnt, {
        onMouseEnter: onMouseEnter(elemnt.props.onMouseEnter),
        onMouseLeave: onMouseLeave(elemnt.props.onMouseLeave)
    });
    return [hoverd, state];
};
exports.default = useHover;
