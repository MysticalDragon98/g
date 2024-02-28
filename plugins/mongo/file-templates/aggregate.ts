import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
import { ClientSession, PipelineStage } from "mongoose";

export async function aggregate{{varCap name}} (query: PipelineStage[], session?: ClientSession | boolean) {
    return await withSession(async (session?: ClientSession) => {
        return await {{varCap name}}Model.aggregate(query, {
            session
        });
    }, session);
}