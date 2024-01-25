import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { $ok } from "../../../lib/exceptions";
import toVariableName from "../../../lib/modules/utils/toVariableName";
import { PluginID } from "../../../lib/types/PluginID.type";
//* Imports

export default async function contractCommand (project: Project, args: string[], options: { address?: string, static?: boolean }) {
    const [ contractName ] = args;
    const contractsFolder = "lib/web3/contracts";
    const abiFolder = "lib/web3/abi";

    $ok(contractName, "Usage: g web3:contract [--address <address>] [--static] <contract-name>");

    const contractFile = join(contractsFolder, `${contractName}.contract.ts`);
    const abiFile = join(abiFolder, `${contractName}.abi.json`);
    const envvarName = toVariableName(contractName).toUpperCase() + "_ADDRESS"


    await project.generateFileFromPluginTemplate("web3" as PluginID, "contract.ts", contractFile, {
        name: contractName,
        envvar: envvarName,
        static: options.static
    });
    await project.generateFileFromPluginTemplate("web3" as PluginID, "abi.json", abiFile, {});

    if (options.static) {
        await project.addEnvvar(envvarName, { required: true, default: options.address });
    }

    await project.vscodeOpen(contractFile);
}