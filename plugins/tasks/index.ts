import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { FilePath } from "../../lib/types/FilePath.type";
import { PluginID } from "../../lib/types/PluginID.type";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
import { ok } from "assert";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = getPluginPath(<PluginID>"tasks");
    ok(project.plugins.includes(<PluginID>"mongo"), "This plugin requires the mongo plugin to be installed.")

    await installTSDependencies([
        "@olptools/taskgraph"
    ]);

    await project.ensureDir("plugins/tasks");
    await project.ensureDir("lib/tasks/dependencies");
    await project.ensureDir("lib/tasks/taskdefs");

    await copyDir(
        <FilePath>join(pluginPath, "template"),
        project.subPath("plugins/tasks")
    );
}