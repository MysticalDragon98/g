import { log } from "termx";
import Project from "../../classes/Project.class";
import parseHandlebarsTemplate from "../templates/parseHandlebarsTemplate";

export interface ITemplateGeneratorOptions<T> {
    template: string;
    target: string;
    data: <T>(args: string[], options: T) => any | Promise<any>;
    usage: string;

    open?: boolean;
    line?: number;
    character?: number;

    afterGenerate? : (project: Project, data: any, { target }: { target: string }) => any | Promise<any>;
    beforeGenerate?: (project: Project, data: any, { target }: { target: string }) => any | Promise<any>;
}

export default function templateGenerator<T> (generatorOptions: ITemplateGeneratorOptions<T>) {
    const { template, target, data, open } = generatorOptions;

    return async (project: Project, args: string[], options: T) => {
        let handlebarsData = await data(args, options);
        let path = parseHandlebarsTemplate(target, handlebarsData);

        if (generatorOptions.beforeGenerate) {
            await generatorOptions.beforeGenerate(project, handlebarsData, { target: path });
        }

        await project.ensureDir(path.split("/").slice(0, -1).join("/"));
        await project.generateFileFromTemplate(template, path, handlebarsData);

        if (generatorOptions.afterGenerate) {
            await generatorOptions.afterGenerate(project, handlebarsData, { target: path });
        }

        if (open !== false) {
            await project.vscodeOpen(path, {
                line: generatorOptions.line,
                character: generatorOptions.character
            });
        }

        log(`Successfully created ${path}.`);
    };
}