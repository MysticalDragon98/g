import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import { FilePath } from "../../../lib/types/FilePath.type";
import dirExists from "../../../lib/modules/fs/dirExists";
import { log } from "termx";
//* Imports

export default async function interfaceCommand (project: Project, args: string[], options: any) {
    let moduleName: string;
    let fnName: string;
    let folderPath: FilePath;
    let iPath: FilePath;

    if (options.folder) {
        [ fnName ] = args;

        $ok(fnName, "Usage: g interface --folder folder <fn-name>");
        folderPath = options.folder;
        iPath = join(folderPath, `${fnName}.ts`) as FilePath;
    } else {
        [ moduleName, fnName ] = args;

        folderPath = join("lib/modules", moduleName) as FilePath;
        iPath = join(folderPath, `${fnName}.interface.ts`) as FilePath;

        $ok(moduleName && fnName, "Usage: g fn <module-name> <fn-name>");
    }
    
    $ok(await dirExists(project.subPath(folderPath)), `Module ${moduleName} does not exist`);

    await project.generateFileFromTemplate("interface.ts", iPath, {
        name: fnName
    });

    await project.vscodeOpen(iPath);
    
    log(`Successfully created interface ${fnName} at ${iPath}.`);
}