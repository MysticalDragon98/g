import withSession from "../../../../../mongo/lib/withSession";
import { ConversationModel, Conversation } from "../../models/conversation.mongo-model";
import { ClientSession, FilterQuery, Types } from "mongoose";

export async function deleteConversation (query: FilterQuery<Conversation>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await ConversationModel.deleteOne(query, {
            session
        });
    }, session);
}