import { ok } from "assert";
import Project from "../../../lib/classes/Project.class";
import { ComponentType } from "../../../lib/enum/ComponentType.enum";
import { join } from "path";
import ensureDir from "../../../lib/modules/fs/ensureDir";
import { readFile, writeFile } from "fs/promises";
import DATADIR from "../../../lib/const/DATA_DIR.const";
import fileExists from "../../../lib/modules/fs/fileExists";
import { FilePath } from "../../../lib/types/FilePath.type";
import { log } from "termx";
//* Imports

export default async function fetchCommand (project: Project, [ type, name ]: [ ComponentType, string ], options: any) {
    ok(type && name, "Usage: g fetch <type> <name>");

    switch (type) {
        case ComponentType.Type:
            var originPath = join(DATADIR, "types", `${name}.type.ts`);
            var destinationFolder = project.subPath(`src/types`);
            var destinationFile = join(destinationFolder, `${name}.type.ts`) as FilePath;

            ok(await fileExists(originPath as FilePath), `Type ${name} does not exist.`);
            ok(!await fileExists(destinationFile), `Type ${name} already exists.`);

            await ensureDir(destinationFolder);
            var content = await readFile(originPath);
            await writeFile(destinationFile, content);

            log(`Successfully fetched type ${name}.`);
            break;
        case ComponentType.Enum:
            var originPath = join(DATADIR, "enum", `${name}.enum.ts`);
            var destinationFolder = project.subPath(`src/enum`);
            var destinationFile = join(destinationFolder, `${name}.enum.ts`) as FilePath;

            ok(await fileExists(originPath as FilePath), `Enum ${name} does not exist.`);
            ok(!await fileExists(destinationFile), `Enum ${name} already exists.`);

            await ensureDir(destinationFolder);
            var content = await readFile(originPath);
            await writeFile(destinationFile, content);

            log(`Successfully fetched enum ${name}.`);
            break;
    }
}