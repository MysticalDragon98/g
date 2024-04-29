import Project from "../../classes/Project.class";
import templateGenerator, { ITemplateGeneratorOptions } from "./templateGenerator";

export default function templateGenerators (options: ITemplateGeneratorOptions<any>[]) {
    const fns = [];
    for (const option of options) {
        fns.push(templateGenerator(option));
    }

    return async function (project: Project, args: string[], options: any) {
        for (const fn of fns) {
            await fn(project, args, options);
        }
    }
}