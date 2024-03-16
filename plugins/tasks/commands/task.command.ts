import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
import toVariableName from "../../../lib/modules/utils/toVariableName";
//* Imports

export default async function taskCommand (project: Project, [ taskName ]: string[], options: any) {
    const filePath = `lib/tasks/taskdefs/${taskName}.task.ts`;
    const indexFile = `plugins/tasks/index.ts`;

    ok(taskName, "Usage: g tasks:task <task-name>");

    await project.generateFileFromTemplate("tasks:task.ts", filePath, {
        name: taskName
    });

    await insertTagLine(project.subPath(indexFile), "Imports", `import { ${toVariableName(taskName, { capitalize: true })}Task } from "../../lib/tasks/taskdefs/${taskName}.task";`)
    await insertTagLine(project.subPath(indexFile), "Tasks", `${toVariableName(taskName, { capitalize: true })}: ${toVariableName(taskName, { capitalize: true })}Task,`)
    await vscodeOpen(project.subPath(filePath));
}