import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { getWeb3, setAccountEventListener, setChainEventListener } from './utils/Web3Utils';
import DAI from './contracts/DAI.json';
import { DAI_ADDRESS } from './constants/Constants';
import AppContext from './contexts/AppContext';
import BlockMonitor from './components/BlockMonitor';
import EventMonitor from './components/EventMonitor';
import MessageSigner from './components/MessageSigner';

const initialAppState = {
  web3: null,
  chainId: 0,
  lastBlock: {},
  accounts: [],
  loading: true,
  contract: null
}

function App() {
  const [state, setState] = useState(initialAppState);

  const context = {
    state: state
  };

  const loadBloackchain = async () => {
    const web3Instance = await getWeb3();
    const accounts = await web3Instance.eth.getAccounts();
    const chainId = parseInt(await web3Instance.eth.getChainId());
    const latestBlock = await web3Instance.eth.getBlock(web3Instance.eth.defaultBlock);

    let contractInstance;
    if(chainId === 1) {
      contractInstance = new web3Instance.eth.Contract(DAI, DAI_ADDRESS);
    }
    
    setState({
      ...state,
      web3: web3Instance,
      chainId: chainId,
      lastBlock: latestBlock,
      accounts: accounts,
      loading: false,
      contract: contractInstance
    })
  };
  
  useEffect(() => {
    if((window as any).ethereum) {
      loadBloackchain();
      setChainEventListener((chainId: string) => { loadBloackchain(); });
      setAccountEventListener((chainId: string) => { loadBloackchain(); });
    } else {
      setState({
        ...state,
        loading: false
      })
    }
  }, []);

  return (
    <AppContext.Provider value={context}>
      <div className="App">
        <div className='header'>Blockchain Dashboard</div>
        {
          (state.loading) ?
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> :
          (state.chainId === 1) ?
          <div className='container'>
            <div className='row'>
              <div className='col-md-6'>
                <BlockMonitor />
              </div>
              <div className='col-md-6'>
                <MessageSigner />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <EventMonitor />
              </div>
            </div>
          </div> :
          <div className='card'>
            <div className='card-body'>
              <div className='header'>Error</div>
            </div>
          </div>
        }
    </div>
    </AppContext.Provider>
  );
}

export default App;
