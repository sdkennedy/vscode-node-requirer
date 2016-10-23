'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getPackageDirPath = getPackageDirPath;
exports.toCompletionItem = toCompletionItem;

var _fs = require('mz/fs');

var _path = require('path');

var _vscode = require('vscode');

var _finders = require('./finders');

var _finders2 = _interopRequireDefault(_finders);

var _es = require('./formatters/es6');

var _es2 = _interopRequireDefault(_es);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function packageExists(dirPath) {
    return (0, _fs.stat)((0, _path.join)(dirPath, 'package.json'));
}

function getPackageDirPath(dirPath) {
    return packageExists(dirPath).then(function () {
        return dirPath;
    }, function () {
        var parentDirPath = (0, _path.join)(dirPath, '..');
        var hasParentDirPath = parentDirPath !== dirPath;
        return hasParentDirPath ? getPackageDirPath(parentDirPath) : null;
    });
}

function toCompletionItem(path) {
    var maxLen = 90;
    var completionItem = new _vscode.CompletionItem(path.length > maxLen ? '...' + path.substr(-1 * (maxLen - 3)) : path);
    completionItem.insertText = (0, _es2.default)(path);
    return completionItem;
}

var ImportCompletionItemProvider = function () {
    function ImportCompletionItemProvider() {
        _classCallCheck(this, ImportCompletionItemProvider);
    }

    _createClass(ImportCompletionItemProvider, [{
        key: 'provideCompletionItems',
        value: function provideCompletionItems(document, position, token) {
            var fileName = document.fileName;

            if (!fileName) {
                return [];
            }
            var dirPath = (0, _path.dirname)(fileName);
            return getPackageDirPath(dirPath).then(function (path) {
                return path ? (0, _finders2.default)(path, fileName) : [];
            }).then(function (files) {
                return files.map(toCompletionItem);
            });
        }
    }]);

    return ImportCompletionItemProvider;
}();

exports.default = ImportCompletionItemProvider;
//# sourceMappingURL=index.js.map