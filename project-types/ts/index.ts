import { join } from "path";
import { log } from "termx";
import { unlink, writeFile } from "fs/promises";
import inquirer from "inquirer";
import gitInit from "../../lib/modules/git/gitInit";
import copyDir from "../../lib/modules/fs/copyDir";
import createFile from "../../lib/modules/fs/createFile";
import { exec } from "child_process";
import transformJsonFile from "../../lib/modules/fs/transformJsonFile";
import { installTSDependencies } from "./utils/installTSDependencies";
import setJSONFileFields from "../../lib/modules/fs/setJSONFileFields";
import Project from "../../lib/classes/Project.class";
import { FilePath } from "../../lib/types/FilePath.type";

export default async function initTSProject (project: Project, options: { esm?: boolean, lib?: boolean }) {
    log("Initializing TS project...");

    await gitInit(project.path);
    await copyDir(join(project.projectTypePath(), "template") as FilePath, project.path);
    await createFile(project.subPath(".env"));
    await createFile(project.subPath(".gitignore"), "node_modules/\n.env\ndist/\n");

    log("Installing dependencies...");
    await exec("pnpm install");

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

    if (!options.lib) {
        //? In applications, we need ts-node to run the project
        await installTSDependencies([
            "ts-node"
        ], { dev: true });
    }

    if (options.lib) {
        //? In libraries, we don't create an auto executable index file
        log("Setting up library project...");
        await writeFile(project.subPath("index.ts"), "//* Exports");
        
        log("Setting up package.json...");
        await transformJsonFile(project.subPath("package.json"), async json => {
            const { libraryName } = await inquirer.prompt([
                {
                    type: "input",
                    name: "libraryName",
                    message: "What's the name of your library:",
                    validate: (value: string) => {
                        if (!value) return "Please enter a name for your library";
                        return true;
                    }
                }
            ])

            json.name = libraryName;
            json.main = "dist/index.js";
            json.types = "dist/index.d.ts";
            json.scripts = {
                "build": "tsc",
                "prepublish": "npm run build"
            };

            //? On libraries, we don't need any dependencies
            json.dependencies = {};

            //? On libraries, some files are not needed
            await unlink(project.subPath("lib/env.ts"));
            await unlink(project.subPath("lib/exceptions.ts"));

            return json;
        });

        log("Setting up tsconfig.json...");
        await writeFile(project.subPath(".npmignore"), "node_modules/\n.env\n.docs\nsample");
    }
}