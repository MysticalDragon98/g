import { ok } from "node:assert";
import Project from "../../../lib/classes/Project.class";
import { join } from "node:path";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import { log } from "termx";
//* Imports

export default async function errorTypeCommand (project: Project, args: string[], options: any) {
    const [ name ] = args;
    const file = join("lib/errors", `${name}.errors.ts`);
    
    ok(name, "Usage: g error-type <error-type>");

    await project.generateFileFromTemplate("error-type.ts", file, { name });
    await insertTagLine(project.subPath("lib/errors/index.ts"), `Exports`, `export * from './${name}.errors';`);

    log(`Created error type ${name} in ${file}`)
}