import { WhatsappMessageType } from "../lib/enum/WhatsappMessageType.enum"

export type WhatsappMessageTextPayload = {
    from: string,
    id: string,
    timestamp: string,
    text: { body: string },
    type: WhatsappMessageType.Text
}