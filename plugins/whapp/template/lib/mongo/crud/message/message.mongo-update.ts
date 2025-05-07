import { ClientSession, UpdateQuery, Types, FilterQuery } from "mongoose";
import { Message, MessageModel } from "../../models/message.mongo-model";
import withSession from "../../../../../mongo/lib/withSession";

export async function updateMessage (query: FilterQuery<Message>, updates: UpdateQuery<Message>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await MessageModel.updateOne(query, updates, {
            session
        });
    }, session);
}