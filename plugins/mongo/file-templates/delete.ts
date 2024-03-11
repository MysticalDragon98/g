import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
import { ClientSession, Types } from "mongoose";

export async function delete{{varCap name}} (query: Partial<{{varCap name}} & { _id?: Types.ObjectId | string }>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await {{varCap name}}Model.deleteOne(query, {
            session
        });
    }, session);
}