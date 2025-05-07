import { MessageButton } from "../../../types/MessageButton.type";
import parseMessageTemplate from "../messages/parseMessageTemplate";
import sendWhatsappTextMessage from "./sendWhatsappTextMessage";

export default async function sendWhatsappTemplate (phone: string, template: string, data: any = {}, buttons?: MessageButton[]) {
    return await sendWhatsappTextMessage(phone, parseMessageTemplate(template, data), buttons);
}