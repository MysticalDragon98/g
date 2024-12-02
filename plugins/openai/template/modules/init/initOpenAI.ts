import { OpenAI } from 'openai';
import { $OPENAI_APIKEY, $OPENAI_URL } from '../../../../lib/env';

export let $OpenAI: OpenAI | null = null;

interface IOpenAI {
    apiKey?: string,
    organization?: string,
    project?: string
}

export default async function initOpenAI (options: IOpenAI = {}) {
    $OpenAI = new OpenAI({
        apiKey: options.apiKey ?? $OPENAI_APIKEY,
        organization: options.organization,
        project: options.project
    });
}