import Project from "../../../lib/classes/Project.class";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import toVariableName from "../../../lib/modules/utils/toVariableName";
//* Imports

export default async function loggerCommand (project: Project, args: string[], options: any) {
    const varname = `${toVariableName(args[0], { capitalize: true })}Logger`;

    await insertTagLine(project.subPath("lib/logger/loggers.ts"), "Loggers", `export const ${varname}: IModuleInspector = createModuleInspector("${args[0].toUpperCase()}");`);
    await project.vscodeOpen("lib/logger/loggers.ts");
}