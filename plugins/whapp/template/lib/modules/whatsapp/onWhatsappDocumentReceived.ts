import { WhatsappMessageDocumentPayload } from "../../../types/WhatsappMessageDocumentPayload.type";
import { WhatsappMessageType } from "../../enum/WhatsappMessageType.enum";
import getConversationByPhoneNumber from "../conversations/getConversationByPhoneNumber";
import saveIncomingMessage from "../messages/saveIncomingMessage";
import { getStateHandler } from "../state-handlers/getStateHandler";

export default async function onWhatsappDocumentReceived (from: string, document: WhatsappMessageDocumentPayload['document']) {
    const conversation = await getConversationByPhoneNumber(from);

    await saveIncomingMessage(from, WhatsappMessageType.Document, document);
    const handler = await getStateHandler(conversation.state);
    
    handler.Document?.(conversation, document);
}