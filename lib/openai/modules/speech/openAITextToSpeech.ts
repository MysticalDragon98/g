import { PassThrough } from "stream";
import { $OpenAI } from "../init/initOpenAI";

export async function openAITextToSpeech (text: string, { speed = 1 }: { speed?: number } = {})  {
    const stream = await $OpenAI.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
        speed
    });

    return stream.body as any as PassThrough;
}