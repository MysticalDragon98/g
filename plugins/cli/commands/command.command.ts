import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
//* Imports

export default async function commandCommand (project: Project, args: string[], options: any) {
    const [ commandName ] = args;

    const fnPath = join("lib/cli/commands", `${commandName}.repl-command.ts` )
    $ok(commandName, "Usage: g cli:command <command-name>");

    await project.generateFileFromTemplate("cli:command.ts", fnPath, {
        name: commandName
    });
    
    await project.vscodeOpen(fnPath);
}