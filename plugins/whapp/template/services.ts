import { $META_TOKEN, $WHAPP_PHONE_ID } from "../../lib/env";
import { HTTPProxy } from "../http-proxies";

export const MSWhatsapp = HTTPProxy(`https://graph.facebook.com/v21.0//${$WHAPP_PHONE_ID}`, {
    resultParser: (data) => data,
    errorParser: (error) => {
        if (error.response && error.response.data && error.response.data.error && typeof error.response.data.error !== "string") {
            return new Error(error.response.data.error.type + ": " + error.response.data.error.message);
        }

        return error;
    },

    headers: {
        'Authorization': `Bearer ${$META_TOKEN}`,
    }
});