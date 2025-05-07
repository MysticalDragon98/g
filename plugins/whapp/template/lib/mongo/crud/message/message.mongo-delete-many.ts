import withSession from "../../../../../mongo/lib/withSession";
import { MessageModel, Message } from "../../models/message.mongo-model";
import { ClientSession, FilterQuery, Types } from "mongoose";

export async function deleteMessages (query: FilterQuery<Message>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await MessageModel.deleteMany(query, {
            session
        });
    }, session);
}