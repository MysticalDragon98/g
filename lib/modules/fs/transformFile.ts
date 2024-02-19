import { readFile, writeFile } from "fs/promises";
import { FilePath } from "../../types/FilePath.type";

export default async function transformFile (path: FilePath, transform: (buf: Buffer) => Buffer | string | Uint8Array) {
    const content = await readFile(path);
    const newContent = await transform(content);

    await writeFile(path, newContent);
}
