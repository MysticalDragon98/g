import { resolve } from "path";
import { CommandHandler } from "../../../types/CommandHandler";

export async function getCommandHandler (command: string) {
    const stateHandlerPath = resolve(__dirname, `../../../../../lib/whapp/commands/${command}.whapp-command.ts`);
    const module = await import(stateHandlerPath).catch((exc) => {
        if (exc.code !== "MODULE_NOT_FOUND") throw exc;

        return {
            default: {}
        };
    });

    return module.default as CommandHandler;
}