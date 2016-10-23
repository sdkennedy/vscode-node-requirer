'use strict';

var _vscode = require('vscode');

var _importCompletionItemProvider = require('./features/import-completion-item-provider');

var _importCompletionItemProvider2 = _interopRequireDefault(_importCompletionItemProvider);

var _openCompletionCommand = require('./features/open-completion-command');

var _openCompletionCommand2 = _interopRequireDefault(_openCompletionCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    console.log('Activated "node-requirer"');

    context.subscriptions.push(_vscode.languages.registerCompletionItemProvider('*', new _importCompletionItemProvider2.default(), ['import']));
    context.subscriptions.push(_vscode.commands.registerCommand('extension.openCompletion', _openCompletionCommand2.default));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map