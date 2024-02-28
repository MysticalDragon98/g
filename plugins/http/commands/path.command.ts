import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
//* Imports

export default async function pathCommand (project: Project, args: string[], options: any) {
    const [ path ] = args;

    ok(path, "Usage: g http:path <path>");

    await project.ensureDir("lib/http/endpoints/" + path);
    await project.generateFileFromPluginTemplate("http", "path.ts", "lib/http/endpoints/" + path + "/index.ts", {});

    await insertTagLine(
        project.subPath("plugins/http/initHTTPServer.ts"),
        "Imports",
        `import ${path} from "../../lib/http/endpoints/${path}/index";`
    );

    await insertTagLine(
        project.subPath("plugins/http/initHTTPServer.ts"),
        "Endpoints",
        `${path},`
    );
}