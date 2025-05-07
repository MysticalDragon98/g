import withSession from "../../../../../mongo/lib/withSession";
import { MessageModel, Message } from "../../models/message.mongo-model";
import { Types } from "mongoose";
import { ClientSession } from "mongoose";

export async function getMessage (messageId: Types.ObjectId | Message | string, session?: ClientSession): Promise<Message> {
    return await withSession(async (session?: ClientSession) => {
        if (messageId.constructor.name === "model") {
            return messageId as Message;
        }
        return await MessageModel.findOne({
            _id: messageId
        }, null, { session });
    }, session);
}