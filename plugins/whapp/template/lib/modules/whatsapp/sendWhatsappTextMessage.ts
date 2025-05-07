import { ok } from "assert";
import { MessageStatus } from "../../enum/MessageStatus.enum";
import { createMessage } from "../../mongo/crud/message/message.mongo-create";
import { MessageDirection } from "../../enum/MessageDirection.enum";
import { WhatsappMessageType } from "../../enum/WhatsappMessageType.enum";
import { MessageButton } from "../../../types/MessageButton.type";
import sendWhatsappMessage from "./sendWhatsappMessage";

export default async function sendWhatsappTextMessage (phone: string, body: string, buttons: MessageButton[] = []) {
    for (const button of buttons) {
        ok(button.content.length <= 20, `Whatsapp button content too long: ${button.content}`);
        ok(button.id.length <= 256, `Whatsapp button id too long: ${button.id}`);
    }

    const msg = await createMessage({
        conversationId: phone,
        direction: MessageDirection.Outgoing,
        text: { body },
        createdAt: new Date(),
        status: MessageStatus.Pending,
        messageType: WhatsappMessageType.Text,
        buttons: buttons.map(button => ({
            ...button,
            id: `>${button.id}` 
        }))
    });

    await sendWhatsappMessage(msg);
}