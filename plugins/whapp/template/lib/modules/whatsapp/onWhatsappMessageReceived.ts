import { WhatsappMessageTextPayload } from "../../../types/WhatsappMessageTextPayload.type";
import { WhatsappMessageType } from "../../enum/WhatsappMessageType.enum";
import onConversationMessage from "../conversations/onConversationMessage";
import saveIncomingMessage from "../messages/saveIncomingMessage";

export default async function onWhatsappMessageReceived (from: string, message: string) {
    await saveIncomingMessage(from, WhatsappMessageType.Text, <WhatsappMessageTextPayload['text']>{ body: message });
    await onConversationMessage(from, message);
}