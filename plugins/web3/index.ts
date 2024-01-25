import { join } from "path";
import Project from "../../lib/classes/Project.class";
import copyDir from "../../lib/modules/fs/copyDir";
import getPluginPath from "../../lib/modules/plugins/getPluginPath";
import { FilePath } from "../../lib/types/FilePath.type";
import { PluginID } from "../../lib/types/PluginID.type";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
//* Imports

export default async function (project: Project, options: any) {
    const pluginPath = getPluginPath(<PluginID>"web3");

    await installTSDependencies([
        "web3",
        "@truffle/hdwallet-provider",
    ]);

    await project.addEnvvar("ETH_PROVIDER", { required: true });
    await project.addEnvvar("ETH_PRIVKEY" , { required: true });
    await project.addEnvvar("ETH_ADDRESS" , { required: true });

    await project.ensureDir("plugins/web3");
    await project.ensureDir("lib/web3/contracts");
    await project.ensureDir("lib/web3/abi");
    
    await copyDir(<FilePath>join(pluginPath, "template"), project.subPath("plugins/web3"));
}