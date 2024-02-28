import { ok } from "assert";
import Project from "../../lib/classes/Project.class";
import { installTSDependencies } from "../../project-types/ts/lib/modules/utils/installTSDependencies";
//* Imports

export default async function (project: Project, options: any) {
    ok(project.type === "angular", "This plugin only works with Angular projects.");

    await installTSDependencies([ "d3" ]);
    await installTSDependencies([ "@types/d3" ], { dev: true });
}