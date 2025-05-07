import { ConversationModel } from "../../mongo/models/conversation.mongo-model";


export default async function updateConversationLastMessageSentAt (phone: string) {
    await ConversationModel.updateOne({ phone: phone }, { $set: { 
        lastMessageSentAt: new Date(),
        lastConversationMessage: new Date()
    } });
}