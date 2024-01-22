import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import dirExists from "../../../lib/modules/fs/dirExists";
import { FilePath } from "../../../lib/types/FilePath.type";
//* Imports

export default async function projectTypeCommand (project: Project, args: string[], options: any) {;
    const [ projectType ] = args;
    const folder = join("project-types", projectType);

    $ok(projectType, "Usage: g g:project-type <project-type>")
    $ok(!await dirExists(<FilePath>folder), `Project type "${projectType}" already exists`);

    await project.ensureDir(folder);
    await project.ensureDir(join(folder, "template"));
    await project.ensureDir(join(folder, "file-templates"));
    await project.ensureDir(join(folder, "commands"));

    await project.generateFileFromTemplate("g:initializer.ts", join(folder, "index.ts"), {});

    await project.vscodeOpen(join(folder, "index.ts"));
}