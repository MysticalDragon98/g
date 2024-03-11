import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { FilePath } from "../../../lib/types/FilePath.type";
import { $ok } from "../../../lib/exceptions";
import { log } from "console";
//* Imports

export default async function typeCommand (project: Project, args: string[], options: { unique?: boolean, folder?: FilePath }) {
    let tName: string;
    let folderPath: FilePath;
    let tPath: FilePath;

    if (options.folder) {
        [ tName ] = args;

        $ok(tName, "Usage: g type --folder folder <type-name>");
        folderPath = options.folder;
        tPath = join(folderPath, `${tName}.ts`) as FilePath;
    } else {
        [ tName ] = args;

        tPath = join("lib/types", `${tName}.type.ts`) as FilePath;

        $ok(tName, "Usage: g type <type-name>");
    }

    await project.generateFileFromTemplate("type.ts", tPath, {
        name: tName,
        unique: options.unique
    });

    await project.vscodeOpen(tPath);
    
    log(`Successfully created type ${tName} at ${tPath}.`);
}