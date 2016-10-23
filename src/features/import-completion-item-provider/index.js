import {stat} from 'mz/fs';
import {dirname, join} from 'path';
import {CompletionItem} from 'vscode';
import getFiles from './finders';
import toEs6Import from './formatters/es6';

function packageExists(dirPath) {
    return stat(
        join(dirPath, 'package.json')
    );
}

export function getPackageDirPath(dirPath) {
    return packageExists(dirPath).then(
        () => dirPath,
        () => {
            const parentDirPath = join(dirPath, '..');
            const hasParentDirPath = parentDirPath !== dirPath;
            return hasParentDirPath ? getPackageDirPath(parentDirPath) : null;
        }
    )
}

export function toCompletionItem(path) {
    const maxLen = 90;
    const completionItem = new CompletionItem(
        path.length > maxLen ? `...${path.substr(-1 * (maxLen - 3))}` : path
    );
    completionItem.insertText = toEs6Import(path);
    return completionItem;
}

export default class ImportCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        const {fileName} = document;
        if (!fileName) {
            return [];
        }
        const dirPath = dirname(fileName);
        return getPackageDirPath(dirPath)
            .then(path => path ? getFiles(path, fileName) : [])
            .then(files => files.map(toCompletionItem));
    }
}