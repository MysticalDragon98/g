import { ChatCompletionMessageParam } from "openai/resources";
import { OpenAIModel } from "../../enum/OpenAIModel.enum";
import createOpenAIChatCompletion from "./createOpenAIChatCompletion";
import { OpenAICompletionOptions } from "./types/OpenAICompletionOptions.type";

export default async function getOpenAIBestChatCompletion (model: OpenAIModel, messages: ChatCompletionMessageParam[], options?: OpenAICompletionOptions) {
    const response = await createOpenAIChatCompletion(model, messages, options);
    
    return response.choices[0];
}