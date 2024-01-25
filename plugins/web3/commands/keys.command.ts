import Web3 from "web3";
import Project from "../../../lib/classes/Project.class";
import { log } from "termx";
//* Imports

export default async function keysCommand (project: Project, args: string[], options: any) {
    const web3 = new Web3();
    const account = web3.eth.accounts.create();

    log("Private key: " + account.privateKey);
    log("Address: " + account.address);
}