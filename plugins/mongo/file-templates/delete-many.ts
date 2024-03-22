import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
import { ClientSession, FilterQuery, Types } from "mongoose";

export async function delete{{varCap name}}s (query: FilterQuery<{{varCap name}}>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await {{varCap name}}Model.deleteMany(query, {
            session
        });
    }, session);
}