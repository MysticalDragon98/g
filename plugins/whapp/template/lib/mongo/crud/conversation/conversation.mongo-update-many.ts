import withSession from "../../../../../mongo/lib/withSession";
import { ConversationModel, Conversation } from "../../models/conversation.mongo-model";
import { ClientSession, UpdateQuery, FilterQuery } from "mongoose";

export async function updateConversations (query: FilterQuery<Conversation>, updates: UpdateQuery<Conversation>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await ConversationModel.updateMany(query, updates, {
            session
        });
    }, session);
}