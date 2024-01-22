import { access } from "fs/promises";
import { FilePath } from "../../types/FilePath.type";

export default async function dirExists (path: FilePath) {
    try {
        await access(path);
        return true;
    } catch (e) {
        return false;
    }
}
