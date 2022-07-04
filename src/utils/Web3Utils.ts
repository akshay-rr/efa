import Web3 from "web3";

export const getEthereum = async () => {
    while (document.readyState !== "complete") {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return (window as any).ethereum;
}

export const getWeb3 = async () => {

    const ethereum = (window as any).ethereum;
    let web3
  
    if (ethereum) {
        web3 = new Web3(ethereum)
    } else if ((window as any).web3) {
        web3 = (window as any).web3
    } else {
        const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:8545"
        );
        web3 = new Web3(provider)
    }
  
    return web3
}

export const setChainEventListener = (callback: Function) => {
    let { ethereum } = window as any; 
    if (ethereum.removeListener) {
        ethereum.removeListener('chainChanged', callback);
    }
    ethereum.on('chainChanged', callback);
};

export const setAccountEventListener = (callback: Function) => {
    let { ethereum } = window as any; 
    if (ethereum.removeListener) {
        ethereum.removeListener('accountChanged', callback);
    }
    ethereum.on('accountChanged', callback);
};

export const setNewBlockEventListener = (web3Instance: any, callback: Function) => {
    web3Instance.eth.clearSubscriptions();
    web3Instance.eth.subscribe('newBlockHeaders', callback);
};
