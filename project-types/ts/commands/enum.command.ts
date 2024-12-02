import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { FilePath } from "../../../lib/types/FilePath.type";
import { $ok } from "../../../lib/exceptions";
import { log } from "console";
//* Imports

export default async function typeCommand (project: Project, args: string[], options: { unique?: boolean, folder?: FilePath }) {
    let ePath: FilePath;
    let moduleName = args[1]? args[0] : null;
    let eName = args[1] ?? args[0];
    let folder = options.folder ?? (moduleName? join("lib", "modules", moduleName, "enum") : join("lib", "enum")); 

    $ok(eName, "Usage: g enum [module-name] <type-name>");
    await project.ensureDir(folder);
    ePath = join(folder, `${eName}.enum.ts`) as FilePath;

    $ok(eName, "Usage: g enum [module-name] <type-name>");

    await project.generateFileFromTemplate("enum.ts", ePath, {
        name: eName,
        unique: options.unique
    });

    await project.vscodeOpen(ePath);
    
    log(`Successfully created type ${eName} at ${ePath}.`);
}