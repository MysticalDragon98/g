import { ChatCompletionMessageParam } from "openai/resources";
import { OpenAIModel } from "../../enum/OpenAIModel.enum";
import { $OpenAI } from "../init/initOpenAI";
import { OpenAICompletionOptions } from "./types/OpenAICompletionOptions.type";

export default async function createOpenAIChatCompletion (model: OpenAIModel, messages: ChatCompletionMessageParam[], options?: OpenAICompletionOptions) {
    const { callbacks } = options ?? {};
    options = {
        ...options,
        callbacks: undefined
    }

    return await $OpenAI.chat.completions.create({
        ...(options ?? {}),
        model: model,
        messages: messages,
        tools: callbacks && callbacks.map(cb => ({
            type: "function",
            function: {
                name: cb.name,
                description: cb.description,
                parameters: cb.parameters
            }
        }))
    });
}