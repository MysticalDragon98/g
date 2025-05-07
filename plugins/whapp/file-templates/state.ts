import { StateHandler } from "../../../plugins/whapp/types/StateHandler";
import { ConversationState } from "../enum/ConversationState.enum";


export default <StateHandler>{

    async onStateInit (conversation, previousState: ConversationState, args: any) {

    },

    async Text (conversation, message) {
        
    },

    async Button (conversation, id) {
        
    }
}