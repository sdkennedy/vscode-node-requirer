"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bind = bind;
exports.flatten = flatten;
exports.flattenReducer = flattenReducer;
function bind(fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return fn.bind.apply(fn, [null].concat(args));
};
function flatten(arrays) {
    return [].concat.apply([], arrays);
}
function flattenReducer(acc, array) {
    return acc.concat(array);
}
//# sourceMappingURL=util.js.map