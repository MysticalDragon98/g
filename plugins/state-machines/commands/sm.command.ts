import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
//* Imports

export default async function smCommand (project: Project, args: string[], options: any) {
    const [ name ] = args;

    ok(name, "Usage: g state-machines:sm <name>");

    await project.generateFileFromTemplate("state-machines:stateMachine.ts", `lib/state-machines/${name}.state-machine.ts`, {
        name
    });

    await vscodeOpen(project.subPath(`lib/state-machines/${name}.state-machine.ts`));
}