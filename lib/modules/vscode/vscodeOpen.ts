import { FilePath } from "../../types/FilePath.type";
import exec from "../sh/exec";

export default async function vscodeOpen (path: FilePath) {
    try {
        await exec(`code "${path}"`);
    } catch (error) {
    }
}
