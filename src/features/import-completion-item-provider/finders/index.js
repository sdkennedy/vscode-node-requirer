import getLocalFiles from './local-files';
import getPackageDependancyFiles from './package-dependancies';
import {flatten} from '../../../util';

export const finders = [
    getLocalFiles,
    getPackageDependancyFiles
];

export default function getFiles(packageDir, fileName) {
    const promises = finders.map(finder => finder(packageDir, fileName));
    return Promise.all(promises).then(flatten);
}