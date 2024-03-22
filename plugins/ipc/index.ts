import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = await getPluginPath("ipc");

    await project.ensureDir("plugins/ipc");
    await project.ensureDir("lib/ipc/endpoints");

    await copyDir(join(pluginPath, "template"), project.subPath("plugins/ipc"));
}