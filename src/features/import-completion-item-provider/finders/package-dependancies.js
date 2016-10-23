import {readFile} from 'mz/fs';
import {basename, join, relative} from 'path';
import getDirectoryFiles from './directory-files';
import {bind as $, flatten} from '../../../util';

function getDependancies(packageDirPath) {
    const packagePath = join(packageDirPath, 'package.json');
    return readFile(packagePath)
        // To package object
        .then(JSON.parse)
        // Account for missing or invalid package.json
        .catch(() => ({}))
        .then((pkg = {}) => {
            const {
                dependencies = {},
                devDependencies = {},
                optionalDependencies = {}
            } = pkg;
            // Return set of all dependancy names
            return Object.keys(
                Object.assign(
                    {},
                    devDependencies,
                    dependencies,
                    optionalDependencies
                )
            );
        });
}

const isNotIndexFile = path => basename(path) !== 'index.js';
function getDependancyFiles(rootPath) {
    return getDirectoryFiles(rootPath)
        .catch(() => [])
        .then(files => files
            .filter(isNotIndexFile)
            .concat(rootPath)
        );
}

export default function getPackageDependancyFiles(packageDirPath) {
    const modulesPath = join(packageDirPath, 'node_modules');
    const joinPackage = path => join(modulesPath, path);
    return getDependancies(packageDirPath)
        .then(dependencies => dependencies.map(joinPackage))
        .then(paths => Promise.all(
            paths.map(getDependancyFiles)
        ))
        .then(flatten)
        .then(files => files.map(
            file => relative(modulesPath, file)
        ));
}