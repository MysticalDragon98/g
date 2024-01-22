import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { FilePath } from "../../../lib/types/FilePath.type";
import { $ok } from "../../../lib/exceptions";
import { PluginID } from "../../../lib/types/PluginID.type";
import getProjectTypePath from "../../../lib/modules/project-types/getProjectTypePath";
import getPluginPath from "../../../lib/modules/plugins/getPluginPath";

export default async function commandCommand (project: Project, args: string[], options: any) {
    const { type, plugin } = options;
    const [ parentType, commandName ] = args;

    const folderPath = !plugin ? "project-types" : "plugins";
    const fnPath = `${folderPath}/${parentType}/commands/${commandName}.command.ts`;
    $ok(commandName, "Usage: g command [--type | --plugin] <command-folder> <command-name>");

    await project.generateFileFromTemplate("g:command.ts", fnPath, {
        name: commandName
    });
    
    await project.vscodeOpen(fnPath);
    /*const baseFolder = commandType === "p" ? "plugins" : "project-types";
    const folderPath = commandType === "p" ?
        project.pluginSubPath(commandParent, baseFolder) :
        project.projectTypeSubPath(baseFolder);
    const fnPath = join(folderPath, `${commandName}.command.ts`) as FilePath;

    $ok(commandType && commandParent , "Usage: g command <module-name> <fn-name>");
    $ok(await dirExists(project.subPath(folderPath)), `Module ${moduleName} does not exist`);

    await project.generateFileFromTemplate("fn.ts", fnPath, {
        name: fnName
    });

    
    log(`Successfully created function ${fnName} in module ${moduleName}.`);*/
}