import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import {installTSDependencies} from "../../project-types/ts/lib/modules/utils/installTSDependencies";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = getPluginPath("whapp");
    

    await project.installPlugin("http");
    await project.installPlugin("http-proxies");
    await project.installPlugin("validation");
    await project.installPlugin("mongo");
    await installTSDependencies([ "axios" ]);

    await project.addEnvvar("WHAPP_PHONE_ID", { required: true });
    await project.addEnvvar("META_TOKEN", { required: true });
    await project.addEnvvar("WHAPP_WEBHOOKS_CHALLENGE", { required: true });
    await project.ensureDir("plugins/whapp");
    await project.ensureDir("lib/whapp");
    await project.ensureDir("lib/whapp/states");
    await project.ensureDir("lib/whapp/file-templates");
    await project.ensureDir("lib/whapp/enum");

    await project.generateFileFromTemplate("whapp:conversation-state.enum.ts", "lib/whapp/enum/ConversationState.enum.ts", {});
    await project.generateFileFromTemplate("whapp:templates.ts", "lib/whapp/templates.ts", {});

    await copyDir(join(pluginPath, "template"), project.subPath("plugins/whapp"));
}