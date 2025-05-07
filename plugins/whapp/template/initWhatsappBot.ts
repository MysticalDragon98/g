import { resolve } from "path";
import { $assert } from "../../lib/exceptions";
import { MISSING_PLUGIN } from "./errors";
import WhatsappEndpoints from "./lib/http/endpoints";

export default async function initWhatsappBot () {
  const { Endpoints } = await import(resolve(__dirname, "../http/initHTTPServer")).catch((exc) => {
    $assert(exc.code !== "MODULE_NOT_FOUND", {MISSING_PLUGIN}, { plugin: "http" });

    throw exc;
  });

  Endpoints["whatsapp"] = WhatsappEndpoints;
}