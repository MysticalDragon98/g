import { join } from "path";
import Paths from "../../const/Paths.const";
import { PluginID } from "../../types/PluginID.type";
import { FilePath } from "../../types/FilePath.type";

export default function getPluginPath (plugin: PluginID | string) {
    return join(Paths.plugins, plugin) as FilePath;
}
