import { WhatsappMessageType } from "../enum/WhatsappMessageType.enum"

export type WhatsappMessageDocumentPayload = {
    from: string,
    id: string,
    timestamp: string,
    type: WhatsappMessageType.Document,
    document: {
        filename: string,
        mime_type: string,
        sha256: string,
        id: string
    }
}