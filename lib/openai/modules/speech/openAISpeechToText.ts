import { Readable } from "stream";
import { $OpenAI } from "../init/initOpenAI";
import { createReadStream } from "fs";

export async function openAISpeechToText (path: string, lang: string)  {
    const result = await $OpenAI.audio.transcriptions.create({
        model: "whisper-1",
        file: createReadStream(path),
        language: lang
    });

    return result.text;
}