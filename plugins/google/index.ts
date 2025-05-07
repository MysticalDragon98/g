import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
//* Imports

export default async function (project: Project, options: any) {
    //* TODO
    await installTSDependencies([ "axios" ]);
    await project.addEnvvar("GOOGLE_API_KEY", { required: true });

    const pluginPath = getPluginPath("google");
    await copyDir(join(pluginPath, "template"), project.subPath("plugins/google"));

}