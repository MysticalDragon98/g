import { ConversationState } from "../../../../../lib/whapp/enum/ConversationState.enum";
import { ConversationModel } from "../../mongo/models/conversation.mongo-model";

export default async function initConversation (phone: string) {
    return await ConversationModel.create({
        phone: phone,
        state: ConversationState.None,
        context: { new: true }
    });
}