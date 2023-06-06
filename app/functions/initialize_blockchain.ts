import Web3 from "web3";
import Contract from "web3-eth-contract";
import order from "~/contracts/order.json";
import delivery from "~/contracts/delivery.json";
import {AbiItem} from "web3-utils";
import BlockChainConfigDto from "~/functions/dtos/blockChainConfig.dto";

export default async function initializeBlockchain(): Promise<BlockChainConfigDto>{
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    const web3Provider = Web3.givenProvider || 'ws://localhost:8546';

    // set provider for all later instances to use
    Contract.setProvider(web3Provider);
    const web3 = new Web3(web3Provider);
    // connect to the library contract

    const deliveryABI = delivery as AbiItem[];
    const deliveryAddress = "0xD780fC41baC8F8BC62F5c36a04556c4d79812A10"

    const orderABI = order as AbiItem[];
    const orderAddress = "0x0f3a3Bc2b56AD73EeD6b574bAE99bfeA83606564"

    return {
        web3Provider,
        web3,
        deliveryABI,
        deliveryAddress,
    };

}