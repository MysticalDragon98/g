import Project from "../../lib/classes/Project.class";
import createFile from "../../lib/modules/fs/createFile";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
//* Imports

export default async function (project: Project, options: any) {
    await installTSDependencies([
        "@coretools/inspector"
    ]);

    await project.ensureDir("lib/logger")
    await project.generateFileFromTemplate("logger:loggers.ts", "lib/logger/loggers.ts", {});
}