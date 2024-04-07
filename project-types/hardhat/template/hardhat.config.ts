import '@nomicfoundation/hardhat-ignition-ethers'
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import { config } from 'dotenv'

config();

//* Reference: https://hardhat.org/hardhat-runner/docs/config

export default {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {}
        //* Networks
    },

    solidity: {
        version: "0.8.24"
        //* Solidity Versions
    }
}