import { writeFile } from "fs/promises";
import { FilePath } from "../../types/FilePath.type";
import { log } from "termx";

export default async function createFile (path: FilePath, content?: string) {
    log(`Creating file ${path}...`);

    await writeFile(path, content ?? "");
}
