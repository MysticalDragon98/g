import { loadCLISettings } from "../../../plugins/cli/lib/modules/settings/loadCLISettings";
import { loadProjectSettings } from "../../../plugins/cli/lib/modules/settings/loadProjectSettings";

interface IOptions {

}

export default async function helpREPLCommand ([ file ]: string[], options: IOptions) {
    const settings = await loadCLISettings();
    const projectSettings = await loadProjectSettings();
    const name = settings.name ?? projectSettings.name ?? "?";
    const tagline = settings.tagline ?? "";
    const version = projectSettings.version;
    const command = settings.command ?? name;
    const description = Array.isArray(settings.description) ?
        settings.description.join("\n") :
        settings.description;
    const usage = Array.isArray(settings.usage)?
        settings.usage :
        settings.usage? [settings.usage] :
        [`${command} [options] [arguments...]`];
    const examples = Array.isArray(settings.examples)?
        settings.examples.join("\n        ") :
        settings.examples;

    console.log(`${name} - ${tagline} [Version ${version}]\n`);
    console.log(`Usage:  ${usage.join("\n        ")}\n`)
    console.log(description, "\n");
    examples && console.log(`Example:\n        ${examples}\n`);
    console.log(`For a listing of available commands, use ${command} help.`);
    console.log(`For help with a specific command, use ${command} help [command].`);

}