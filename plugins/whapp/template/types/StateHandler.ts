import { ConversationState } from "../../../lib/whapp/enum/ConversationState.enum";
import { Conversation } from "../lib/mongo/models/conversation.mongo-model";
import { WhatsappImage } from "./WhatsappImage.type";
import { WhatsappLocation } from "./WhatsappLocation.type";
import { WhatsappMessageDocumentPayload } from "./WhatsappMessageDocumentPayload.type";

export type StateHandler = {
    Text? (conversation: Conversation, message: string);
    Image? (conversation: Conversation, image: WhatsappImage);
    Location? (conversation: Conversation, location: WhatsappLocation);
    Document? (conversation: Conversation, document: WhatsappMessageDocumentPayload['document']);
    Button? (conversation: Conversation, id: string);

    onStateInit? (conversation: Conversation, previousState: ConversationState, data?: any);
};