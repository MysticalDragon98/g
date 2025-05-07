import { WhatsappMessageInteractivePayload } from "../../../types/WhatsappMessageInteractivePayload";
import { WhatsappMessageType } from "../../enum/WhatsappMessageType.enum";
import onConversationMessage from "../conversations/onConversationMessage";
import saveIncomingMessage from "../messages/saveIncomingMessage";

export default async function onWhatsappInteractiveMessageReceived (phone: string, interactive: WhatsappMessageInteractivePayload['interactive']) {
    await saveIncomingMessage(phone, WhatsappMessageType.Interactive, interactive);
    await onConversationMessage(phone, interactive.button_reply.id);
}