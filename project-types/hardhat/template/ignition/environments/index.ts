import { writeFile } from "fs/promises";
import { resolve } from "path";

const [ ,, environmentName ] = process.argv;

async function main () {
    let environment;
    
    try {
        environment = await import(`./${environmentName}.deployment-environment`);
    } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
            throw new Error(`Environment "${environmentName}" not found.`);
        }
    }
    const content = await environment.default();

    await writeFile(resolve(__dirname, "../parameters.json"), JSON.stringify(content, null, 2));
}

main().catch(console.error);