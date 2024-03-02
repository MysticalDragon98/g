import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import { log } from "termx";
//* Imports

export default async function schemaCommand (project: Project, args: string[], options: any) {
    const [ schemaName ] = args;

    ok(schemaName, 'Usage: g validation:schema <name>');

    await project.generateFileFromTemplate("validation:schema.ts", `lib/validation/schemas/${schemaName}.schema.ts`, {
        name: schemaName
    });

    await project.vscodeOpen(`lib/validation/schemas/${schemaName}.schema.ts`);
    log(`Successfully created schema ${schemaName} at lib/validation/schemas/${schemaName}.schema.ts.`);
}