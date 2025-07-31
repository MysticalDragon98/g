import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { FilePath } from "../../lib/types/FilePath.type";
import { installTSDependencies } from "../../project-types/ts/utils/installTSDependencies";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = await getPluginPath("validation");

    await installTSDependencies(["ajv"]);
    await project.ensureDir("plugins/validation");
    await project.ensureDir("lib/validation");
    await project.ensureDir("lib/validation/schemas");

    await copyDir(<FilePath>join(pluginPath, "template"), project.subPath("plugins/validation"));
}