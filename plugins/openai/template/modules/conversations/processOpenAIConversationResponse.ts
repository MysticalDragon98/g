import { ChatCompletion } from "openai/resources";
import { OpenAICompletionFinishReason } from "../completions/enum/OpenAICompletionFinishReason.type";
import { OpenAIConversation } from "./types/OpenAIConversation.type";
import processOpenAIConversationToolCalls from "./processOpenAIConversationToolCalls";
import { OpenAICompletionOptions } from "../completions/types/OpenAICompletionOptions.type";
import pushOpenAIConversationMessage from "./pushOpenAIConversationMessage";

export default async function processOpenAIConversationResponse (conversation: OpenAIConversation, result: ChatCompletion.Choice, options: OpenAICompletionOptions) {
    pushOpenAIConversationMessage(conversation, result.message);

    switch (result.finish_reason) {
        case OpenAICompletionFinishReason.ToolCalls:
            return await processOpenAIConversationToolCalls(conversation, result.message.tool_calls!, options);
        default:
            return result;
    }
}