import { Conversation, ConversationModel } from "../../mongo/models/conversation.mongo-model";
import initConversation from "./initConversation";

export default async function getConversationByPhoneNumber (phone: string): Promise<Conversation> {
    return await ConversationModel.findOne({ phone: phone }) ?? await initConversation(phone);
}