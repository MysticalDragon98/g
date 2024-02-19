import { Client, LocalAuth, Message } from "whatsapp-web.js";
import onIncomingWhatsappMessage from "../../lib/whatsapp/events/onIncomingWhatsappMessage.whatsapp-event";

const qrcode = require('qrcode-terminal');

export async function initWhatsappBot () {
    const client = new Client({
        authStrategy: new LocalAuth()
    });
    
    client.on('qr', (qr) => {
        qrcode.generate(qr, {small: true});
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('message', (msg: Message) => {
        onIncomingWhatsappMessage(msg);
    });

    client.initialize();
}