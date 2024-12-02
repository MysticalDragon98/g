import Project from "../../lib/classes/Project.class";
import transformJsonFile from "../../lib/modules/fs/transformJsonFile";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
//* Imports

const TSCONFIG_EXCLUDE = "**/*.test.ts";

export default async function (project: Project, options: any) {
    await installTSDependencies([
        "jest",
        "@types/jest",
        "ts-jest"
    ], { dev: true });

    await transformJsonFile(project.subPath("tsconfig.json"), (json) => {
        if (!json.exclude.includes(TSCONFIG_EXCLUDE)) {
            json.exclude.push(TSCONFIG_EXCLUDE);
        }

        return json;
    });

    await transformJsonFile(project.subPath("package.json"), (json) => {
        json.scripts.test = "jest";

        return json;
    });

    await project.exec("pnpm ts-jest config:init");

    await project.ensureDir("__tests__/mock");
    await project.ensureDir("__tests__/samples");
    await project.ensureDir("__tests__/unit");
}