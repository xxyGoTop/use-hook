"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useTimeout = function (ms) {
    var _a = react_1.useState(false), status = _a[0], setStatus = _a[1];
    react_1.useEffect(function () {
        var timer = setTimeout(function () {
            setStatus(true);
        }, ms);
        return function () {
            clearTimeout(timer);
        };
    }, [ms]);
    return status;
};
exports.default = useTimeout;
