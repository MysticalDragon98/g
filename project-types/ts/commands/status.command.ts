import { log } from "termx";
import Project from "../../../lib/classes/Project.class";
import countFiles from "../../../lib/modules/fs/countFiles";
import { readdir } from "fs/promises";
//* Imports

export default async function statusCommand (project: Project, args: string[], options: any) {
    const amountOfPlugins = await countFiles("plugins");
    const modules = await readdir("lib/modules");
    const amountOfConstants = await countFiles("lib/const");
    const amountOfEnums = await countFiles("lib/enum");
    const amountOfInterfaces = await countFiles("lib/interfaces");
    const amountOfTypes = await countFiles("lib/types");

    console.log(`${project.options.name}@${project.options.version ?? "0.0.0"}`);
    console.log(`- Path: ${project.path}`);
    console.log(`- Plugins: ${amountOfPlugins}`);
    console.log(`- Modules: ${modules.length}`);
    console.log(`- Constants: ${amountOfConstants}`);
    console.log(`- Enums: ${amountOfEnums}`);
    console.log(`- Interfaces: ${amountOfInterfaces}`);
    console.log(`- Types: ${amountOfTypes}`);

}