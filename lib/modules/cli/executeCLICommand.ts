import Project from "../../classes/Project.class";
import CLICommandOptions from "../../interfaces/CLICommandOptions.interface";
import { FilePath } from "../../types/FilePath.type";
import initCommand from "../commands/initCommand";
import pluginCommand from "../commands/pluginCommand";

const Commands: {
    [key: string]: (args: string[], { options }: CLICommandOptions) => Promise<void>;
} = {
    init: initCommand,
    plugin: pluginCommand
    //* Commands
};

export default async function executeCLICommand (args: string[], { options }: CLICommandOptions = { options: {} }) {
    const [command, ...cliArgs] = args;
    
    if (Commands[command]) {
        return await Commands[command](cliArgs, { options });
    }
    
    if (await Project.isProject(process.cwd() as FilePath)) {
        const project = await Project.fromPath(process.cwd() as FilePath);

        if (project.hasCommand(command)) {
            return await project.executeCommand(command, cliArgs, options);
        }
    }

    throw new Error(`Command ${command} not found`);
}
