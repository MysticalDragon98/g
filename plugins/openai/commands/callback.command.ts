import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
//* Imports

export default async function callbackCommand (project: Project, [ name ]: string[], options: any) {
    ok(name, "Usage: g openai:callback <callback-name>");

    await project.generateFileFromTemplate("openai:callback.ts", `lib/openai/callbacks/${name}.openai-callback.ts`, {
        name
    });

    await project.vscodeOpen(`lib/openai/callbacks/${name}.openai-callback.ts`);
}