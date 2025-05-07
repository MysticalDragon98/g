import { MessageWhappId } from "../../../types/MessageWhappId.type";
import { WhatsappWebhookStatusUpdate } from "../../../types/WhatsappWebhookStatusUpdate.type";
import { MessageStatus } from "../../enum/MessageStatus.enum";
import updateMessageStatus from "../messages/updateMessageStatus";

export default async function onWhatsappStatusesWebhookReceived (update: WhatsappWebhookStatusUpdate) {
    const statuses = update.statuses;

    for (const status of statuses) {
        const messageId = status.id as MessageWhappId;
        const messageStatus = status.status as MessageStatus;

        await updateMessageStatus(messageId, messageStatus);
    }
}