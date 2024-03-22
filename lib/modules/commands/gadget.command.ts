import Paths from "../../const/Paths.const";
import { join } from "path";
import { ok } from "assert";
import { statSync } from "fs";
import { FilePath } from "../../types/FilePath.type";
import Inquirer from "inquirer";
import promptProjectType from "../prompts/promptProjectType";
import fileExists from "../fs/fileExists";
import dirExists from "../fs/dirExists";
import promptPluginsForProjectType from "../prompts/promptPluginsForProjectType";
import Project from "../../classes/Project.class";
import { mkdir } from "fs/promises";
import { log } from "termx";
import vscodeOpen from "../vscode/vscodeOpen";
import ensureDir from "../fs/ensureDir";
import { $LOGS_FOLDER } from "../../env";

interface IOptions {
    type: string;
}

export default async function gadgetCommand (args: string[], { options }: { options: IOptions }) {
    const [ name, ...cliArgs ] = args;

    ok(name, "Usage: g gadget <gadget-name>");
    const folderPath = join(Paths.gadgets, name) as FilePath;

    ok(!await fileExists(folderPath) && !await dirExists(folderPath), `Gadget ${name} already exists`);
    
    const projectType = await promptProjectType("Select the core engine of the gadget");
    const plugins = await promptPluginsForProjectType(projectType.id, "Select the plugins to use");

    log(`Creating room for the gadget: ${name} at ${folderPath}...`);

    await mkdir(folderPath);

    const project = await Project.init(folderPath, projectType.id);
    const gadgetFile = project.subPath("gadget.json");

    await project.initType();

    for (const plugin of plugins) {
        await project.installPlugin(plugin.id);
    }

    log(`Gadget ${name} created at ${folderPath}`);

    await project.generateFileFromTemplate("g:gadget.json", "gadget.json", {
        id: name,
    });

    log(`Creating log folder...`);
    await ensureDir(join($LOGS_FOLDER, name));

    await vscodeOpen(folderPath);
    await vscodeOpen(gadgetFile);
}
