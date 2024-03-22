import { join } from "path";
import IProjectTypeMetadata from "../../interfaces/ProjectTypeMetadata.interface";
import { FilePath } from "../../types/FilePath.type";
import { ProjectType } from "../../types/ProjectType.type";
import getProjectTypePath from "./getProjectTypePath";
import fileExists from "../fs/fileExists";
import { ok } from "assert";

export default async function getProjectTypeMetadata (projectType: ProjectType): Promise<IProjectTypeMetadata> {
    const pluginPath = getProjectTypePath(projectType);
    const metadataPath = join(pluginPath + "/project-type.json") as FilePath;

    ok(await fileExists(metadataPath), `Project type metadata not found: ${metadataPath}`);

    const data = require(metadataPath);
    return data;
}