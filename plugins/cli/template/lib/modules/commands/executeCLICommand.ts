import { resolve } from "path";
import CLICommandOptions from "../../interfaces/CLICommandOptions.interface";

export default async function executeCLICommand (args: string[], { options }: CLICommandOptions = { options: {} }) {
    const [command, ...cliArgs] = args;
    const commandsPath = resolve(__dirname, "../../../../lib/cli/commands/" + command + ".cli-command.ts");
    
    let commandModule;
    try {
        commandModule = await import(commandsPath);
    } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
            throw new Error(`Command ${command} not found`);
        }

        throw error;
    }
    

    await commandModule.default(cliArgs, options);
}
