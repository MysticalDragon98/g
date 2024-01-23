import { log } from "termx";
import executeShCommand from "../../../../../lib/modules/sh/executeShCommand";

export async function installTSDependencies (dependencies: string[]) {
    log(`Installing dependencies: ${dependencies.join(", ")}`);
    await executeShCommand(`yarn add ${dependencies.join(" ")}`);
}