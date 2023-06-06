import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import Cookies from "js-cookie";
import initializeBlockchain from "~/functions/initialize_blockchain";


export const checkContracts = async () => {
    const config = await initializeBlockchain();
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    const wallet = Cookies.get("walletHash");

    let deliveryContract = new Contract(config.deliveryABI, config.deliveryAddress);
    const orders = await deliveryContract.methods.orders(wallet).call();
    console.log(orders);
    }