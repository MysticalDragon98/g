import { readFile, writeFile } from "fs/promises";
import { FilePath } from "../../types/FilePath.type";

export default async function transformJsonFile (path: FilePath, transform: (json: any) => any) {
    const content = await readFile(path, "utf-8");
    const json = JSON.parse(content);
    const newJson = await transform(json);

    await writeFile(path, JSON.stringify(newJson, null, 4));
}
