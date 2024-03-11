import { join } from "path";
import Project from "../../../lib/classes/Project.class";
//* Imports

interface Options {
    
}

export default async function crudCommand (project: Project, args: string[], options: Options) {
    const [ modelName ] = args;
    
    const getterFile = join("lib/mongo/crud", modelName, modelName + ".mongo-getter.ts");
    const searchFile = join("lib/mongo/crud", modelName, modelName + ".mongo-search.ts");
    const updateFile = join("lib/mongo/crud", modelName, modelName + ".mongo-update.ts");
    const updateManyFile = join("lib/mongo/crud", modelName, modelName + ".mongo-update-many.ts");
    const deleteFile = join("lib/mongo/crud", modelName, modelName + ".mongo-delete.ts");
    const deleteManyFile = join("lib/mongo/crud", modelName, modelName + ".mongo-delete-many.ts");
    const createFile = join("lib/mongo/crud", modelName, modelName + ".mongo-create.ts");
    const aggregateFile = join("lib/mongo/crud", modelName, modelName + ".mongo-aggregate.ts");
    const findFile = join("lib/mongo/crud", modelName, modelName + ".mongo-find.ts");

    await project.ensureDir(join("lib/mongo/crud", modelName));

    await project.generateFileFromTemplate("mongo:getter.ts", getterFile, {
        name: modelName,
        field: "_id",
        fieldType: "ObjectId",
        isFieldObjectId: true
    });

    await project.generateFileFromTemplate("mongo:search.ts", searchFile, { name: modelName });
    await project.generateFileFromTemplate("mongo:update.ts", updateFile, { name: modelName });
    await project.generateFileFromTemplate("mongo:update-many.ts", updateManyFile, { name: modelName });
    await project.generateFileFromTemplate("mongo:delete.ts", deleteFile, { name: modelName });
    await project.generateFileFromTemplate("mongo:delete-many.ts", deleteManyFile, { name: modelName });
    await project.generateFileFromTemplate("mongo:create.ts", createFile, { name: modelName });
    await project.generateFileFromTemplate("mongo:aggregate.ts", aggregateFile, { name: modelName });
    await project.generateFileFromTemplate("mongo:find.ts", findFile, { name: modelName });
}