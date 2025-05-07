import sendWhatsappTemplate from "../../../plugins/whapp/lib/modules/whatsapp/sendWhatsappTemplate";
import { StateHandler } from "../../../plugins/whapp/types/StateHandler";
import { T_WELCOME_MESSAGE } from "../templates";

export default <StateHandler> {

    async Text (conversation, message) {
        await sendWhatsappTemplate(conversation.phone, T_WELCOME_MESSAGE);
    }

}