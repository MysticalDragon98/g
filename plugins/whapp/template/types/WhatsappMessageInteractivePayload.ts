import { WhatsappInteractiveMessageType } from "../enum/WhatsappInteractiveMessageType.enum"
import { WhatsappMessageType } from "../enum/WhatsappMessageType.enum"
import { WhatsappButtonData } from "./WhatsappButtonData.type"

export type WhatsappMessageInteractivePayload = {
    from: string,
    id: string,
    timestamp: string,
    type: WhatsappMessageType.Interactive,
    interactive: {
        type: WhatsappInteractiveMessageType.ButtonReply,
        button_reply: WhatsappButtonData
    },
    context: {
        from: string,
        id: string
    }
}