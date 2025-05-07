import { resolve } from "path";
import { ConversationState } from "../../../../../lib/whapp/enum/ConversationState.enum";
import { StateHandler } from "../../../types/StateHandler";

export async function getStateHandler (state: ConversationState) {
    const stateHandlerPath = resolve(__dirname, `../../../../../lib/whapp/states/${state}.whapp-state.ts`);
    const module = await import(stateHandlerPath).catch((exc) => {
        if (exc.code !== "MODULE_NOT_FOUND") throw exc;

        return {
            default: {}
        };
    });

    return module.default as StateHandler;
}