import { OpenAIModel } from "../../enum/OpenAIModel.enum";
import { OpenAIConversationRole } from "./enum/OpenAIConversationRole.type";
import { OpenAIConversation } from "./types/OpenAIConversation.type";

export default function createOpenAIConversation (model: OpenAIModel, topic: string) {
    return <OpenAIConversation>{
        model: model,
        messages: [
            { role: OpenAIConversationRole.System, content: topic }
        ]
    };
}