import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

export const $LOGS_FOLDER = process.env.LOGS_FOLDER;
export const $OPENAI_API_KEY = process.env.OPENAI_API_KEY;