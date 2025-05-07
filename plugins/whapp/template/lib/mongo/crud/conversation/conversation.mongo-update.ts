import withSession from "../../../../../mongo/lib/withSession";
import { ConversationModel, Conversation } from "../../models/conversation.mongo-model";
import { ClientSession, UpdateQuery, Types, FilterQuery } from "mongoose";

export async function updateConversation (query: FilterQuery<Conversation>, updates: UpdateQuery<Conversation>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await ConversationModel.updateOne(query, updates, {
            session
        });
    }, session);
}