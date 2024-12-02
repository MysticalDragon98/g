import { exec } from "child_process";
import { log } from "termx";

export default async function ensureDir (path: string) {
    if (this) {
        log(`Ensuring directory ${this.subPath(path)}...`);
        await exec(`mkdir -p "${this.subPath(path)}"`);
    } else {
        log(`Ensuring directory ${path}...`);
        await exec(`mkdir -p "${path}"`);
    }
}