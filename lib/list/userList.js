"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useList = function (initList) {
    if (initList === void 0) { initList = []; }
    var _a = react_1.useState(initList), list = _a[0], set = _a[1];
    return [
        list,
        {
            set: set,
            clear: function () { return set([]); },
            push: function (item) { return set(function (currentList) { return currentList.concat([item]); }); },
            remove: function (index) { return set(function (currentList) { return currentList.slice(0, index).concat(currentList.slice(index)); }); },
            filter: function (fn) { return set(function (currentList) { return currentList.filter(fn); }); },
            sort: function (fn) { return set(function (currentList) { return currentList.slice().sort(fn); }); },
            updateIndex: function (index, item) {
                return set(function (currentList) { return currentList.slice(0, index).concat([item], currentList.slice(index)); });
            },
        }
    ];
};
exports.default = useList;
