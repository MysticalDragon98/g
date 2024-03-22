import { readdir } from "fs/promises";
import { ProjectType } from "../../types/ProjectType.type";
import Paths from "../../const/Paths.const";

export default async function getProjectTypeList () {
    const files = await readdir(Paths.projectTypes);

    return files.map(file => file.replace(".plugin", "")) as ProjectType[];
}