import { $WHAPP_WEBHOOKS_CHALLENGE } from "../../../../../lib/env";
import { WhatsappWebhook } from "../../../types/WhatsappWebhook.type";
import { WhatsappWebhookIncomingMessage } from "../../../types/WhatsappWebhookIncomingMessage.type";
import { WhatsappWebhookStatusUpdate } from "../../../types/WhatsappWebhookStatusUpdate.type";
import onWhatsappMessagesWebhookReceived from "../../modules/whatsapp/onWhatsappMessagesWebhookReceived";
import onWhatsappStatusesWebhookReceived from "../../modules/whatsapp/onWhatsappStatusesWebhookReceived";

export default async function webhooksHTTPEndpoint (entry: WhatsappWebhook['entry'], $request: any) {
    if ($WHAPP_WEBHOOKS_CHALLENGE && $request.query['hub.challenge']) return {
        $raw: $request.query['hub.challenge']
    }

    try {
        for (const _entry of entry) {
            for (const change of _entry.changes) {
                if ((change.value as WhatsappWebhookIncomingMessage).messages) {
                    await onWhatsappMessagesWebhookReceived(change.value as WhatsappWebhookIncomingMessage);
                } else if ((change.value as WhatsappWebhookStatusUpdate).statuses) {
                    await onWhatsappStatusesWebhookReceived(change.value as WhatsappWebhookStatusUpdate);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}