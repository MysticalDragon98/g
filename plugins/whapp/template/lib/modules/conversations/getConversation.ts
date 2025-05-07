import { Conversation, ConversationModel } from "../../mongo/models/conversation.mongo-model";


export default async function getConversation (phone: string | Conversation) {
    if (phone instanceof Conversation || phone.constructor.name === "model") return phone as Conversation;

    return await ConversationModel.findOne({ phone: phone });
}