import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import { FilePath } from "../../../lib/types/FilePath.type";
import dirExists from "../../../lib/modules/fs/dirExists";
import { log } from "termx";
//* Imports

export default async function interfaceCommand (project: Project, args: string[], options: any) {
    let constName: string;
    let folderPath: FilePath;
    let constPath: FilePath;

    if (options.folder) {
        [ constName ] = args;

        $ok(constName, "Usage: g const --folder folder <name>");
        folderPath = options.folder;
        constPath = join(folderPath, `${constName}.const.ts`) as FilePath;
    } else {
        [ constName ] = args;


        await project.ensureDir("src/const");
        constPath = join("src/const", `${constName}.const.ts`) as FilePath;

        $ok(constName, "Usage: g fn <fn-name>");
    }

    await project.generateFileFromTemplate("const.ts", constPath, {
        name: constName
    });

    await project.vscodeOpen(constPath);
    
    log(`Successfully created const ${constName} at ${constPath}.`);
}