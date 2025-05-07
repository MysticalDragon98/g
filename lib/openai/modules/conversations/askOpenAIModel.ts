import { OpenAIModel } from "../../enum/OpenAIModel.enum";
import createOpenAIConversation from "./createOpenAIConversation";
import pushOpenAIConversationMessage from "./pushOpenAIConversationMessage";
import submitOpenAIConversation from "./submitOpenAIConversation";

export async function askOpenAIModel (model: OpenAIModel, mindset: string, prompt: string) {
    const conversation = await createOpenAIConversation(model, mindset);
    pushOpenAIConversationMessage(conversation, {
        role: "user",
        content: prompt
    });

    const result = await submitOpenAIConversation(conversation);

    return result.message.content;
}