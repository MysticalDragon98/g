import { MessageStatus } from "../enum/MessageStatus.enum"

export type WhatsappWebhookStatusUpdate = {
    messaging_product: "whatsapp",

    metadata: {
        display_phone_number: string,
        phone_number_id: string
    },
    
    statuses: {
        id: string,
        status: MessageStatus,
        timestamp: string,
        recipient_id: string,
        conversation: {
            id: string,
            origin: {
                type: string
            }
        },
        pricing: {
            billable: boolean,
            pricing_model: "CBP",
            category: "marketing"
        }
    }[]
}