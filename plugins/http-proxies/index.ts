import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { FilePath } from "../../lib/types/FilePath.type";
import { PluginID } from "../../lib/types/PluginID.type";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = getPluginPath(<PluginID>"http-proxies");

    await installTSDependencies([ "@mysticaldragon/proxies", "axios" ]);
    await project.ensureDir("plugins/http-proxies");
    
    await copyDir(<FilePath>join(pluginPath, "template"), project.subPath("plugins/http-proxies"));
}