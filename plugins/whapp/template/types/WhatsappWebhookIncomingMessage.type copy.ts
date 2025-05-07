import { WhatsappMessageDocumentPayload } from "./WhatsappMessageDocumentPayload.type";
import { WhatsappMessageImagePayload } from "./WhatsappMessageImagePayload.type";
import { WhatsappMessageInteractivePayload } from "./WhatsappMessageInteractivePayload";
import { WhatsappMessageTextPayload } from "./WhatsappMessageTextPayload.type";

export type WhatsappWebhookIncomingMessage = {
    messaging_product: "whatsapp",

    metadata: {
        display_phone_number: string,
        phone_number_id: string
    },

    contacts: {
        profile: { name: string },
        wa_id: string
    }[],

    messages: (
        WhatsappMessageTextPayload |
        WhatsappMessageImagePayload |
        WhatsappMessageInteractivePayload |
        WhatsappMessageDocumentPayload
    )[]
};