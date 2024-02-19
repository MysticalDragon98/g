import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import executeShCommand from "../../../lib/modules/sh/executeShCommand";
import { log } from "termx";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
import { FilePath } from "../../../lib/types/FilePath.type";
import transformFile from "../../../lib/modules/fs/transformFile";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import toVariableName from "../../../lib/modules/utils/toVariableName";
//* Imports

export default async function viewCommand (project: Project, args: string[], options: { route?: string }) {
    const [ name ] = args;

    ok(name && options.route, "Usage: g view --route <route> <name>");

    const componentName = `${name}-view`;
    const componentRoute = project.subPath(`src/app/${componentName}/${componentName}.component.ts`);
    const routerPath = project.subPath(`src/app/app-routing.module.ts`);

    log("Generating view component...");
    await executeShCommand(`ng generate component ${componentName}`);

    await insertTagLine(
        routerPath,
        "Routes",
        `{ path: '${options.route}', component: ${toVariableName(componentName, { capitalize: true })}Component },`
    );

    await insertTagLine(
        routerPath,
        "Imports",
        `import { ${toVariableName(componentName, { capitalize: true })}Component } from './${componentName}/${componentName}.component';`
    );

    await vscodeOpen(componentRoute);
}