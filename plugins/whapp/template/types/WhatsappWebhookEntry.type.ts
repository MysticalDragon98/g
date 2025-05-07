import { WhatsappWebhookIncomingMessage } from "./WhatsappWebhookIncomingMessage.type"
import { WhatsappWebhookStatusUpdate } from "./WhatsappWebhookStatusUpdate.type"

export type WhatsappWebhookEntry = {
    id: string,
    changes: {
        value: WhatsappWebhookIncomingMessage | WhatsappWebhookStatusUpdate,
        field: string
    }[]
}