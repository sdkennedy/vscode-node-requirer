'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = toEs6Import;

var _path = require('path');

var _Case = require('Case');

function toEs6Import(path) {
    var _parse = (0, _path.parse)(path);

    var name = _parse.name;

    var pathWithExt = path.substr(0, path.length - (0, _path.extname)(path).length);
    return 'import ' + (0, _Case.pascal)(name) + ' from \'' + pathWithExt + '\'';
}
//# sourceMappingURL=es6.js.map