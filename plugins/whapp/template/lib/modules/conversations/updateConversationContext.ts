import { updateConversation } from "../../mongo/crud/conversation/conversation.mongo-update";


export default async function updateConversationContext (phone: string, context: any) {
    return await updateConversation({ phone }, { context });
}