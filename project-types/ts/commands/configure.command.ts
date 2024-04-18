import { readFile, writeFile } from "fs/promises";
import Project from "../../../lib/classes/Project.class";
import { parse } from "dotenv";
import inquirer from "inquirer";
//* Imports

const requiredEnvvarRegex = /'Missing required environment variable: (.+?)'/g;

export default async function configureCommand (project: Project, args: string[], options: any) {
    const envPath = project.subPath('lib/env.ts');
    const envFile = await readFile(envPath, 'utf-8');
    const envvars = envFile
        .split('\n')
        .map(line => requiredEnvvarRegex.exec(line))
        .filter(Boolean)
        .map(match => match![1]);
    const dotEnvFile = await readFile(project.subPath('.env'), 'utf-8')
        .catch((exc) => {
            if (exc.code === 'ENOENT') {
                return '';
            }
            throw exc;
        });

    const parsedDotEnv = parse(dotEnvFile);
    const settedEnvvars = Object.keys(parsedDotEnv);
    const missingEnvvars = envvars.filter(envvar => !settedEnvvars.includes(envvar));

    for (const envvar of missingEnvvars) {
        const { value } = await inquirer.prompt([
            {
                type: 'input',
                name: 'value',
                message: `Enter value for the envvar ${envvar}:`
            }
        ]);

        parsedDotEnv[envvar] = value;
    }

    await writeFile(project.subPath('.env'), Object.entries(parsedDotEnv).map(([key, value]) => `${key}=${value}`).join('\n'));
    await project.vscodeOpen('.env');
}