export enum OpenAICompletionFinishReason {
    Stop = "stop",
    Length = "length",
    FunctionCall = "function_call",
    ContentFilter = "content_filter",
    Null = "null",
    ToolCalls = "tool_calls"
}