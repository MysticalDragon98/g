import { log } from "termx";
import Project from "../../classes/Project.class";
import { $ok } from "../../exceptions";
import CLICommandOptions from "../../interfaces/CLICommandOptions.interface";
import { FilePath } from "../../types/FilePath.type";
import { ProjectType } from "../../types/ProjectType.type";
import projectTypeExists from "../project-types/projectTypeExists";
import { join } from "path";
import Paths from "../../const/Paths.const";

export default async function initCommand (args: string[], { options }: CLICommandOptions) {
    const [ projectType ] = args as [ProjectType];
    const workdir = process.cwd() as FilePath;
    const projectTypePath = await join(Paths.projectTypes, projectType);

    $ok(projectType, `Project type not specified.`);
    $ok(await projectTypeExists(projectType), `Project type ${projectType} does not exist.`);
    $ok(!await Project.isProject(workdir), `Project already exists in ${workdir}.`);

    const project = await Project.init(workdir, projectType);
    await project.save();

    const projectInitializer = await import(join(projectTypePath, "index.ts")) as { default: (project: Project, options?: any) => Promise<void> };
    await projectInitializer.default(project, options);

    log(`Successfully initialized ${projectType} project in ${workdir}.`);
}
