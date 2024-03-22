import inquirer from "inquirer";
import getProjectTypesMetadata from "../project-types/getProjectTypesMetadata";

export default async function promptProjectType (message: string) {
    const projectTypes = await getProjectTypesMetadata();
    const { type } = await inquirer.prompt([
        {
            type: "list",
            name: "type",
            message,
            default: "Typescript",
            choices: projectTypes.map((projectType) => projectType.name),
            loop: false
        }
    ]);

    return projectTypes.find((projectType) => projectType.name === type);
}