import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { ConversationState } from '../../../../../lib/whapp/enum/ConversationState.enum';

@modelOptions({ options: { allowMixed: 0 }})
export class Conversation {
    _id: Types.ObjectId;
    
    @prop({ unique: true, required: true, index: true }) phone: string;
    @prop({ required: true, enum: ConversationState }) state: ConversationState;
    @prop({ required: true, default: {} }) context: any;

    @prop({}) lastMessageReceivedAt?: Date;
    @prop({}) lastMessageSentAt?: Date;
    @prop({ index: -1 }) lastConversationMessage?: Date;
}

export const ConversationModel = getModelForClass(Conversation);