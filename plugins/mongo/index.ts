import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import { FilePath } from "../../lib/types/FilePath.type";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { PluginID } from "../../lib/types/PluginID.type";
//* Imports

export default async function (project: Project, options: any) {
    await installTSDependencies([
        "mongoose",
        "@typegoose/typegoose"
    ]);

    await project.ensureDir("plugins/mongo");
    await project.ensureDir("lib/mongo/models");
    await project.addEnvvar("MONGO_URI", { required: true });
    
    await copyDir(<FilePath>join(getPluginPath("mongo" as PluginID), "template"), project.subPath("plugins/mongo"));
}