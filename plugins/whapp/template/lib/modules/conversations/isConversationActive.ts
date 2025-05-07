import { Conversation } from "../../mongo/models/conversation.mongo-model";

import getConversation from "./getConversation";

export default async function isConversationActive (conversation: string | Conversation) {
    const user = await getConversation(conversation);
    
    return user?.lastMessageReceivedAt?.getTime() > Date.now() - 24 * 60 * 60 * 1000;
}