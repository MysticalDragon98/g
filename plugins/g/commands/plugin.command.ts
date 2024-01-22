import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import dirExists from "../../../lib/modules/fs/dirExists";
import { FilePath } from "../../../lib/types/FilePath.type";
//* Imports

export default async function pluginCommand (project: Project, args: string[], options: any) {
    const [ pluginId ] = args;
    const folder = join("plugins", pluginId);

    $ok(pluginId, "Usage: g g:plugin <project-type>")
    $ok(!await dirExists(<FilePath>folder), `Plugin "${pluginId}" already exists`);

    await project.ensureDir(folder);
    await project.ensureDir(join(folder, "template"));
    await project.ensureDir(join(folder, "file-templates"));
    await project.ensureDir(join(folder, "commands"));

    await project.generateFileFromTemplate("g:initializer.ts", join(folder, "index.ts"), {});

    await project.vscodeOpen(join(folder, "index.ts"));
}