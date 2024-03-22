import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
//* Imports

export default async function pathCommand (project: Project, args: string[], options: any) {
    const [ path ] = args;

    ok(path, "Usage: g plugin:path <path>");

    await project.ensureDir("lib/ipc/endpoints/" + path);
    await project.generateFileFromTemplate("ipc:path.ts", "lib/ipc/endpoints/" + path + "/index.ts", {});

    await insertTagLine(
        project.subPath("plugins/ipc/initIPCServer.ts"),
        "Imports",
        `import ${path} from "../../lib/ipc/endpoints/${path}";`
    );

    await insertTagLine(
        project.subPath("plugins/ipc/initIPCServer.ts"),
        "Endpoints",
        `${path},`
    );
}