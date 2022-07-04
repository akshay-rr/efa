import React, { useContext, useState } from "react";
import AppContext from "../contexts/AppContext";

const MessageSigner = () => {

    const {state} = useContext(AppContext) as any;

    const [text, setText] = useState('');
    const [signature, setSignature] = useState('');

    const signMessage = () => {
        state.web3.eth.personal.sign(text, state.accounts[0]).then((result: any) => {
            setSignature(result);
        }).catch((e: any) => {
            console.log(e);
        });
    };


    return (
        <div className="card" id={'message-signer'}>
            <div className="card-body">
                <span className="card-title">Sign Message</span>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Message" 
                        aria-label="Message" 
                        aria-describedby="button-addon2"
                        onChange={(e) => setText(e.currentTarget.value)}
                        value={text} />
                    <button 
                        className="btn btn-outline-secondary" 
                        type="button" 
                        id="button-addon2"
                        onClick={signMessage}
                    >Sign</button>
                </div>
                <div className="card">
                    <div className="card-body">
                        {signature}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageSigner;
