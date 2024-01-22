import { join } from "path";
import { FilePath } from "../../types/FilePath.type";
import { ProjectType } from "../../types/ProjectType.type";
import Paths from "../../const/Paths.const";
import { access } from "fs/promises";

export default async function projectTypeExists (projectType: ProjectType) {
    const projectTypeDir = join(Paths.projectTypes, projectType) as FilePath;

    try {
        await access(projectTypeDir);
        return true;
    } catch (e) {
        return false;
    }
}
