//* Imports

import { join } from "path";
import Paths from "../../const/Paths.const";
import { PluginID } from "../../types/PluginID.type";
import { FilePath } from "../../types/FilePath.type";
import { access } from "fs/promises";

export default async function pluginExists (pluginId: PluginID) {
    const pluginDir = join(Paths.plugins, pluginId) as FilePath;

    try {
        await access(pluginDir);
        return true;
    } catch (e) {
        return false;
    }
}