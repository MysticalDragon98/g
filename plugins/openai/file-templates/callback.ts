import { OpenAICallbackDefinition } from "../../../plugins/openai/modules/completions/types/OpenAICallbackDefinition.type";

export type {{var name}}OpenAICallbackArguments = {

}

const {{var name}}OpenAICallback = <OpenAICallbackDefinition> {
    name: "{{var name}}",
    description: "",
    parameters: {
        type: "object",
        properties: {
            
        },
        required: []
    },

    function: (args: {{var name}}OpenAICallbackArguments) => {

    }
}

export default {{var name}}OpenAICallback 