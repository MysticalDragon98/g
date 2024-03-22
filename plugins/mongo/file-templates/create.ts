import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
import { ClientSession } from "mongoose";

export async function create{{varCap name}} (item: Partial<{{varCap name}}>, session?: ClientSession) {
    return await withSession(async (session?: ClientSession) => {
        if (session)
            return (await {{varCap name}}Model.create([item], { session }))[0];
        else
            return await {{varCap name}}Model.create(item);
    }, session);
}