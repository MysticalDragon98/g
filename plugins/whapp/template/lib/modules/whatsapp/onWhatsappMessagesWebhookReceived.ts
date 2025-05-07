import { WhatsappMessageButtonPayload } from "../../../types/WhatsappMessageButtonPayload.type";
import { WhatsappMessageDocumentPayload } from "../../../types/WhatsappMessageDocumentPayload.type";
import { WhatsappMessageImagePayload } from "../../../types/WhatsappMessageImagePayload.type";
import { WhatsappMessageInteractivePayload } from "../../../types/WhatsappMessageInteractivePayload";
import { WhatsappMessageLocationPayload } from "../../../types/WhatsappMessageLocationPayload.type";
import { WhatsappMessageTextPayload } from "../../../types/WhatsappMessageTextPayload.type";
import { WhatsappWebhookIncomingMessage } from "../../../types/WhatsappWebhookIncomingMessage.type";
import { WhatsappMessageType } from "../../enum/WhatsappMessageType.enum";
import getConversationByPhoneNumber from "../conversations/getConversationByPhoneNumber";
import updateConversationLastMessageReceivedAt from "../conversations/updateConversationLastMessageReceivedAt";
import normalizeWhatsappPhone from "../utils/normalizeWhatsappPhone";
import onWhatsappButtonReceived from "./onWhatsappButtonReceived";
import onWhatsappDocumentReceived from "./onWhatsappDocumentReceived";
import onWhatsappImageReceived from "./onWhatsappImageReceived";
import onWhatsappInteractiveMessageReceived from "./onWhatsappInteractiveMessageReceived";
import onWhatsappLocationReceived from "./onWhatsappLocationReceived";
import onWhatsappMessageReceived from "./onWhatsappMessageReceived";

export const AlreadyProcessed: any = {};
export default async function onWhatsappMessagesWebhookReceived (message: WhatsappWebhookIncomingMessage) {
    const [ contact ] = message.contacts;

    contact.wa_id = normalizeWhatsappPhone(contact.wa_id);
    
    for (const msg of message.messages) {
        if (AlreadyProcessed[msg.id]) continue;
        
        AlreadyProcessed[msg.id] = true;

        await getConversationByPhoneNumber(contact.wa_id);
        await updateConversationLastMessageReceivedAt(contact.wa_id);

        if (msg.type === WhatsappMessageType.Text) {
            await onWhatsappMessageReceived(contact.wa_id, (msg as WhatsappMessageTextPayload).text.body);
        } else if (msg.type === WhatsappMessageType.Image) {
            await onWhatsappImageReceived(contact.wa_id, (msg as WhatsappMessageImagePayload).image);
        } else if (msg.type === WhatsappMessageType.Interactive) {
            await onWhatsappInteractiveMessageReceived(contact.wa_id, (msg as WhatsappMessageInteractivePayload).interactive);
        } else if (msg.type === WhatsappMessageType.Document) {
            await onWhatsappDocumentReceived(contact.wa_id, (msg as WhatsappMessageDocumentPayload).document);
        } else if (msg.type === WhatsappMessageType.Location) {
            await onWhatsappLocationReceived(contact.wa_id, (msg as WhatsappMessageLocationPayload).location);
        } else if (msg.type === WhatsappMessageType.Button) {
            await onWhatsappButtonReceived(contact.wa_id, { messageId: msg.id, button: (msg as WhatsappMessageButtonPayload).button.payload });
        }
    }
}