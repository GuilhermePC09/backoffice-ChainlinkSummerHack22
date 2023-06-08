import initializeBlockchain from "~/functions/contracts/initialize_blockchain";
import Cookies from "js-cookie";
import Contract from "web3-eth-contract";
import getLatLng from "~/functions/contracts/get_LatLng";

export default async function createOrder(receiverWallet: string, senderAddress: string, receiverAddress: string, expectedTimeOfArrival: string) {
    const config = await initializeBlockchain();
    const wallet = Cookies.get("walletHash");
    let deliveryContract = new Contract(config.deliveryABI, config.deliveryAddress);

    const latLngSender = await getLatLng(senderAddress);
    const srcLat = Math.floor(latLngSender.latitude * 1000000);
    const srcLng = Math.floor(latLngSender.longitude * 1000000);

    const latLngReceiver = await getLatLng(receiverAddress);
    const destLat = Math.floor(latLngReceiver.latitude * 1000000);
    const destLng = Math.floor(latLngReceiver.longitude * 1000000);

    const date = new Date(expectedTimeOfArrival);
    const timestampInSeconds = Math.floor(date.getTime() / 1000);
    deliveryContract.methods.createOrder(receiverWallet, srcLat, srcLng, destLat, destLng, timestampInSeconds)
    try {
        const result = await deliveryContract.methods.createOrder(receiverWallet, srcLat, srcLng, destLat, destLng, timestampInSeconds)
            .send({ from: wallet })
            .then(function (createdOrder: any) {
                // will be fired once the receipt is mined
                console.log('then', createdOrder.blockHash);
            });
    } catch (error) {
        console.log('error', error);
    }
}
