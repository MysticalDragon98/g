import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
import { ClientSession, Types } from "mongoose";
import { MongoSearch } from "../../../../plugins/mongo/lib/interfaces/mongo-search.interface";

export async function find{{varCap name}} (query: Partial<{{varCap name}} & { _id?: Types.ObjectId | string }>, options?: MongoSearch, session?: ClientSession): Promise<{{varCap name}} & { _id: Types.ObjectId }> {
    return await withSession(async (session?: ClientSession) => {
        return await {{varCap name}}Model.findOne(query, null, {
            session,
            sort: options?.sort,
            limit: options?.limit
        });
    }, session);
}