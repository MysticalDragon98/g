import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import dirExists from "../../../lib/modules/fs/dirExists";
import { FilePath } from "../../../lib/types/FilePath.type";
import { log } from "termx";

export default async function fnCommand (project: Project, args: string[], options: any) {
    const [ moduleName, fnName ] = args;
    const folderPath = join("lib/modules", moduleName) as FilePath;
    const fnPath = join(folderPath, `${fnName}.ts`) as FilePath;

    $ok(moduleName && fnName, "Usage: g fn <module-name> <fn-name>");
    $ok(await dirExists(project.subPath(folderPath)), `Module ${moduleName} does not exist`);

    await project.generateFileFromTemplate("fn.ts", fnPath, {
        name: fnName
    });

    await project.vscodeOpen(fnPath);
    
    log(`Successfully created function ${fnName} in module ${moduleName}.`);
}