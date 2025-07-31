import { log } from "termx";
import executeShCommand from "../../../lib/modules/sh/executeShCommand";

export async function installTSDependencies (dependencies: string[], options: { skipInstall?: boolean, dev?: boolean } = {}) {
    log(`Installing dependencies: ${dependencies.join(", ")}`);

    if (options.skipInstall) {
        /*await transformJsonFile("package.json", (json) => {
            
        });*/
    } else {
        if (options.dev) {
            await executeShCommand(`pnpm add -D ${dependencies.join(" ")}`);
        } else {
            await executeShCommand(`pnpm add ${dependencies.join(" ")}`);
        }
    }
}