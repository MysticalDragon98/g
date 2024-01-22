import { FilePath } from "../../types/FilePath.type";
import executeShCommand from "./executeShCommand";

export default async function exec (command: string, cwd?: FilePath) {
    return await executeShCommand(command, { cwd });
}
