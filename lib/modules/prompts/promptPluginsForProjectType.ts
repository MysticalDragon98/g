import inquirer from "inquirer";
import { ProjectType } from "../../types/ProjectType.type";
import getPluginsMetadata from "../plugins/getPluginsMetadata";

export default async function promptPluginsForProjectType (projectType: ProjectType, message: string) {
    const plugins = await getPluginsMetadata();
    console.log(plugins, projectType)
    const { selectedPlugins } = await inquirer.prompt([
        {
            type: "checkbox",
            name: "selectedPlugins",
            message,
            choices: plugins
                .filter((plugin) => plugin.projectTypes.includes(projectType))
                .map((plugin) => plugin.name)
        }
    ]);

    return plugins.filter((plugin) => selectedPlugins.includes(plugin.name));
}