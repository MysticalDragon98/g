import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import { join } from "path";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
//* Imports

export default async function namespaceCommand (project: Project, args: string[], options: any) {
    const filePath = "lib/http/sockets/namespaces.ts";
    const [ name ] = args;

    ok(name, "Usage g http.sockets:namespace <name>");

    await project.ensureDir(join("lib/http/sockets/namespaces", name));
    await project.pushToFileFromTemplate("http.sockets:namespace.ts", filePath, { name });

    await vscodeOpen(project.subPath(filePath));
}