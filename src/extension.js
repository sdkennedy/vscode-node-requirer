import {languages, commands} from 'vscode';
import ImportCompletionItemProvider from './features/import-completion-item-provider';
import openCompletionCommand from './features/open-completion-command';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    console.log('Activated "node-requirer"');

    context.subscriptions.push(
        languages.registerCompletionItemProvider(
            '*',
            new ImportCompletionItemProvider(),
            ['import']
        )
    );
    context.subscriptions.push(
        commands.registerCommand(
            'extension.openCompletion',
            openCompletionCommand
        )
    )
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;