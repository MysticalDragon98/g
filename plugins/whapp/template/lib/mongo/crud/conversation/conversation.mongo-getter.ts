import withSession from "../../../../../mongo/lib/withSession";
import { ConversationModel, Conversation } from "../../models/conversation.mongo-model";
import { Types } from "mongoose";
import { ClientSession } from "mongoose";

export async function getConversation (conversationId: Types.ObjectId | Conversation | string, session?: ClientSession): Promise<Conversation> {
    return await withSession(async (session?: ClientSession) => {
        if (conversationId.constructor.name === "model") {
            return conversationId as Conversation;
        }
        return await ConversationModel.findOne({
            _id: conversationId
        }, null, { session });
    }, session);
}