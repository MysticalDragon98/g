import { getStateHandler } from "../state-handlers/getStateHandler";
import getConversationByPhoneNumber from "./getConversationByPhoneNumber";
import onConversationCommand from "./onConversationCommand";

export default async function onConversationMessage (phone: string, message: string) {
    let conversation = await getConversationByPhoneNumber(phone);

    if (message.startsWith("/")) {
        await onConversationCommand(conversation, message);
        return;
    }

    const handler = await getStateHandler(conversation.state);

    if (message.startsWith(">")) {
        await handler.Button?.(conversation, message.substring(1));
        return;
    }

    handler.Text?.(conversation, message);
}