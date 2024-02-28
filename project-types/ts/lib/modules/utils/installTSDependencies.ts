import { log } from "termx";
import executeShCommand from "../../../../../lib/modules/sh/executeShCommand";
import transformJsonFile from "../../../../../lib/modules/fs/transformJsonFile";

export async function installTSDependencies (dependencies: string[], options: { skipInstall?: boolean, dev?: boolean } = {}) {
    log(`Installing dependencies: ${dependencies.join(", ")}`);

    if (options.skipInstall) {
        /*await transformJsonFile("package.json", (json) => {
            
        });*/
    } else {
        if (options.dev) {
            await executeShCommand(`yarn add -D ${dependencies.join(" ")}`);
        } else {
            await executeShCommand(`yarn add ${dependencies.join(" ")}`);
        }
    }
}