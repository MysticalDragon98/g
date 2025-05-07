import withSession from "../../../../../mongo/lib/withSession";
import { ClientSession, UpdateQuery, FilterQuery } from "mongoose";
import { Message, MessageModel } from "../../models/message.mongo-model";

export async function updateMessages (query: FilterQuery<Message>, updates: UpdateQuery<Message>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await MessageModel.updateMany(query, updates, {
            session
        });
    }, session);
}