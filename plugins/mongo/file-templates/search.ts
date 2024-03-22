import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
import { ClientSession, FilterQuery, Types } from "mongoose";
import { MongoSearch } from "../../../../plugins/mongo/lib/interfaces/mongo-search.interface";

export async function search{{varCap name}}s (query: FilterQuery<{{varCap name}}>, options?: MongoSearch, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        return await {{varCap name}}Model.find(query, null, {
            session,
            sort: options?.sort,
            limit: options?.limit
        });
    }, session);
}