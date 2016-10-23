import {dirname, join, relative} from 'path';
import getDirectoryFiles from './directory-files';
import {bind as $} from '../../../util';

function toRelativePath(dirPath, file) {
    const relativePath = relative(dirPath, file);
    if (relativePath.startsWith('../')) {
        return relativePath;
    } else {
        return `./${relativePath}`;
    }
}

export default function getLocalFiles(packageDirPath, fileName) {
    const dirPath = dirname(fileName);
    return getDirectoryFiles(packageDirPath)
        .then(files => {
            const result = files.map($(toRelativePath, dirPath));
            return result;
        });
}