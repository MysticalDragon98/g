import { join } from "path";
import Project from "../../../lib/classes/Project.class";
import { ComponentType } from "../../../lib/enum/ComponentType.enum";
import DATADIR from "../../../lib/const/DATA_DIR.const";
import ensureDir from "../../../lib/modules/fs/ensureDir";
import { writeFile, readFile } from "fs/promises";
import { log } from "termx";
//* Imports

export default async function pubCommand (project: Project, [ type, name ]: string[], options: any) {
    switch (type as ComponentType) {
        case ComponentType.Type:
            var originPath = project.subPath(`lib/types/${name}.type.ts`);
            var destinationFolder = join(DATADIR, "types");

            await ensureDir(destinationFolder);
            var content = await readFile(originPath);
            await writeFile(join(destinationFolder, `${name}.type.ts`), content);

            log(`Successfully published type ${name}.`);
            break;
        case ComponentType.Enum:
            var originPath = project.subPath(`lib/enum/${name}.enum.ts`);
            var destinationFolder = join(DATADIR, "enum");

            await ensureDir(destinationFolder);
            var content = await readFile(originPath);
            await writeFile(join(destinationFolder, `${name}.enum.ts`), content);

            log(`Successfully published enum ${name}.`);
            break;
    }
}