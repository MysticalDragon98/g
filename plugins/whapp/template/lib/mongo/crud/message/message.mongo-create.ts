import withSession from "../../../../../mongo/lib/withSession";
import { ClientSession } from "mongoose";
import { Message, MessageModel } from "../../models/message.mongo-model";

export async function createMessage (item: Partial<Message>, session?: ClientSession): Promise<Message> {
    return await withSession(async (session?: ClientSession) => {
        if (session)
            return (await MessageModel.create([item], { session }))[0];
        else
            return await MessageModel.create(item);
    }, session);
}