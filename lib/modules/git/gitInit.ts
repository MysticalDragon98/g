import { exec } from "child_process";
import { FilePath } from "../../types/FilePath.type";
import { log } from "termx";

export default async function gitInit (path: FilePath) {
    //* Initialize git repository in project directory
    log(`Initializing git repository in ${path}...`);
    
    await exec(`git init ${path}`);
}
