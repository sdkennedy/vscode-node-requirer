import {parse, extname} from 'path';
import {pascal} from 'Case'

export default function toEs6Import(path) {
    const {name} = parse(path);
    const pathWithExt = path.substr(0, path.length - extname(path).length);
    return `import ${pascal(name)} from '${pathWithExt}'`;
}
