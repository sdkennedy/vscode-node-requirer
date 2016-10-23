'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getLocalFiles;

var _path = require('path');

var _directoryFiles = require('./directory-files');

var _directoryFiles2 = _interopRequireDefault(_directoryFiles);

var _util = require('../../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toRelativePath(dirPath, file) {
    var relativePath = (0, _path.relative)(dirPath, file);
    if (relativePath.startsWith('../')) {
        return relativePath;
    } else {
        return './' + relativePath;
    }
}

function getLocalFiles(packageDirPath, fileName) {
    var dirPath = (0, _path.dirname)(fileName);
    return (0, _directoryFiles2.default)(packageDirPath).then(function (files) {
        var result = files.map((0, _util.bind)(toRelativePath, dirPath));
        return result;
    });
}
//# sourceMappingURL=local-files.js.map