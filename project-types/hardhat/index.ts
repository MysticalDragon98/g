import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import gitInit from "../../lib/modules/git/gitInit";
import { FilePath } from "../../lib/types/FilePath.type";
import createFile from "../../lib/modules/fs/createFile";
import { log } from "termx";
import { exec } from "child_process";

export default async function initTSProject (project: Project, options: { esm?: boolean }) {
    console.log("Initializing Hardhat project...");

    await gitInit(project.path);
    await copyDir(join(project.projectTypePath(), "template") as FilePath, project.path);
    await createFile(project.subPath(".env"));
    await createFile(project.subPath(".gitignore"), "node_modules/\n.env\n.yarn\ncache\nartifacts\nignition/parameters.json\ntypechain-types");

    log("Installing dependencies...");
    await exec("pnpm install");
}