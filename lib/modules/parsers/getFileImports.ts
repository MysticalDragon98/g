const IMPORT_REGEX = /import\s+([a-zA-Z0-9_{}\s,]+)\s+from\s+['"]([^'"]+)['"];?/g;

export default function getFileImports (content: string) {
    const matches = content.matchAll(IMPORT_REGEX);
    const imports: { imports: string, path: string }[] = [];

    for (const match of matches) {
        imports.push({
            imports: match[1],
            path: match[2]
        });
    }

    return imports;
}