import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { FilePath } from "../../../lib/types/FilePath.type";
import { $ok } from "../../../lib/exceptions";
import { log } from "console";
//* Imports

export default async function typeCommand (project: Project, args: string[], options: { unique?: boolean, folder?: FilePath }) {
    let tPath: FilePath;
    let moduleName = args[1]? args[0] : null;
    let tName = args[1] ?? args[0];
    let folder = options.folder ?? (moduleName? join("lib", "modules", moduleName, "types") : join("lib", "types")); 

    $ok(tName, "Usage: g type <type-name>");
    await project.ensureDir(folder);
    tPath = join(folder, `${tName}.type.ts`) as FilePath;

    $ok(tName, "Usage: g type <type-name>");

    await project.generateFileFromTemplate("type.ts", tPath, {
        name: tName,
        unique: options.unique
    });

    await project.vscodeOpen(tPath);
    
    log(`Successfully created type ${tName} at ${tPath}.`);
}