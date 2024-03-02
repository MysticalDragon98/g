import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import { FilePath } from "../../../lib/types/FilePath.type";
import { log } from "termx";
//* Imports

interface Options {
    folder?: FilePath;
    simple?: boolean;
}

export default async function decoratorCommand (project: Project, args: string[], options: Options) {
    let decoratorName: string;
    let folderPath: FilePath;
    let decoratorPath: FilePath;

    if (options.folder) {
        [ decoratorName ] = args;

        $ok(decoratorName, "Usage: g decorator --folder folder <name>");
        folderPath = options.folder;
        decoratorPath = join(folderPath, `${decoratorName}.decorator.ts`) as FilePath;
    } else {
        [ decoratorName ] = args;


        await project.ensureDir("lib/decorator");
        decoratorPath = join("lib/decorator", `${decoratorName}.decorator.ts`) as FilePath;

        $ok(decoratorName, "Usage: g fn <fn-name>");
    }

    await project.generateFileFromTemplate(options.simple? "simple-decorator.ts" : "decorator.ts", decoratorPath, {
        name: decoratorName
    });

    await project.vscodeOpen(decoratorPath);
    
    log(`Successfully created decorator ${decoratorName} at ${decoratorPath}.`);
}