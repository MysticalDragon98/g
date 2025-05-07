import { Conversation } from "../../mongo/models/conversation.mongo-model";
import { getCommandHandler } from "../state-handlers/getCommandHandler";
import sendWhatsappTextMessage from "../whatsapp/sendWhatsappTextMessage";
import { ConversationState } from "../../../../../lib/whapp/enum/ConversationState.enum";
import setConversationState from "./setConversationState";

export default async function onConversationCommand (conversation: Conversation, message: string) {
    const [command, ...args] = message.substring(1).split(" ");
    const handler = await getCommandHandler(command);

    if (command === "restart") {
        await setConversationState(conversation, ConversationState.None);
        return;
    }

    if (handler.canActivate) {
        if (!await handler.canActivate(conversation, command, args)) {
            return;
        }
    }

    await handler.exec(conversation, args).catch(exc => {
        sendWhatsappTextMessage(conversation.phone, exc.message, []);
    });
}