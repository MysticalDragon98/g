import { join } from "path";
import Paths from "../../const/Paths.const";
import { FilePath } from "../../types/FilePath.type";

export default function getProjectTypePath (projectType: string) {
    return join(Paths.projectTypes, projectType) as FilePath;
}
