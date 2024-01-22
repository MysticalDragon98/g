import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import gitInit from "../../lib/modules/git/gitInit";
import { FilePath } from "../../lib/types/FilePath.type";
import createFile from "../../lib/modules/fs/createFile";
import exec from "../../lib/modules/sh/exec";
import { log } from "termx";
import transformJsonFile from "../../lib/modules/fs/transformJsonFile";
import setJSONFileFields from "../../lib/modules/fs/setJSONFileFields";

export default async function initTSProject (project: Project, options: { esm?: boolean }) {
    console.log("Initializing TS project...");

    await gitInit(project.path);
    await copyDir(join(project.projectTypePath(), "template") as FilePath, project.path);
    await createFile(project.subPath(".env"));
    await createFile(project.subPath(".gitignore"), "node_modules/\n.env\n");

    log("Installing dependencies...");
    await exec("yarn install");

    if (options.esm) {
        await project.setOption("esm", true);

        await transformJsonFile(project.subPath("package.json"), json => {
            json.type = "module";
            json.scripts.start = "ts-node --esm index.ts";

            return json;
        });

        await setJSONFileFields(project.subPath("tsconfig.json"), {
            target: "ES2021",
            module: "ES2022"
        });
    }
}