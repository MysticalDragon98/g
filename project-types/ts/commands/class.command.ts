import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import { FilePath } from "../../../lib/types/FilePath.type";
import { log } from "termx";
//* Imports

export default async function classCommand (project: Project, args: string[], options: any) {
    let className: string;
    let folderPath: FilePath;
    let classPath: FilePath;

    if (options.folder) {
        [ className ] = args;

        $ok(className, "Usage: g class --folder folder <class-name>");
        folderPath = options.folder;
        classPath = join(folderPath, `${className}.ts`) as FilePath;
    } else {
        [ className ] = args;

        classPath = join("lib/classes", `${className}.class.ts`) as FilePath;

        $ok(className, "Usage: g class <class-name>");
    }

    await project.generateFileFromTemplate("class.ts", classPath, {
        name: className
    });

    await project.vscodeOpen(classPath);
    
    log(`Successfully created class ${className} at ${classPath}.`);
}