'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.finders = undefined;
exports.default = getFiles;

var _localFiles = require('./local-files');

var _localFiles2 = _interopRequireDefault(_localFiles);

var _packageDependancies = require('./package-dependancies');

var _packageDependancies2 = _interopRequireDefault(_packageDependancies);

var _util = require('../../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var finders = exports.finders = [_localFiles2.default, _packageDependancies2.default];

function getFiles(packageDir, fileName) {
    var promises = finders.map(function (finder) {
        return finder(packageDir, fileName);
    });
    return Promise.all(promises).then(_util.flatten);
}
//# sourceMappingURL=index.js.map