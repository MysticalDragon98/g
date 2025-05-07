import { ChatCompletionMessageToolCall } from "openai/resources";
import { OpenAIConversation } from "./types/OpenAIConversation.type";
import { OpenAIConversationRole } from "./enum/OpenAIConversationRole.type";
import { OpenAICompletionOptions } from "../completions/types/OpenAICompletionOptions.type";
import pushOpenAIConversationMessage from "./pushOpenAIConversationMessage";
import processOpenAIConversationToolCall from "./processOpenAIConversationToolCall";
import submitOpenAIConversation from "./submitOpenAIConversation";

export default async function processOpenAIConversationToolCalls (conversation: OpenAIConversation, toolCalls: ChatCompletionMessageToolCall[], options: OpenAICompletionOptions) {
    const toolResponses = await Promise.all(toolCalls.map(toolCall => 
        processOpenAIConversationToolCall(conversation, toolCall, options)
    ))

    for (const toolResponse of toolResponses) {
        pushOpenAIConversationMessage(conversation, {
            role: OpenAIConversationRole.Tool,
            tool_call_id: toolResponse.id,
            content: toolResponse.content
        });
    }

    return submitOpenAIConversation(conversation, options);
}