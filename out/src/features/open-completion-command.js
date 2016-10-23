'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = openCompletionCommand;

var _vscode = require('vscode');

var _importCompletionItemProvider = require('./import-completion-item-provider');

var _importCompletionItemProvider2 = _interopRequireDefault(_importCompletionItemProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function openCompletionCommand() {
    var _window$activeTextEdi = _vscode.window.activeTextEditor;
    var activeTextEditor = _window$activeTextEdi === undefined ? {} : _window$activeTextEdi;
    var document = activeTextEditor.document;
    var _activeTextEditor$sel = activeTextEditor.selection;
    _activeTextEditor$sel = _activeTextEditor$sel === undefined ? {} : _activeTextEditor$sel;
    var position = _activeTextEditor$sel.active;

    if (document && position) {
        var provider = new _importCompletionItemProvider2.default();
        _vscode.window.showQuickPick(provider.provideCompletionItems(document, position), { placeHolder: 'Select node module' }).then(function (result) {
            if (result) {
                activeTextEditor.edit(function (editBuilder) {
                    return editBuilder.insert(position, result.insertText);
                });
            }
        });
    }
}
//# sourceMappingURL=open-completion-command.js.map