import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { ok } from "assert";
//* Imports

export default async function unitCommand (project: Project, [ filePath ]: string[], options: any) {
    ok(filePath, "Usage: g tests:unit <file-path>");

    const path = join("test", "unit", filePath);
    const containerFolder = path.split("/").slice(0, -1).join("/");

    await project.ensureDir(containerFolder);
    
}