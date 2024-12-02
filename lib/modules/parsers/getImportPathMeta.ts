import { resolve } from "path";
import { ComponentType } from "../../enum/ComponentType.enum";

export default function getImportPathMeta (filePath: string, importPath: string) {
    const path = resolve("/" + filePath, "..", importPath);
    const pathParts = path.split("/").filter(part => part[0] !== "." && part !== "");

    switch (pathParts[0]) {
        case "lib":
            switch (pathParts[1]) {
                case "enum": return {
                    type: ComponentType.Enum,
                    name: pathParts[2].replace(".enum", ""),
                    path: pathParts.join("/") + ".ts"
                };

                case "modules": return {
                    type: ComponentType.Function,
                    module: pathParts[2],
                    name: pathParts[3].replace(".ts", ""),
                    path: pathParts.join("/") + ".ts"
                }

                case "mongo":
                    switch (pathParts[2]) {
                        case "models": return {
                            type: ComponentType.MongoModel,
                            name: pathParts[3].replace(".mongo-model", ""),
                            path: pathParts.join("/") + ".mongo-model.ts"
                        }
                    }
            }
            break;
    }
}