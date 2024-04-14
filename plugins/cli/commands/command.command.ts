import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
//* Imports

export default async function commandCommand (project: Project, args: string[], options: any) {
    const [ ...route ] = args;
    const folder = route.slice(0, -1).join("/");
    const name = route[route.length - 1];

    const fnPath = join("lib/cli/commands", folder, `${name}.cli-command.ts` )
    $ok(route.length, "Usage: g cli:command <command-name>");

    await project.ensureDir(join("lib/cli/commands", folder));
    await project.generateFileFromTemplate("cli:command.ts", fnPath, {
        name
    });
    
    await project.vscodeOpen(fnPath);
}