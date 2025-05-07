import { ConversationState } from "../../../../../lib/whapp/enum/ConversationState.enum";
import { updateConversation } from "../../mongo/crud/conversation/conversation.mongo-update";
import { ConversationStateHistoryModel } from "../../mongo/models/conversation-state-history";
import { Conversation } from "../../mongo/models/conversation.mongo-model";
import { getStateHandler } from "../state-handlers/getStateHandler";
import getConversation from "./getConversation";

export default async function setConversationState (phone: string | Conversation, state: ConversationState, data: any = {}) {
    const conversation = await getConversation(phone);
    const previousState = conversation.state;

    await ConversationStateHistoryModel.create({
        conversationId: conversation.phone,
        state,
        createdAt: new Date()
    });

    await updateConversation({ phone: conversation.phone }, { state });

    const handler = await getStateHandler(state);
    
    if (handler.onStateInit) {
        await handler.onStateInit(await getConversation(conversation.phone), previousState, data);
    }
}