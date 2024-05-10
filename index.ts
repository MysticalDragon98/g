#!/usr/bin/env node

import executeCLICommand from "./lib/modules/cli/executeCLICommand";
import Minimist from "minimist";
//* Imports


async function main () {
    const minimistArgs = Minimist(process.argv.slice(2), {
        boolean: ["type", "plugin"]
    });

    await executeCLICommand(minimistArgs._, {
        options: minimistArgs,
    }); 
}

main().catch(console.log);

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);
