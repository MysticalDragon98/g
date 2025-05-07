import withSession from "../../../../../mongo/lib/withSession";
import { MessageModel, Message } from "../../models/message.mongo-model";
import { ClientSession, PipelineStage } from "mongoose";

export async function aggregateMessage (query: PipelineStage[], session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await MessageModel.aggregate(query, {
            session
        });
    }, session);
}