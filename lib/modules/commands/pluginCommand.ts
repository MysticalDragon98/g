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
    const [ pluginId ] = args as [PluginID];
    const workdir = process.cwd() as FilePath;
    const pluginPath = await getPluginPath(pluginId);

    $ok(pluginId, `Plugin not specified.`);
    $ok(await pluginExists(pluginId), `Plugin ${pluginId} does not exist.`);

    const project = await Project.fromPath(workdir);

    const pluginInitializer = await import(join(pluginPath, "index.ts")) as { default: (project: Project, options?: any) => Promise<void> };
    await pluginInitializer.default(project, options);

    project.plugins.push(pluginId);
    await project.save();

    log(`Successfully installed ${pluginId} plugin in ${workdir}.`);
}
