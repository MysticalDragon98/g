import { join } from "path";
import Project from "../../../lib/classes/Project.class";
//* Imports

export default async function modelCommand (project: Project, args: string[], options: any) {
    const [ modelName ] = args;
    const file = await project.subPath(join("lib/mongo/models", modelName + ".mongo-model.ts"))
    
    await project.generateFileFromTemplate("mongo:model.ts", file, {
        modelName
    });

    await project.vscodeOpen(file);
}