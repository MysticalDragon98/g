import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
import { ClientSession, UpdateQuery, Types, FilterQuery } from "mongoose";

export async function update{{varCap name}} (query: FilterQuery<{{varCap name}}>, updates: UpdateQuery<{{varCap name}}>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await {{varCap name}}Model.updateOne(query, updates, {
            session
        });
    }, session);
}