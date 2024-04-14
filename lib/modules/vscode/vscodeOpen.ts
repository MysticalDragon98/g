import { FilePath } from "../../types/FilePath.type";
import exec from "../sh/exec";

export default async function vscodeOpen (path: FilePath, { line = 0, character = 0 }: { line?: number, character?: number } = {}) {
    try {
        if (line || character) {
            await exec(`code -g "${path}:${line}:${character}"`)
        } else {
            await exec(`code "${path}"`);
        }
    } catch (error) {
    }
}
