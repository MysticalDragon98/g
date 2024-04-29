import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { log } from "termx";
import { $ok } from "../../../lib/exceptions";
import dirExists from "../../../lib/modules/fs/dirExists";
import toVariableName from "../../../lib/modules/utils/toVariableName";
//* Imports

export default async function moduleCommand (project: Project, [ moduleName ]: string[], options: any) {
    moduleName = toVariableName(moduleName, { snakeCase: true });
    const folder = join("lib", "modules", moduleName);
    log(`Creating module ${moduleName}...`);

    $ok(moduleName, "Usage: g module <module-name>");
    $ok(!await dirExists(project.subPath(folder)), `Module ${moduleName} already exists`);

    await project.ensureDir(folder);

    log(`Successfully created module ${moduleName}.`);
}