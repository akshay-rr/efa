import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";

const EventMonitor = () => {
    const { state } = useContext(AppContext) as any;
    const [transfers, setTransfers] = useState([] as any[]);
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {

        let emitter: any;

        if(!subscribed) {
            setSubscribed(true);
            emitter = (state.contract as any).events.Transfer({ fromBlock: 'latest' })
            .on("connected", function(subscriptionId: any){
                console.log("Connected to DAI: " + subscriptionId);
            })
            .on('data', function(event: any){
                setTransfers((transfers) => {
                    return transfers.concat(event);
                });
            });
        }

        return () => {
            if(emitter) {
                emitter.removeAllListeners();
            }
        }
    }, []);

    return (
        <div className="card" id={'event-monitor'}>
            <div className="card-body">
                <span className="card-title">DAI Transfer Event Monitor</span>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        transfers.map((transfer) => {
                            return (
                                <tr key={transfer.id}>
                                    <td>{transfer.id}</td>
                                    <td>{transfer.transactionHash}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )

};

export default EventMonitor;