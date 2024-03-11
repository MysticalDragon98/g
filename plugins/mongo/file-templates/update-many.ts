import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
import { ClientSession, UpdateQuery, Types } from "mongoose";

export async function update{{varCap name}}s (query: Partial<{{varCap name}} & { _id?: Types.ObjectId | string }>, updates: UpdateQuery<{{varCap name}}>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await {{varCap name}}Model.updateMany(query, updates, {
            session
        });
    }, session);
}