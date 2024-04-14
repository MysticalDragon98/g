import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import templateGenerator from "../../../lib/modules/generators/templateGenerator";
//* Imports

export default async function styleCommand (project: Project, [ name ]: string[], options: { chalk: boolean }) {
    await project.ensureDir("lib/styles");

    ok(name, "Usage: g style <style-name>");

    await templateGenerator({
        target: "lib/styles/{{varCap name}}.style.ts",
        data: ([ name ]) => ({
            name,
            chalk: options.chalk
        }),
        template: "style.ts",
        usage: "g style <style-name>",
        open: true
    })(project, [ name ], options);
}