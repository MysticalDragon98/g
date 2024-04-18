import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import { FilePath } from "../../lib/types/FilePath.type";
import { exec } from "child_process";
//* Imports

export default async function (project: Project, options: any) {
    //* TODO
    await copyDir(join(project.projectTypePath(), "template") as FilePath, project.path);
    await exec("yarn install");
}