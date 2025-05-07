import { WhatsappMessageType } from "../../enum/WhatsappMessageType.enum";
import getConversationByPhoneNumber from "../conversations/getConversationByPhoneNumber";
import saveIncomingMessage from "../messages/saveIncomingMessage";
import { getStateHandler } from "../state-handlers/getStateHandler";

export default async function onWhatsappButtonReceived (from: string, button: { messageId: string, button: string }) {
    const conversation = await getConversationByPhoneNumber(from);

    await saveIncomingMessage(from, WhatsappMessageType.Button, location);
    
    const handler = await getStateHandler(conversation.state);
    // await handler.Button?.(conversation, button);
}