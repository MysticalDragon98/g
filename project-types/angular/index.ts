import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import gitInit from "../../lib/modules/git/gitInit";
import { FilePath } from "../../lib/types/FilePath.type";
import createFile from "../../lib/modules/fs/createFile";
import { exec } from "child_process";
import { log } from "termx";
//* Imports

export default async function (project: Project, args: string[], options: any) {
    await gitInit(project.path);
    await copyDir(join(project.projectTypePath(), "template") as FilePath, project.path);

    await createFile(project.subPath(".env"));
    await createFile(project.subPath(".gitignore"), "node_modules/\n.env\n.angular\n");

    await exec("pnpm install");

    log("Successfully initialized Angular project.");
}