export default function normalizeWhatsappPhone (phone: string) {
    let _phone = phone.replace(/[^0-9]/g, '');

    if (_phone.startsWith("521")) _phone = "52" + _phone.slice(3);

    return _phone;
}