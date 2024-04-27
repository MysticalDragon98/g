import { FilePath } from "../../types/FilePath.type";
import exec from "../sh/exec";
import getShellName from "../sh/getShellName";

export default async function vscodeOpen (path: FilePath, { line = 0, character = 0 }: { line?: number, character?: number } = {}) {
    try {
        const consoleName = getShellName();

        if (consoleName === "code") {
            if (line || character) {
                await exec(`code -g "${path}:${line}:${character}"`)
            } else {
                await exec(`code "${path}"`);
            }
        } else if (consoleName === "java") {
            if (line || character) {
                await exec(`webstorm --line ${line} --column ${character} ${path}`)
            } else {
                await exec(`webstorm ${path}`);
            }
        }
    } catch (error) {
        console.error(error);
    }
}
