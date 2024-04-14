import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import { FilePath } from "../../../lib/types/FilePath.type";
import dirExists from "../../../lib/modules/fs/dirExists";
import { log } from "termx";
//* Imports

export default async function interfaceCommand (project: Project, args: string[], options: any) {
    let iName: string;
    let folderPath: FilePath;
    let iPath: FilePath;

    if (options.folder) {
        [ iName ] = args;

        $ok(iName, "Usage: g interface --folder folder <interface-name>");
        folderPath = options.folder;
        iPath = join(folderPath, `${iName}.interface.ts`) as FilePath;
    } else {
        [ iName ] = args;

        iPath = join("lib/interfaces", `${iName}.interface.ts`) as FilePath;

        $ok(iName, "Usage: g interface <interface-name>");
    }

    await project.generateFileFromTemplate("interface.ts", iPath, {
        name: iName
    });

    await project.vscodeOpen(iPath, {
        line: 2,
        character: 5
    });
    
    log(`Successfully created interface ${iName} at ${iPath}.`);
}