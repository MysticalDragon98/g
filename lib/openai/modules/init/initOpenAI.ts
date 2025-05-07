import { OpenAI } from 'openai';
export let $OpenAI: OpenAI | null = null;

interface IOpenAI {
    apiKey?: string,
    organization?: string,
    project?: string
}

export default async function initOpenAI (options: IOpenAI = {}) {
    $OpenAI = new OpenAI({
        apiKey: options.apiKey ?? process.env.OPENAI_API_KEY,
        organization: options.organization,
        project: options.project
    });
}