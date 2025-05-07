import { WhatsappMessageType } from "../enum/WhatsappMessageType.enum"
import { string } from "./string.type"

export type WhatsappMessageLocationPayload = {
    from: string,
    id: string,
    timestamp: string,
    type: WhatsappMessageType.Location,
    location: {
        latitude: number,
        longitude: number,
        type: "location"
    }
}