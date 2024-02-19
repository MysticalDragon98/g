import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import { log } from "termx";
import executeShCommand from "../../../lib/modules/sh/executeShCommand";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
import transformFile from "../../../lib/modules/fs/transformFile";
//* Imports

export default async function componentCommand (project: Project, args: string[], options: any) {
    const [ name ] = args;

    ok(name, "Usage: g view --route <route> <name>");

    const componentName = `${name}`;
    const componentRoute = project.subPath(`src/app/${componentName}/${componentName}.component.ts`);

    await transformFile(componentRoute, (buf: Buffer) =>
        buf.toString().replace("'app-", "'")
    );

    log("Generating view component...");
    await executeShCommand(`ng generate component ${componentName}`);
    await vscodeOpen(componentRoute);
}