import { {{varCap name}}Model, {{varCap name}} } from "../../models/{{name}}.mongo-model";
{{#if isFieldObjectId}}import { ObjectId } from "mongoose"; {{/if}}
export async function get{{varCap name}} ({{var name}}Id: {{fieldType}} | {{varCap name}}) {
    if ({{var name}}Id.constructor.name === "model") {
        return sshHostId as {{varCap name}};
    }
    return await {{varCap name}}Model.findOne({
        {{field}}: {{var name}}Id
    });
}