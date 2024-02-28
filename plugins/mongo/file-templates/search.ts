import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
import { ClientSession } from "mongoose";
import { MongoSearch } from "../../../../plugins/mongo/lib/interfaces/mongo-search.interface";

export async function search{{varCap name}}s (query: Partial<{{varCap name}}>, options: MongoSearch, session?: ClientSession | boolean) {
    return await withSession(async (session?: ClientSession) => {
        return await {{varCap name}}Model.find(query, null, {
            session,
            sort: options.sort,
            limit: options.limit
        });
    }, session);
}