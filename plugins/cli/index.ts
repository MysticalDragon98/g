import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { FilePath } from "../../lib/types/FilePath.type";
import { PluginID } from "../../lib/types/PluginID.type";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
import { writeFile } from "fs/promises";
//* Imports

export default async function (project: Project, options: any) {
    //* TODO
    const pluginPath = getPluginPath(<PluginID>"cli");
    
    await installTSDependencies(["minimist"]);

    await project.ensureDir("plugins/cli");
    await project.ensureDir("lib/cli/docs");
    await project.ensureDir("lib/cli/docs/help");
    await project.ensureDir("lib/cli/commands");

    await copyDir(<FilePath>join(pluginPath, "template"), project.subPath("plugins/cli"));
    await writeFile(project.subPath("cli.config.ts"), "export default " + JSON.stringify({
        name: "",
        command: "",
        tagline: "",
        usage: "",
        description: [],
        examples: []
    }, null ,2));

    await project.generateFileFromTemplate("cli:help.command.ts", "lib/cli/commands/help.cli-command.ts", {});
}