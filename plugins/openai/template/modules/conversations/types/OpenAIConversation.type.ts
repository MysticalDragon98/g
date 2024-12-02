import { ChatCompletionMessageParam } from "openai/resources";
import { OpenAIModel } from "../../../enum/OpenAIModel.enum"

export type OpenAIConversation = {
    model: OpenAIModel;
    messages: ChatCompletionMessageParam[];
}