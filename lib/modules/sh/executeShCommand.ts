import { exec } from "child_process";
import { FilePath } from "../../types/FilePath.type";

export default async function executeShCommand (command: string, { cwd }: { cwd?: FilePath }) {
    return new Promise((resolve, reject) => {
        // Execute the command
        exec(command, { cwd }, (error, stdout, stderr) => {
          if (error) {
            reject(`Error executing command: ${error}`);
            return;
          }
    
          // Resolve the promise with the command's stdout
          resolve(stdout);
        });
      });
}
