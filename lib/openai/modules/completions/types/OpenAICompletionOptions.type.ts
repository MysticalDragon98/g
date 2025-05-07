import { ChatCompletionCreateParamsNonStreaming, FunctionDefinition } from "openai/resources";
import { OpenAICallbackDefinition } from "./OpenAICallbackDefinition.type";

export type OpenAICompletionOptions = Omit<ChatCompletionCreateParamsNonStreaming, "model" | "messages" | "stream"> & {
    callbacks: OpenAICallbackDefinition[]
}