import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import { generateGlobalCommand } from "../../../lib/modules/command-utils/generateGlobalCommand";
import createFile from "../../../lib/modules/fs/createFile";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";

interface IOptions {
    global?: string;
    plugin?: string;
    template?: string;
    templates?: string;
}

export default async function commandCommand (project: Project, args: string[], options: IOptions = {}) {
    const { plugin } = options;
    const [ parentType, commandName ] = args;

    if (options.global !== undefined) return await generateGlobalCommand(args, { options });

    const folderPath = !plugin ? "project-types" : "plugins";
    const fnPath = `${folderPath}/${parentType}/commands/${commandName}.command.ts`;
    
    $ok(commandName, "Usage: g command [--type | --plugin] <command-folder> <command-name> [--template <template-name>]");

    if (options.template) {
        const templatePath = project.subPath(`${folderPath}/${parentType}/file-templates/${options.template}`);

        await project.generateFileFromTemplate("g:template-command.ts", fnPath, {
            template: (options.plugin? `${options.plugin}:` : "") + options.template,
            command : (options.plugin? `${options.plugin}:` : "") + commandName
        });

        await createFile(templatePath);
        await vscodeOpen(templatePath);
    } else {
        await project.generateFileFromTemplate("g:command.ts", fnPath, {
            name: commandName
        });
    }
    
    await project.vscodeOpen(fnPath);
}