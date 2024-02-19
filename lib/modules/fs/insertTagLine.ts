//* Imports

import { FilePath } from "../../types/FilePath.type";
import transformFile from "./transformFile";

export default async function insertTagLine (path: FilePath, tag: string, line: string, { extension = "ts" } = {}) {
    if (extension === "ts") return await transformFile(path, (buf: Buffer) => {
        const content = buf.toString("utf-8");
        const lines = content.split("\n");
        const newLines = [];

        for (const _line of lines) {
            if (_line.trim() === `//* ${tag}`) {
                const indent = _line.match(/^\s*/)[0];
                const replace = indent + [line, `//* ${tag}`].join(`\n${indent}`);
        
                newLines.push(replace);
                continue;
            }
            
            newLines.push(_line);
        }

        return newLines.join('\n');        
    });

    if (extension === "html") return await transformFile(path, (buf: Buffer) => {
        const content = buf.toString("utf-8");
        const lines = content.split("\n");
        const newLines = [];

        for (const _line of lines) {
            if (_line.trim() === `<!-- ${tag} -->`) {
                const indent = _line.match(/^\s*/)[0];
                const replace = indent + [line, `<!-- ${tag} -->`].join(`\n${indent}`);
        
                newLines.push(replace);
                continue;
            }
            
            newLines.push(_line);
        }

        return newLines.join('\n');        
    });
}