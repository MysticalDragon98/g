import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { FilePath } from "../../lib/types/FilePath.type";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
import insertTagLine from "../../lib/modules/fs/insertTagLine";
import http from "../http";
import createFile from "../../lib/modules/fs/createFile";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = await getPluginPath("http.sockets");
    const httpIndex = join(await getPluginPath("http"), "initHTTPServer.ts");

    await installTSDependencies([ "socket.io" ]);

    await project.ensureDir("lib/http/sockets");
    await project.ensureDir("plugins/http.sockets");

    await createFile(project.subPath("lib/http/sockets/namespaces.ts"), "import Namespace from '../../../plugins/http.sockets/namespace';\n\n");

    await copyDir(
        <FilePath>join(pluginPath, "template"),
        project.subPath("plugins/http.sockets")
    );

    await insertTagLine(
        <FilePath>httpIndex,
        "Imports",
        "import setupNotificationService from '../http.sockets/setupNotificationService';"
    );

    await insertTagLine(
        <FilePath>httpIndex,
        "Plugins",
        "setupNotificationService(server.httpServer.server)"
    );
}