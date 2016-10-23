'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getPackageDependancyFiles;

var _fs = require('mz/fs');

var _path = require('path');

var _directoryFiles = require('./directory-files');

var _directoryFiles2 = _interopRequireDefault(_directoryFiles);

var _util = require('../../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDependancies(packageDirPath) {
    var packagePath = (0, _path.join)(packageDirPath, 'package.json');
    return (0, _fs.readFile)(packagePath)
    // To package object
    .then(JSON.parse)
    // Account for missing or invalid package.json
    .catch(function () {
        return {};
    }).then(function () {
        var pkg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var _pkg$dependencies = pkg.dependencies;
        var dependencies = _pkg$dependencies === undefined ? {} : _pkg$dependencies;
        var _pkg$devDependencies = pkg.devDependencies;
        var devDependencies = _pkg$devDependencies === undefined ? {} : _pkg$devDependencies;
        var _pkg$optionalDependen = pkg.optionalDependencies;
        var optionalDependencies = _pkg$optionalDependen === undefined ? {} : _pkg$optionalDependen;
        // Return set of all dependancy names

        return Object.keys(Object.assign({}, devDependencies, dependencies, optionalDependencies));
    });
}

var isNotIndexFile = function isNotIndexFile(path) {
    return (0, _path.basename)(path) !== 'index.js';
};
function getDependancyFiles(rootPath) {
    return (0, _directoryFiles2.default)(rootPath).catch(function () {
        return [];
    }).then(function (files) {
        return files.filter(isNotIndexFile).concat(rootPath);
    });
}

function getPackageDependancyFiles(packageDirPath) {
    var modulesPath = (0, _path.join)(packageDirPath, 'node_modules');
    var joinPackage = function joinPackage(path) {
        return (0, _path.join)(modulesPath, path);
    };
    return getDependancies(packageDirPath).then(function (dependencies) {
        return dependencies.map(joinPackage);
    }).then(function (paths) {
        return Promise.all(paths.map(getDependancyFiles));
    }).then(_util.flatten).then(function (files) {
        return files.map(function (file) {
            return (0, _path.relative)(modulesPath, file);
        });
    });
}
//# sourceMappingURL=package-dependancies.js.map