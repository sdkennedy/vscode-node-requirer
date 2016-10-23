'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPackageDirPath = getPackageDirPath;
function packageExists(dirPath) {
    return stat(join(dirPath, 'package.json'));
}

function getPackageDirPath(dirPath) {
    return packageExists(dirPath).then(function () {
        return dirPath;
    }, function () {
        var parentDirPath = join(dirPath, '..');
        var hasParentDirPath = parentDirPath !== dirPath;
        return hasParentDirPath ? getPackageDirPath(parentDirPath) : null;
    });
}
//# sourceMappingURL=util.js.map