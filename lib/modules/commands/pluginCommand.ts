import CLICommandOptions from "../../interfaces/CLICommandOptions.interface";
import { FilePath } from "../../types/FilePath.type";
import { PluginID } from "../../types/PluginID.type";
import { $ok } from "../../exceptions";
import Project from "../../classes/Project.class";

export default async function pluginCommand (args: string[], { options }: CLICommandOptions) {
    const workdir = process.cwd() as FilePath;
    const project = await Project.fromPath(workdir);
    const [ pluginId ] = args;

    $ok(pluginId, `Usage: g plugin <plugin-id>`);
    
    await project.installPlugin(pluginId as PluginID);
}
