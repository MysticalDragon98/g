import { join } from "path";
import Project from "../../../lib/classes/Project.class";
//* Imports

export default async function getterCommand (project: Project, args: string[], options: { field?: string, fieldType?: string }) {
    const [ modelName ] = args;
    const file = join("lib/mongo/crud", modelName, modelName + ".mongo-getter.ts");

    await project.ensureDir(join("lib/mongo/crud", modelName));

    await project.generateFileFromTemplate("mongo:getter.ts", file, {
        name: modelName,
        field: options.field || "_id",
        fieldType: options.fieldType || "ObjectId",
        isFieldObjectId: !options.fieldType || (options.fieldType === "ObjectId")
    });

    await project.vscodeOpen(file);
}