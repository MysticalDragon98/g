import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { FilePath } from "../../lib/types/FilePath.type";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = await getPluginPath("openai");

    await installTSDependencies([
        "openai"
    ]);

    await project.ensureDir("plugins/openai");
    await project.ensureDir("lib/openai/callbacks");
    await project.ensureDir("lib/openai/mindsets");
    await project.addEnvvar("OPENAI_APIKEY", { required: true });
    await project.addEnvvar("OPENAI_URL", {});

    await copyDir(<FilePath>join(pluginPath, "template"), project.subPath("plugins/openai"));
}