import withSession from "../../../../../mongo/lib/withSession";
import { ConversationModel, Conversation } from "../../models/conversation.mongo-model";
import { ClientSession, FilterQuery, Types } from "mongoose";
import { MongoSearch } from "../../../../plugins/mongo/lib/interfaces/mongo-search.interface";

export async function searchConversations (query: FilterQuery<Conversation>, options?: MongoSearch, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await ConversationModel.find(query, null, {
            session,
            sort: options?.sort,
            limit: options?.limit
        });
    }, session);
}