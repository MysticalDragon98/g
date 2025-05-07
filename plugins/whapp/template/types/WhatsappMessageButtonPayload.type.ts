import { WhatsappMessageType } from "../enum/WhatsappMessageType.enum";
import { string } from "./string.type"

export type WhatsappMessageButtonPayload = {
    from: string;
    id: string;
    timestamp: string;
    type: WhatsappMessageType.Button;
    button: {
        payload: string;
        text: string;
    }
}