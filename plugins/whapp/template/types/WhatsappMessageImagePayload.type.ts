import { WhatsappMessageType } from "../enum/WhatsappMessageType.enum"

export type WhatsappMessageImagePayload = {
    from: string,
    id: string,
    timestamp: string,
    image: {
        mime_type: string,
        sha256: string,
        id: string
    },
    type: WhatsappMessageType.Image
}