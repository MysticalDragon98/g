import withSession from "../../../../../mongo/lib/withSession";
import { MessageModel, Message } from "../../models/message.mongo-model";
import { ClientSession, FilterQuery, Types } from "mongoose";
import { MongoSearch } from "../../../../plugins/mongo/lib/interfaces/mongo-search.interface";

export async function findMessage (query: FilterQuery<Message>, options?: MongoSearch, session?: ClientSession): Promise<Message & { _id: Types.ObjectId }> {
    return await withSession(async (session?: ClientSession) => {
        return await MessageModel.findOne(query, null, {
            session,
            sort: options?.sort,
            limit: options?.limit
        });
    }, session);
}