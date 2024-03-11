import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import createFile from "../../../lib/modules/fs/createFile";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import vscodeOpen from "../../../lib/modules/vscode/vscodeOpen";
import { log } from "termx";
//* Imports

export default async function stylesCommand (project: Project, args: string[], options: any) {
    const [ name ] = args;

    ok(name, 'Usage: g css <name>');

    const filePath = project.subPath(`src/styles/${name}.sass`);
    const indexFile = project.subPath('src/styles.sass');

    await insertTagLine(indexFile, "Imports", `@import './styles/${name}.sass'`);

    await createFile(filePath);
    await vscodeOpen(filePath);

    log(`Successfully created ${name}.sass file in src/styles/ and imported it in src/styles.sass.`)
}