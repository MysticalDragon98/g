import { log } from "termx";
import Project from "../../../lib/classes/Project.class";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
import { ok } from "assert";
//* Imports

const CONST_PATH = "__tests__/samples/constants.test.ts";

interface IOptions {
    const?: string;
}

export default async function sampleCommand (project: Project, args: string[], options: IOptions) {
    const name = args[0] ?? options.const;

    ok(name, "Usage: g tests:sample <name>");
    
    if (options.const) {
        await project.pushToFileFromTemplate("tests:const-sample.ts", CONST_PATH, {
            name
        });

        log(`Constant ${options.const} has been created in ${CONST_PATH}`);
        await vscodeOpen(project.subPath(CONST_PATH));
        return;
    }

    await project.pushToFileFromTemplate("tests:sample.ts", `__tests__/samples/${name}.test.ts`, {
        name
    });

    log(`Sample ${name} has been created in __tests__/samples/${name}.test.ts`);

    await vscodeOpen(project.subPath(`__tests__/samples/${name}.test.ts`));
}