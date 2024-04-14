import { join } from "path";
import Project from "../../../lib/classes/Project.class";
//* Imports

export default async function modelCommand (project: Project, args: string[], options: any) {
    const [ modelName ] = args;
    const file = join("lib/mongo/models", modelName + ".mongo-model.ts");
    
    await project.generateFileFromTemplate("mongo:model.ts", file, {
        name: modelName
    });

    await project.vscodeOpen(file, {
        line: 6,
        character: 5
    });
}