import withSession from "../../../../plugins/mongo/lib/withSession";
import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
{{#if isFieldObjectId}}import { ObjectId } from "mongoose"; {{/if}}
import { ClientSession } from "mongoose";

export async function get{{varCap name}} ({{var name}}Id: {{fieldType}} | {{varCap name}} | string, session?: ClientSession): Promise<{{varCap name}}> {
    return await withSession(async (session?: ClientSession) => {
        if ({{var name}}Id.constructor.name === "model") {
            return {{var name}}Id as {{varCap name}};
        }
        return await {{varCap name}}Model.findOne({
            {{field}}: {{var name}}Id
        }, null, { session });
    }, session);
}