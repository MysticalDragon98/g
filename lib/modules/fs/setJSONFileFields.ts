import { FilePath } from "../../types/FilePath.type";
import transformJsonFile from "./transformJsonFile";

export default async function setJSONFileFields (path: FilePath, fields: any) {
    return await transformJsonFile(path, json => {
        return { ...json, ...fields };
    });
}
