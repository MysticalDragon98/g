import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import { FilePath } from "../../lib/types/FilePath.type";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
//* Imports

export default async function (project: Project, options: { port?: string }) {
    const pluginPath = await getPluginPath("http");
    
    await installTSDependencies(["@mysticaldragon/unete"]);

    await project.addEnvvar("HTTP_PORT", {
        required: true,
        default: options.port?.toString()
    });

    await project.ensureDir("plugins/http");
    await project.ensureDir("lib/http/endpoints");
    
    await copyDir(<FilePath>join(pluginPath, "template"), project.subPath("plugins/http"));
}