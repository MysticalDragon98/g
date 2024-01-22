import { access } from "fs/promises";
import { FilePath } from "../../types/FilePath.type";

export default async function fileExists (path: FilePath) {
    try {
        await access(path);
        return true;
    } catch (e) {
        return false;
    }
}
