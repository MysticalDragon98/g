import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import dirExists from "../../../lib/modules/fs/dirExists";
import { log } from "termx";

export default async function moduleCommand (project: Project, args: string[]) {
    const [ moduleName ] = args;
    const folder = join("src/modules", moduleName);
    log(`Creating module ${moduleName}...`);

    $ok(moduleName, "Usage: g module <module-name>");
    $ok(!await dirExists(project.subPath(folder)), `Module ${moduleName} already exists`);

    await project.ensureDir(folder);

    log(`Successfully created module ${moduleName}.`);
}