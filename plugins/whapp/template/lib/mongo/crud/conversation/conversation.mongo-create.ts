import withSession from "../../../../../mongo/lib/withSession";
import { ConversationModel, Conversation } from "../../models/conversation.mongo-model";
import { ClientSession } from "mongoose";

export async function createConversation (item: Partial<Conversation>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        if (session)
            return (await ConversationModel.create([item], { session }))[0];
        else
            return await ConversationModel.create(item);
    }, session);
}