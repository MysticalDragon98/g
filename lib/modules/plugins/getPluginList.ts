import { readdir } from "fs/promises";
import { PluginID } from "../../types/PluginID.type";
import Paths from "../../const/Paths.const";

export default async function getPluginList (): Promise<PluginID[]> {
    const files = await readdir(Paths.plugins);

    return files.map(file => file.replace(".plugin", "")) as PluginID[];
}