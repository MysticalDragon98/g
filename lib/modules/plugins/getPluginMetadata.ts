import { join } from "path";
import IPluginMetadata from "../../interfaces/PluginMetadata.interface";
import { PluginID } from "../../types/PluginID.type";
import getPluginPath from "./getPluginPath";
import fileExists from "../fs/fileExists";
import { FilePath } from "../../types/FilePath.type";
import { ok } from "assert";

export default async function getPluginMetadata (pluginId: PluginID): Promise<IPluginMetadata> {
    const pluginPath = getPluginPath(pluginId);
    const metadataPath = join(pluginPath + "/plugin.json") as FilePath;

    ok(await fileExists(metadataPath), `Plugin metadata not found: ${metadataPath}`);

    const data = require(metadataPath);

    return {
        id: pluginId,
        name: data.name,
        projectTypes: data.projectTypes || [],
    };
}