import { Conversation } from "../lib/mongo/models/conversation.mongo-model";

export type CommandHandler = {
    canActivate? (conversation: Conversation, command: string, args: string[]): boolean | Promise<boolean>;
    description?: string;
    exec (conversation: Conversation, args: string[]): Promise<void>;
};