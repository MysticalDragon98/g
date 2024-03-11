import CLICommandOptions from "../../interfaces/CLICommandOptions.interface";
import { FilePath } from "../../types/FilePath.type";
import Project from "../../classes/Project.class";
import { resolve } from "path";
import getProjectTypePath from "../project-types/getProjectTypePath";
import { readFile, readdir } from "fs/promises";
const { yellow, magenta } = require("chalk");


function prettyPrint (sentence: string) {
    const parts = sentence.split(" ")
        .map((part: string, index: number, arr: string[]) => {
            if (part === "g") return yellow("g");
            if (index > 0 && arr[index - 1] === "g" && !part.endsWith(":")) return magenta(part);
            
            return part;
        });

    console.log(parts.join(" "));
}
export default async function helpCommand (args: string[], { options }: CLICommandOptions) {
    const workdir = process.cwd() as FilePath;
    const project = await Project.fromPath(workdir);
    
    prettyPrint(`g: Code generator by CamiloTDex`);
    prettyPrint(`Main commands:`);
    prettyPrint(`  g init: Create a new project`);
    prettyPrint(`  g plugin: Install plugins`);
    prettyPrint(`  g help: Show this help`);
    prettyPrint(`Project commands:`);
    
    const type = project.type;
    const typePath = getProjectTypePath(type);
    const typeFiles = await readdir(resolve(typePath, "./commands"));
    const typeCommands = typeFiles.map(file => file.replace(".command.ts", ""));

    for (const command of typeCommands) {
        const commandPath = resolve(typePath, "commands", `${command}.command.ts`);
        const content = await readFile(commandPath, "utf-8");
        const possibleUsages = [];

        content.replace(/Usage: (.*)\"/g, (match, usage) => {
            possibleUsages.push(usage);
            return match;
        });
        
        if (possibleUsages.length === 1) {
            prettyPrint(`  - g ${command}: ${possibleUsages[0]}`)
        } else {
            prettyPrint(`  - g ${command}:`)
            for (const usage of possibleUsages) {
                const parts = usage.split(" ");
                prettyPrint(`    - ${usage}`);
            }
        }
    }
}
