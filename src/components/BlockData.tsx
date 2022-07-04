import React from "react";

const BlockData = (props: { block: any }) => {

    const { number, hash, parentHash, nonce } = props.block;

    return (
        <div>
            <div>Number: {number}</div>
            <div>Hash: {hash}</div>
            <div>Parent Hash: {parentHash}</div>
            <div>Nonce: {nonce}</div>
        </div>
    )
};

export default BlockData;