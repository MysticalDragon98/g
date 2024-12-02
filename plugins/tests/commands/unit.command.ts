import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { ok } from "assert";
import { writeFile } from "fs/promises";
import { readFile } from "fs/promises";
import parseFileImports from "../../../lib/modules/parsers/parseFileImports";
import { ComponentType } from "../../../lib/enum/ComponentType.enum";
//* Imports

export default async function unitCommand (project: Project, [ filePath ]: string[], options: any) {
    ok(filePath, "Usage: g tests:unit <file-path>");

    const path = join("__tests__", "unit", filePath).replace(".ts", ".test.ts");
    const fileName = filePath.split("/").pop().replace(".ts", "");
    const fullFilePath = project.subPath(filePath);
    const containerFolder = path.split("/").slice(0, -1).join("/");
    const folderDepth = path.split("/").length - 1;
    const baseImportRoot = "../".repeat(folderDepth);
    const file = await readFile(fullFilePath, "utf-8");

    const imports = parseFileImports(filePath, file);

    // console.log(JSON.stringify(imports.map(import_ => ({
    //     ...import_,
    //     isFunction: import_.meta.type === ComponentType.Function
    // })), null, 2));

    await project.ensureDir(containerFolder);
    await project.generateFileFromTemplate("tests:unit.ts", path, {
        name: fileName,
        sourcePath: filePath,
        imports: imports.map(import_ => ({
            ...import_,
            meta: {
                ...import_.meta,
                path: import_.meta?.path.replace(".ts", "")
            },
            isFunction: import_.meta?.type === ComponentType.Function
        })),
        importsRoot: baseImportRoot ?? "./"
    });
    await project.vscodeOpen(path);
}