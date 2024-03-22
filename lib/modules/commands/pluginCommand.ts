import { join } from "path";
import Paths from "../../const/Paths.const";
import CLICommandOptions from "../../interfaces/CLICommandOptions.interface";
import { FilePath } from "../../types/FilePath.type";
import { PluginID } from "../../types/PluginID.type";
import { $ok } from "../../exceptions";
import pluginExists from "../plugins/pluginExists";
import getPluginPath from "../plugins/getPluginPath";
import Project from "../../classes/Project.class";
import { log } from "termx";

export default async function pluginCommand (args: string[], { options }: CLICommandOptions) {
    const workdir = process.cwd() as FilePath;
    const project = await Project.fromPath(workdir);
    const [ pluginId ] = args;

    $ok(pluginId, `Usage: g plugin <plugin-id>`);
    
    await project.installPlugin(pluginId as PluginID);
}
