import { FunctionDefinition } from "openai/resources";

export type OpenAICallbackDefinition = FunctionDefinition & { function?: Function  };