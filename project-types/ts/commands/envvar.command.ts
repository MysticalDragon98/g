import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
//* Imports

export default async function envvarCommand (project: Project, args: string[], options: { required?: boolean, default?: string, type?: string }) {
    const [ name ] = args;

    $ok(name, "Usage: g envvar <name>");

    await project.pushToFileFromTemplate("envvar.env", ".env", { name });
    await project.pushToFileFromTemplate("envvar.ts", "lib/env.ts", {
        name,
        required: options.required,
        default: options.default,
        type: options.type
    });

    await project.vscodeOpen(".env");
}