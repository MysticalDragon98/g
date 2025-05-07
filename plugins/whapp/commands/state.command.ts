import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import templateGenerator from "../../../lib/modules/generators/templateGenerator";
import parseHandlebarsTemplate from "../../../lib/modules/templates/parseHandlebarsTemplate";

export default templateGenerator({
    template: "whapp:state.ts",
    target: "lib/whapp/states/{{name}}.whapp-state.ts",
    usage: "g whapp:state",
    data: ([ name ]) => ({ name }),
    open: true,

    async afterGenerate (project, { name }, path) {
        const stateEnumsPath = project.subPath("lib/whapp/enum/ConversationState.enum.ts");
        await insertTagLine(stateEnumsPath, "Conversation States", parseHandlebarsTemplate("{{varCap name}} = \"{{name}}\",", { name }));
    }
});