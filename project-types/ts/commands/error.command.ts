import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import { log } from "termx";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
//* Imports

export default async function errorCommand (project: Project, args: string[], options: any) {
    const [ type, code ] = args;

    ok(type && code, "Usage: g error <error-type> <error-code>");

    const file = `lib/errors/${type}.errors.ts`;
    await project.pushToFileFromTemplate("error.ts", file, { type, code });

    log(`Created error ${type} with code ${code} in ${file}`);

    await vscodeOpen(project.subPath(file));
}