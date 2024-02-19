import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
import { FilePath } from "../../lib/types/FilePath.type";
//* Imports

export default async function (project: Project, options: { skipInstall?: boolean } = {}) {
    const pluginPath = await getPluginPath("whatsapp");

    await installTSDependencies([
        "whatsapp-web.js",
        "qrcode-terminal"  
    ], {});

    await project.ensureDir("plugins/whatsapp");
    await project.ensureDir("lib/whatsapp/events");
    
    await copyDir(<FilePath>join(pluginPath, "template"), project.subPath("plugins/whatsapp"));
    await project.generateFileFromTemplate("whatsapp:onIncomingWhatsappMessage.ts", "lib/whatsapp/events/onIncomingWhatsappMessage.whatsapp-event.ts", {});
}