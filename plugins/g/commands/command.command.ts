import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import { generateGlobalCommand } from "../../../lib/modules/command-utils/generateGlobalCommand";

export default async function commandCommand (project: Project, args: string[], options: { global?: string, plugin?: string } = {}) {
    const { plugin } = options;
    const [ parentType, commandName ] = args;

    if (options.global !== undefined) return await generateGlobalCommand(args, { options });

    const folderPath = !plugin ? "project-types" : "plugins";
    const fnPath = `${folderPath}/${parentType}/commands/${commandName}.command.ts`;
    
    $ok(commandName, "Usage: g command [--type | --plugin] <command-folder> <command-name>");

    await project.generateFileFromTemplate("g:command.ts", fnPath, {
        name: commandName
    });
    
    await project.vscodeOpen(fnPath);
}