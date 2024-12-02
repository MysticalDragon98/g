import getFileImports from "./getFileImports";
import getImportPathMeta from "./getImportPathMeta";

export default function parseFileImports (filePath: string, content: string) {
    const imports = getFileImports(content);
    
    return imports.map(({ imports, path }) => ({
        imports,
        path,
        meta: getImportPathMeta(filePath,path)
    }));
}