import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { $ETH_PRIVKEY, $ETH_ADDRESS, $ETH_PROVIDER } from "../../lib/env";

export default new Web3(new (<any>HDWalletProvider)({
    privateKeys: [$ETH_PRIVKEY],
    providerOrUrl: $ETH_PROVIDER,
    pollingInterval: 60000
}));