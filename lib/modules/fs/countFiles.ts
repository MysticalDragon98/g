import { readdir } from "fs/promises";

export default async function countFiles (path: string) {
    const files = await readdir(path);

    return files.length;
}