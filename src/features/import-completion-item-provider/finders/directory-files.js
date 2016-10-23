import {stat, readdir} from 'mz/fs';
import {join, relative} from 'path';
import {flatten} from '../../../util';


function findFiles(path) {
    // Skip hidden files
    if (path[0] === '.') {
        return Promise.resolve([]);
    }
    return stat(path).then(
        stats => {
            if (stats.isFile()) {
                return path.endsWith('.js') ? [path] : [];
            } else if (stats.isDirectory()) {
                return getDirectoryFiles(path);
            } else {
                return [];
            }
        }
    );
}

const isValidFile = file => file !== 'node_modules' && file[0] !== '.';

export default function getDirectoryFiles(dirPath) {
    return readdir(dirPath).then(
        files => {
            const promises = files
                .filter(isValidFile)
                .map(file => join(dirPath, file))
                .map(findFiles);
            return Promise.all(promises)
                .then(flatten);
        }
    );
}