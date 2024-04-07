import { log } from "termx";
import Project from "../../classes/Project.class";
import parseHandlebarsTemplate from "../templates/parseHandlebarsTemplate";

export interface ITemplateGeneratorOptions {
    template: string;
    target: string;
    data: <T>(args: string[], options: T) => any | Promise<any>;
    usage: string;

    open?: boolean;
}

export default function templateGenerator<T> (generatorOptions: ITemplateGeneratorOptions) {
    const { template, target, data, open } = generatorOptions;

    return async (project: Project, args: string[], options: T) => {
        let handlebarsData = await data(args, options);
        let path = parseHandlebarsTemplate(target, handlebarsData);

        await project.ensureDir(path.split("/").slice(0, -1).join("/"));
        await project.generateFileFromTemplate(template, path, handlebarsData);

        if (open !== false) {
            await project.vscodeOpen(path);
        }

        log(`Successfully created ${path}.`);
    };
}