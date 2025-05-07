import { MSWhatsapp } from "../../../services";
import { MessageStatus } from "../../enum/MessageStatus.enum";
import { updateMessage } from "../../mongo/crud/message/message.mongo-update";
import { Message } from "../../mongo/models/message.mongo-model";
import updateConversationLastMessageSentAt from "../conversations/updateConversationLastMessageSentAt";

export default async function sendWhatsappMessage (msg: Message) {
    const { conversationId, buttons, text } = msg;

    try {
        let sentMsg;
        if (buttons.length <= 0) {
            sentMsg = await MSWhatsapp.messages({
                messaging_product: "whatsapp",
                to: conversationId,
                type: "text",
                text
            });
        } else {
            sentMsg = await MSWhatsapp.messages({
                messaging_product: "whatsapp",
                to: conversationId,
                type: "interactive",
                interactive: {
                    type: "button",
                    
                    body: {
                        text: text.body
                    },
    
                    action: {
                        buttons: buttons.map(button => ({
                            type: "reply",
                            reply: {
                                id: button.id,
                                title: button.content
                            }
                        }))
                    }
                },
            });
        }
        
        const whappMessageId = sentMsg?.messages?.[0]?.id;
        
        await updateMessage({ _id: msg._id }, {
            messageWhappId: whappMessageId,
            sentAt: new Date(),
            status: MessageStatus.Sent
        });

        await updateConversationLastMessageSentAt(conversationId);
    } catch (error) {
        console.error(error);

        await updateMessage({
            _id: msg._id
        }, {
            error: error.message ?? error.toString(),
            status: MessageStatus.Failed
        });
    }
}