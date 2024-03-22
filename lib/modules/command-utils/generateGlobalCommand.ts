import { ok } from "assert";
import CLICommandOptions from "../../interfaces/CLICommandOptions.interface";
import Project from "../../classes/Project.class";
import { FilePath } from "../../types/FilePath.type";
import insertTagLine from "../fs/insertTagLine";
import vscodeOpen from "../vscode/vscodeOpen";

export async function generateGlobalCommand (args: string[], { options }: CLICommandOptions) {
    const project = await Project.fromPath(process.cwd() as FilePath);
    const [ commandName ] = args;

    ok(commandName, "Usage: g command [--type | --plugin | --global] <command-name>");

    const fnPath = `lib/modules/commands/${commandName}.command.ts`;
    const commandsIndexFile = "lib/modules/cli/executeCLICommand.ts";
    
    await project.generateFileFromTemplate("g:global-command.command.ts", fnPath, {
        name: commandName
    });

    await insertTagLine(
        project.subPath(commandsIndexFile),
        "Imports",
        `import ${commandName}Command from "../commands/${commandName}.command";`
    );

    await insertTagLine(
        project.subPath(commandsIndexFile),
        "Commands",
        `"${commandName}": ${commandName}Command,`
    );

    vscodeOpen(project.subPath(fnPath));
}