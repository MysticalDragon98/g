import web3 from "..";
import { readFileSync } from "fs";
import { resolve } from "path";

export default function createContract (name: string, address: string) {
    const contract = new web3.eth.Contract(
        JSON.parse(readFileSync(resolve(__dirname, "../../../lib/web3/abi/" + name + ".abi.json"), "utf-8")),
        address,
        { dataInputFill: "both" }
    );

    contract.config.contractDataInputFill = contract.contractDataInputFill = "both";

    return contract;
}