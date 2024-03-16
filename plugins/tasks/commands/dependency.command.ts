import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import toVariableName from "../../../lib/modules/utils/toVariableName";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
//* Imports

export default async function dependencyCommand (project: Project, [ dependencyName ]: string[], options: any) {
    const filePath = `lib/tasks/dependencies/${dependencyName}.dependency.ts`;
    const indexFile = `plugins/tasks/index.ts`;

    ok(dependencyName, "Usage: g tasks:dependency <dependency-name>");

    await project.generateFileFromTemplate("tasks:dependency.ts", filePath, {
        name: dependencyName
    });

    await insertTagLine(project.subPath(indexFile), "Imports", `import { ${toVariableName(dependencyName, { capitalize: true })}Dependency } from "../../lib/tasks/dependencies/${dependencyName}.dependency";`)
    await insertTagLine(project.subPath(indexFile), "Dependencies", `${toVariableName(dependencyName, { capitalize: true })}: ${toVariableName(dependencyName, { capitalize: true })}Dependency,`)
    await vscodeOpen(project.subPath(filePath));
}