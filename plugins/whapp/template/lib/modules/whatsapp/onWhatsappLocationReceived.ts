import { WhatsappLocation } from "../../../types/WhatsappLocation.type";
import { WhatsappMessageType } from "../../enum/WhatsappMessageType.enum";
import getConversationByPhoneNumber from "../conversations/getConversationByPhoneNumber";
import saveIncomingMessage from "../messages/saveIncomingMessage";
import { getStateHandler } from "../state-handlers/getStateHandler";

export default async function onWhatsappLocationReceived (from: string, location: WhatsappLocation) {
    const conversation = await getConversationByPhoneNumber(from);

    await saveIncomingMessage(from, WhatsappMessageType.Location, location);
    
    const handler = await getStateHandler(conversation.state);
    await handler.Location?.(conversation, location);
}