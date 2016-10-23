import {window} from 'vscode';
import ImportCompletionItemProvider from './import-completion-item-provider';


export default function openCompletionCommand() {
    const {
        activeTextEditor = {}
    } = window;
    const {
        document,
        selection: {
            active: position
        } = {}
    } = activeTextEditor;
    if (document && position) {
        const provider = new ImportCompletionItemProvider();
        window.showQuickPick(
            provider.provideCompletionItems(document, position),
            {placeHolder: 'Select node module'}
        ).then(result => {
            if (result) {
                activeTextEditor.edit(
                    editBuilder => editBuilder.insert(position, result.insertText) 
                )
            }
        });
        
    }
}