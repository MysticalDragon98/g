import { readFile } from "fs/promises";
import { MessageButton } from "../../../types/MessageButton.type";
import parseMessageTemplate from "../messages/parseMessageTemplate";
import sendWhatsappTextMessage from "./sendWhatsappTextMessage";
import { join } from "path";

export default async function sendWhatsappTemplateFile (phone: string, file: string, data: any = {}, buttons?: MessageButton[]) {
    const template = await readFile(join(__dirname, `../../../../../lib/whapp/templates/${file}.whapp-template.handlebars`), { encoding: "utf-8" });
    return await sendWhatsappTextMessage(phone, parseMessageTemplate(template, data), buttons);
}