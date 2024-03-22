import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = await getPluginPath("ipc-proxies");

    await installTSDependencies(["@mysticaldragon/proxies"]);
    await project.ensureDir("plugins/ipc-proxies");

    await copyDir(join(pluginPath, "template"), project.subPath("plugins/ipc-proxies"));
}