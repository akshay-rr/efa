import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import { setNewBlockEventListener } from "../utils/Web3Utils";

const BlockMonitor = () => {
    
    const { state } = useContext(AppContext) as any;
    const [lastBlock, setLastBlock] = useState(state.lastBlock);
    const { number, hash, parentHash, nonce } = lastBlock;

    useEffect(() => {
        const newBlockEventCallback = (err: any, result: any) => {
            if(!err) {
                console.log('New Block');
                setLastBlock(result);
            } else {
                console.log(err);
            }
        };
    
        if(state.web3) {
            console.log('Setting new block event listener');
            setNewBlockEventListener(state.web3, newBlockEventCallback);
        }
    }, []);

    return (
        <div className="card" id={'block-monitor'}>
            <div className="card-body">
                <span className="card-title">Block Monitor</span>
                <div>Number: {number}</div>
                <div>Hash: {hash}</div>
                <div>Parent Hash: {parentHash}</div>
                <div>Nonce: {nonce}</div>
            </div>
        </div>
    )
};

export default BlockMonitor;