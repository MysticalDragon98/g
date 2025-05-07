import { OpenAICompletionOptions } from "../completions/types/OpenAICompletionOptions.type";
import { OpenAIConversationRole } from "./enum/OpenAIConversationRole.type";
import pushOpenAIConversationMessage from "./pushOpenAIConversationMessage";
import submitOpenAIConversation from "./submitOpenAIConversation";
import { OpenAIConversation } from "./types/OpenAIConversation.type";

export default async function sendOpenAIConversationMessage (conversation: OpenAIConversation, message: string, options?: OpenAICompletionOptions) {
    pushOpenAIConversationMessage(conversation, { role: OpenAIConversationRole.User, content: message });
    
    return await submitOpenAIConversation(conversation, options);
}