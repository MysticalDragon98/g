import { MessageWhappId } from "../../../types/MessageWhappId.type";
import { MessageStatus } from "../../enum/MessageStatus.enum";
import { updateMessage } from "../../mongo/crud/message/message.mongo-update";

export default async function updateMessageStatus (messageWhappId: MessageWhappId, status: MessageStatus) {
    if (status === MessageStatus.Delivered) {
        await updateMessage({ messageWhappId }, { status, deliveredAt: new Date() });
    } else if (status === MessageStatus.Sent) {
        await updateMessage({ messageWhappId }, { status, sentAt: new Date() });
    } else {
        await updateMessage({ messageWhappId }, { status });
    }
}