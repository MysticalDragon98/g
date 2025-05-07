import withSession from "../../../../../mongo/lib/withSession";
import { ConversationModel, Conversation } from "../../models/conversation.mongo-model";
import { ClientSession, PipelineStage } from "mongoose";

export async function aggregateConversation (query: PipelineStage[], session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await ConversationModel.aggregate(query, {
            session
        });
    }, session);
}