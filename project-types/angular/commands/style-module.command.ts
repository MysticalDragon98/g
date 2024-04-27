import Project from "../../../lib/classes/Project.class";
import {ok} from "assert";
import {join} from "path";
import {log} from "termx";
//* Imports

export default async function styleModuleCommand (project: Project, args: string[], options: any) {
    const [ name ] = args;

    ok(name, 'Usage: g style-module <name>');

    await project.ensureDir(join('src/app/styles', name));

    log(`Successfully created ${name} style module in src/app/styles/`);
}