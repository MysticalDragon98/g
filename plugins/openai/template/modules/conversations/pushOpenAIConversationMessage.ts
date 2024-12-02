import { ChatCompletionMessageParam } from "openai/resources";
import { OpenAIConversation } from "./types/OpenAIConversation.type";

export default function pushOpenAIConversationMessage (conversation: OpenAIConversation, message: ChatCompletionMessageParam) {
    conversation.messages.push(message);
}