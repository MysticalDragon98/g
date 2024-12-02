import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
//* Imports

export default async function setNamespaceCommand (project: Project, args: string[], options: any) {
    const [ namespace ] = args;

    ok(namespace, "Usage: g set-namespace <namespace>");

    await project.setOption("namespace", namespace);
}