import { readFile, writeFile } from "fs/promises";
import { FilePath } from "../types/FilePath.type";
import { PluginID } from "../types/PluginID.type";
import { ProjectType } from "../types/ProjectType.type";
import { join } from "path";
import getProjectTypePath from "../modules/project-types/getProjectTypePath";
import exec from "../modules/sh/exec";
import fileExists from "../modules/fs/fileExists";
import { log } from "termx";
import parseHandlebarsTemplate from "../modules/templates/parseHandlebarsTemplate";
import vscodeOpen from "../modules/vscode/vscodeOpen";
import getPluginPath from "../modules/plugins/getPluginPath";

export default class Project {

    private constructor (
        public path: FilePath,
        public type: ProjectType,
        public plugins: PluginID[],
        public options: any = {}
    ) {}

    projectTypePath () {
        return getProjectTypePath(this.type);
    }

    pluginPath (plugin: PluginID) {
        return getPluginPath(plugin);
    }

    subPath (path: FilePath | string) {
        return join(this.path, path) as FilePath;
    }

    projectTypeSubPath (path: FilePath | string) {
        return join(this.projectTypePath(), path) as FilePath;
    }

    pluginSubPath (plugin: PluginID, path: FilePath | string) {
        return join(this.pluginPath(plugin), path) as FilePath;
    }

    exec (command: string) {
        return exec(command, this.path);
    }

    vscodeOpen (path: string) {
        return vscodeOpen(this.subPath(path));
    }

    async setOption (key: string, value: any) {
        this.options[key] = value;
        
        await this.save();

        return this;
    }

    async setOptions (options: any) {
        this.options = { ...this.options, ...options };

        await this.save();
        return this;
    }
    async save () {
        await Promise.all([ this.saveProjectFile() ]);
    }

    private async saveProjectFile () {
        const file = {
            type: this.type,
            plugins: this.plugins,
            options: this.options
        };

        await writeFile(join(this.path, "project.json"), JSON.stringify(file, null, 4));
    }

    async getCommand (command: string) {
        if (command.indexOf(":") !== -1) {
            const [ plugin, commandName ] = command.split(":");
            return this.pluginSubPath(plugin as PluginID, `commands/${commandName}.command.ts`);
        }

        return this.projectTypeSubPath(`commands/${command}.command.ts`);
    }


    async hasCommand (command: string) {
        return await this.getCommand(command) !== null;
    }

    async executeCommand (command: string, args: string[], options: any = {}) {
        const commandPath = await this.getCommand(command);
        const commandModule = await import(commandPath) as { default: (project: Project, args: string[], options?: any) => Promise<void> };

        await commandModule.default(this, args, options);
    }

    async ensureDir (path: FilePath | string) {
        log(`Ensuring directory ${this.subPath(path)}...`);
        await exec(`mkdir -p ${this.subPath(path)}`);
    }

    async generateFileFromTemplate (templateName: string, destinationPath: string, data: any = {}) {        
        if (templateName.indexOf(":") !== -1) {
            const [ plugin, template ] = templateName.split(":");
            return this.generateFileFromPluginTemplate(plugin as PluginID, template, destinationPath, data);
        }
        log(`Generating file ${destinationPath} from template ${templateName}...`);

        const templatePath = this.projectTypeSubPath(`file-templates/${templateName}`);
        const template = await readFile(templatePath, "utf-8");
        const content = parseHandlebarsTemplate(template, data);

        await writeFile(this.subPath(destinationPath), content);
    }

    async generateFileFromPluginTemplate (plugin: PluginID, templateName: string, destinationPath: string, data: any = {}) {
        log(`Generating file ${destinationPath} from template ${plugin}:${templateName}...`);
        const templatePath = this.pluginSubPath(plugin, `file-templates/${templateName}`);
        const template = await readFile(templatePath, "utf-8");
        const content = parseHandlebarsTemplate(template, data);

        await writeFile(this.subPath(destinationPath), content);
    }

    public static async fromPath (path: FilePath): Promise<Project> {
        const file = await readFile(join(path, "project.json"), "utf-8");
        const { type, plugins } = JSON.parse(file);

        return new Project(path, type, plugins);
    }

    public static async init (path: FilePath, type: ProjectType): Promise<Project> {
        const plugins = [];

        return new Project(path, type, plugins);
    }

    public static async isProject (path: FilePath): Promise<boolean> {
        try {
            await readFile(join(path, "project.json"), "utf-8");
            return true;
        } catch (e) {
            return false;
        }
    }
}
