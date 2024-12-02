import { ChatCompletionMessageToolCall } from "openai/resources";
import { OpenAIConversation } from "./types/OpenAIConversation.type";
import { OpenAICompletionOptions } from "../completions/types/OpenAICompletionOptions.type";

export default async function processOpenAIConversationToolCall (conversation: OpenAIConversation, toolCall: ChatCompletionMessageToolCall, options: OpenAICompletionOptions) {    
    const fnName = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);
    const fn = options.callbacks.find(callback => callback.name === fnName)?.function;

    if (!fn) throw new Error(`Tool function ${fnName} not found.`);

    const result = await fn(args);

    return {
        id: toolCall.id,
        content: JSON.stringify(result)
    }
}