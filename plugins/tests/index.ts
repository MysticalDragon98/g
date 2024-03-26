import Project from "../../lib/classes/Project.class";
import transformJsonFile from "../../lib/modules/fs/transformJsonFile";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
//* Imports

export default async function (project: Project, options: any) {
    await installTSDependencies([
        "mocha",
        "@types/mocha",
    ]);

    await transformJsonFile(project.subPath("package.json"), (json) => {
        json.mocha = {
            require: "ts-node/register"
        };

        json.scripts.test = "mocha test/**/*.ts";

        return json;
    });

    await project.ensureDir("test/mock");
    await project.ensureDir("test/unit");
}