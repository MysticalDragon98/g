import { WhatsappImage } from "../../../types/WhatsappImage.type";
import { WhatsappMessageType } from "../../enum/WhatsappMessageType.enum";
import getConversationByPhoneNumber from "../conversations/getConversationByPhoneNumber";
import saveIncomingMessage from "../messages/saveIncomingMessage";
import { getStateHandler } from "../state-handlers/getStateHandler";

export default async function onWhatsappImageReceived (from: string, img: WhatsappImage) {
    const conversation = await getConversationByPhoneNumber(from);

    await saveIncomingMessage(from, WhatsappMessageType.Image, img);
    const handler = await getStateHandler(conversation.state);
    
    handler.Image?.(conversation, img);
}