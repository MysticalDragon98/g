import getPluginList from "./getPluginList";
import getPluginMetadata from "./getPluginMetadata";

export default async function getPluginsMetadata () {
    const pluginList = await getPluginList();
    const metadata = await Promise.all(pluginList.map(getPluginMetadata));
    return metadata;
}