import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import toVariableName from "../../../lib/modules/utils/toVariableName";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
//* Imports

export default async function endpointCommand (project: Project, args: string[], options: any) {
    const [ path, endpoint ] = args;
    const filePath = join("lib/http/endpoints", path, endpoint + ".http-endpoint.ts");

    await project.generateFileFromPluginTemplate("http", "endpoint.ts", filePath, {
        name: endpoint
    });

    await insertTagLine(
        project.subPath(join("lib/http/endpoints", path, "index.ts")),
        "Imports",
        `import ${toVariableName(endpoint)} from "./${endpoint}.http-endpoint";`
    );

    await insertTagLine(
        project.subPath(join("lib/http/endpoints", path, "index.ts")),
        "Endpoints",
        `${toVariableName(endpoint)},`
    );

    await vscodeOpen(project.subPath(filePath));
}