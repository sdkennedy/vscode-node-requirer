export function bind(fn, ...args) {
    return fn.bind(null, ...args);
};
export function flatten(arrays) {
    return [].concat.apply([], arrays);
}
export function flattenReducer(acc, array) {
    return acc.concat(array);
}