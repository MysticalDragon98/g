import { exec } from "child_process";
import { FilePath } from "../../types/FilePath.type";

export default async function copyDir (from: FilePath | string, to: FilePath | string) {
    await exec(`cp -r "${from}/"* "${to}"`);
}
