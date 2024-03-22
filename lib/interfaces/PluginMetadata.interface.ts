import { PluginID } from "../types/PluginID.type";
import { ProjectType } from "../types/ProjectType.type";

export default interface IPluginMetadata {
    id: PluginID;
    name: string;
    projectTypes: ProjectType[];
}