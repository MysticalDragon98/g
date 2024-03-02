import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import { FilePath } from "../../lib/types/FilePath.type";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { PluginID } from "../../lib/types/PluginID.type";
import vscodeOpen from "../../lib/modules/vscode/vscodeOpen";
import { randomUUID } from "crypto";
//* Imports

export default async function (project: Project, options: any) {
    await installTSDependencies(["jsonwebtoken"]);
    await installTSDependencies(["@types/jsonwebtoken"], { dev: true });

    await project.ensureDir("plugins/jwt");
    await project.addEnvvar("JWT_SECRET", {
        required: true,
        envDefault: randomUUID()
    });

    await copyDir(<FilePath>join(getPluginPath("jwt" as PluginID), "template"), project.subPath("plugins/jwt"));
    await vscodeOpen(project.subPath(".env"));
}