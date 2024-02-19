import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
//* Imports

export default async function pathCommand (project: Project, args: string[], options: any) {
    const [ path ] = args;

    ok(path, "Usage: g http:path <path>");

    await project.ensureDir("lib/http/endpoints/" + path);

    await project.generateFileFromPluginTemplate("http", "path.ts", project.subPath("lib/http/endpoints/" + path + "/index.ts"), {});
}