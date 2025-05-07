import { ConversationModel } from "../../mongo/models/conversation.mongo-model";

export default async function updateConversationLastMessageReceivedAt (phone: string) {
    await ConversationModel.updateOne({ phone }, { $set: {
        lastMessageReceivedAt: new Date(),
        lastConversationMessage: new Date()
    } });
}