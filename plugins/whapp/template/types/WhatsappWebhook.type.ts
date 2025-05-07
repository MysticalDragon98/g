import { WhatsappWebhookEntry } from "./WhatsappWebhookEntry.type"

export type WhatsappWebhook = {
    object: 'whatsapp_business_account',
    entry: WhatsappWebhookEntry[]
}