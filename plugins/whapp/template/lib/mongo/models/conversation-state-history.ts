import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class ConversationStateHistory {
    _id: Types.ObjectId;
    @prop() conversationId: string;
    @prop() state: string;
    @prop() createdAt: Date;
}

export const ConversationStateHistoryModel = getModelForClass(ConversationStateHistory);