import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import dirExists from "../../../lib/modules/fs/dirExists";
import { FilePath } from "../../../lib/types/FilePath.type";
import { log } from "termx";

export default async function fnCommand (project: Project, args: string[], options: { folder?: FilePath }) {
    let moduleName: string;
    let fnName: string;
    let folderPath: FilePath;
    let fnPath: FilePath;

    if (options.folder) {
        [ fnName ] = args;

        $ok(fnName, "Usage: g fn --folder folder <fn-name>");
        folderPath = options.folder;
        fnPath = join(folderPath, `${fnName}.ts`) as FilePath;
    } else {
        [ moduleName, fnName ] = args;

        folderPath = join("src/modules", moduleName) as FilePath;
        fnPath = join(folderPath, `${fnName}.ts`) as FilePath;

        $ok(moduleName && fnName, "Usage: g fn <module-name> <fn-name>");
    }
    
    $ok(await dirExists(project.subPath(folderPath)), `Module ${moduleName} does not exist`);

    await project.generateFileFromTemplate("fn.ts", fnPath, {
        name: fnName
    });

    await project.vscodeOpen(fnPath, {
        line: 2,
        character: 5
    });
    
    log(`Successfully created function ${fnName} at ${fnPath}.`);
}