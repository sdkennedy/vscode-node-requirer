'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getDirectoryFiles;

var _fs = require('mz/fs');

var _path = require('path');

var _util = require('../../../util');

function findFiles(path) {
    // Skip hidden files
    if (path[0] === '.') {
        return Promise.resolve([]);
    }
    return (0, _fs.stat)(path).then(function (stats) {
        if (stats.isFile()) {
            return path.endsWith('.js') ? [path] : [];
        } else if (stats.isDirectory()) {
            return getDirectoryFiles(path);
        } else {
            return [];
        }
    });
}

var isValidFile = function isValidFile(file) {
    return file !== 'node_modules' && file[0] !== '.';
};

function getDirectoryFiles(dirPath) {
    return (0, _fs.readdir)(dirPath).then(function (files) {
        var promises = files.filter(isValidFile).map(function (file) {
            return (0, _path.join)(dirPath, file);
        }).map(findFiles);
        return Promise.all(promises).then(_util.flatten);
    });
}
//# sourceMappingURL=directory-files.js.map