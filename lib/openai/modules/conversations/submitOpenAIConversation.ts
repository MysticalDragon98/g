import getOpenAIBestChatCompletion from "../completions/getOpenAIBestChatCompletion";
import { OpenAICompletionOptions } from "../completions/types/OpenAICompletionOptions.type";
import processOpenAIConversationResponse from "./processOpenAIConversationResponse";
import { OpenAIConversation } from "./types/OpenAIConversation.type";

export default async function submitOpenAIConversation (conversation: OpenAIConversation, options?: OpenAICompletionOptions) {
    const result = await getOpenAIBestChatCompletion(conversation.model, conversation.messages, options);

    return await processOpenAIConversationResponse(conversation, result, options);
}