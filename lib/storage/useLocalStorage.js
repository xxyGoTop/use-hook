"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLocalStorage = function (key, initialValue, isSerial) {
    var _a = react_1.useState(function () {
        try {
            var storageValue = localStorage.getItem(key);
            if (typeof storageValue !== 'string') {
                localStorage.setItem(key, isSerial ? String(initialValue) : JSON.stringify(initialValue));
                return initialValue;
            }
            else {
                return isSerial ? storageValue : JSON.parse(storageValue || 'null');
            }
        }
        catch (_a) {
            console.error('init storage value error');
            return initialValue;
        }
    }), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        try {
            localStorage.setItem(key, isSerial ? String(state) : JSON.stringify(state));
        }
        catch (_a) {
            console.error('set storage value error');
        }
    });
    return [state, setState];
};
exports.default = useLocalStorage;
