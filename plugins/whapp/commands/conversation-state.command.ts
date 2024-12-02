import Project from "../../../lib/classes/Project.class";
import insertTagLine from "../../../lib/modules/fs/insertTagLine";
import toVariableName from "../../../lib/modules/utils/toVariableName";
//* Imports

export default async function conversationStateCommand (project: Project, args: string[], options: any) {
    const [ name ] = args;

    const enumName = toVariableName(name, { capitalize: true });
    const conversationStatesPath = "lib/enum/ConversationState.enum.ts";
    const handlersPath = "lib/const/ConversationStateHandlers.const.ts";
    const handlerFunctionName = `on${enumName}MessageReceived`;
    const handlerFunctionPath = `lib/modules/conversation-handlers/${handlerFunctionName}.ts`;

    await insertTagLine(
        project.subPath(conversationStatesPath),
        "Conversation States",
        `${enumName} = "${name}",`
    );

    await insertTagLine(
        project.subPath(handlersPath),
        "Imports",
        `import ${handlerFunctionName} from "../modules/conversation-handlers/${handlerFunctionName}";`
    );

    await insertTagLine(
        project.subPath(handlersPath),
        "Handlers",
        `[ConversationState.${enumName}]: ${handlerFunctionName},`
    );

    await project.generateFileFromTemplate("whapp:conversation-state-handler.ts", handlerFunctionPath, {
        name: handlerFunctionName
    });

    await project.vscodeOpen(handlerFunctionPath);
}