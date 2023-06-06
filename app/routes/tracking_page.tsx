import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TrackMap, {Path} from "~/routes/components/Map";
import { Link, useLocation } from "@remix-run/react";
import trackingInfo from "~/functions/tracking_info";
import TrackingInfoDto from "~/functions/dtos/trackingInfoDto";
import {MyContextProvider} from "~/routes/context/context_provider";
import {checkContracts} from "~/functions/checkContracts";

export default function TrackingPage() {
    const [trackingInfoDto, setTrackingInfoDto] = useState<TrackingInfoDto>({
        sender: "",
        expectedDeliveryDate: "",
    });
    const [showInfo, setShowInfo] = useState(false);
    const { pathname } = useLocation();
    const [path, setPath] = useState<Path[]>([]);


    const [cookieValue, setCookieValue] = useState(Cookies.get("walletHash"));

    useEffect(() => {
        checkContracts();
        setCookieValue(Cookies.get("walletHash"));
    }, [pathname]);

    if (!cookieValue && pathname !== "/auth") {
        return (
            <html>
            <head>
                <meta http-equiv="refresh" content="0; url=/auth" />
            </head>
            </html>
        );
    }

    async function orderPath() {
        const path = [
            {lat: 37.772, lng: -122.214},
            {lat: 21.291, lng: -157.821},
            {lat: -18.142, lng: 178.431},
            {lat: -27.467, lng: 153.027}
        ];
        const info = await trackingInfo();
        console.log(info);
        setTrackingInfoDto(info);
        setPath(path)
        setShowInfo(true);
    }

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
        </head>
        <body>
        <section className="text-gray-600 body-font relative">
            <div className="fixed inset-0 bg-gray-300">
                <MyContextProvider value={path}>
                    <TrackMap />
                </MyContextProvider>
            </div>
            <div className="container px-5 py-24 mx-auto flex">
                <div className="lg:w-1/3 md:w-1/2 bg-gray-900 text-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-white mb-1 font-medium title-font">
                        Wallet
                    </h2>
                    <p className="leading-relaxed mb-5 text-white text-xs">
                        {cookieValue}
                    </p>
                    <p className="leading-relaxed mb-1 text-white text-m">
                        Select one order:
                    </p>
                    <select className="rounded-t-md rounded-b-md rounded-l-md rounded-r-md border-4 mb-2 w-100">
                        <option value="order1">Order 1</option>
                    </select>
                    <button
                        onClick={orderPath}
                        className="mb-5 text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-white"
                    >
                        Show order path
                    </button>
                    {showInfo ? (
                        <>
                            <p className="leading-relaxed mb-1 text-white text-sm">
                                Sender: {trackingInfoDto.sender}
                            </p>
                            <p className="leading-relaxed mb-5 text-white text-sm">
                                Expected Arrival: {trackingInfoDto.expectedDeliveryDate}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="leading-relaxed mb-1 text-white text-sm">
                                Sender:
                            </p>
                            <p className="leading-relaxed mb-5 text-white text-sm">
                                Expected Arrival:
                            </p>
                        </>
                    )}

                    <button
                        className="mb-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-white"
                    >
                        Confirm delivery
                    </button>
                    <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-white">
                        <Link to="/create_order_form"> Create order </Link>
                    </button>
                </div>
            </div>
        </section>
        </body>
        </html>
    );
}
