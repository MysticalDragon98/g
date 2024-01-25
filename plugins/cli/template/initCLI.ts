import executeCLICommand from "./lib/modules/commands/executeCLICommand";
import Minimist from "minimist";
//* Imports


export default async function initCLI (options: { boolean?: boolean[] }) {
    const minimistArgs = Minimist(process.argv.slice(2), {
        boolean: options.boolean
    });

    await executeCLICommand(minimistArgs._, {
        options: minimistArgs,
    }); 
}