import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { FilePath } from "../../lib/types/FilePath.type";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = await getPluginPath("state-machines");

    await project.ensureDir("plugins/state-machines");
    await project.ensureDir("lib/state-machines");
    
    await copyDir(<FilePath>join(pluginPath, "template"), project.subPath("plugins/state-machines"));
}