import { exec } from "child_process";
import { FilePath } from "../../types/FilePath.type";

export default async function copyDir (from: FilePath, to: FilePath) {
    await exec(`cp -r ${from}/* ${to}`);
}
