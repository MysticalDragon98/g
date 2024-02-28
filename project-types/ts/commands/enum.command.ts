import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { FilePath } from "../../../lib/types/FilePath.type";
import { $ok } from "../../../lib/exceptions";
import { log } from "termx";
//* Imports

export default async function enumCommand (project: Project, args: string[], options: any) {
    let enumName: string;
    let folderPath: FilePath;
    let enumPath: FilePath;

    if (options.folder) {
        [ enumName ] = args;

        $ok(enumName, "Usage: g enum --folder folder <name>");
        folderPath = options.folder;
        enumPath = join(folderPath, `${enumName}.enum.ts`) as FilePath;
    } else {
        [ enumName ] = args;


        await project.ensureDir("lib/enum");
        enumPath = join("lib/enum", `${enumName}.enum.ts`) as FilePath;

        $ok(enumName, "Usage: g fn <fn-name>");
    }

    await project.generateFileFromTemplate("enum.ts", enumPath, {
        name: enumName
    });

    await project.vscodeOpen(enumPath);
    
    log(`Successfully created enum ${enumName} at ${enumPath}.`);
}