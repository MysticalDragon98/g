import { MessageDirection } from "../../enum/MessageDirection.enum";
import { MessageStatus } from "../../enum/MessageStatus.enum";
import { WhatsappMessageType } from "../../enum/WhatsappMessageType.enum";
import { createMessage } from "../../mongo/crud/message/message.mongo-create";

export default async function saveIncomingMessage (from: string, type: WhatsappMessageType, payload: any) {
    return await createMessage({
        conversationId: from,
        createdAt: new Date(),
        direction: MessageDirection.Incoming,
        document: type === WhatsappMessageType.Document ? <any>payload : undefined,
        image: type === WhatsappMessageType.Image ? <any>payload : undefined,
        text: type === WhatsappMessageType.Text ? <any>payload : undefined,
        interactive: type === WhatsappMessageType.Interactive ? <any>payload : undefined,
        location: type === WhatsappMessageType.Location ? <any>payload : undefined,
        
        status: MessageStatus.Read,
        messageType: type,
        receivedAt: new Date(),
    })
}