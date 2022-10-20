import logo from './logo.svg';
import './App.css';
import sass from './sass/app.scss';
import React, { Component } from "react";
import { providers } from "ethers";

class App extends Component {

  //USDT ADDRESS: 0xdAC17F958D2ee523a2206206994597C13D831ec7

  state = {
    blockNumber: null,
    biggestTransaction: {
      from: null,
      to: null,
    },
    provider: null,
    network: null,
    loading: false,
    erc20Tokens: [
      {"name": "Chainlink", "symbol": "LINK", "address": "0x514910771af9ca656af840dff83e8264ecf986ca"},
      {"name": "Tether", "symbol": "USDT", "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"},
      {"name": "Shibu Inu", "symbol": "SHIB", "address": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"},
      {"name": "Wrapped Bitcoin", "symbol": "WBTC", "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"},
      {"name": "Omise Go", "symbol": "OMG", "address": "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07"},
      {"name": "0x", "symbol": "ZRX", "address": "0xE41d2489571d322189246DaFA5ebDe1F4699F498"},
      {"name": "Maker", "symbol": "MKR", "address": "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"},
      {"name": "Golem", "symbol": "GNT", "address": "0xa74476443119A942dE498590Fe1f2454d7D4aC0d"},
      {"name": "Loopring", "symbol": "LRC", "address": "0xEF68e7C694F40c8202821eDF525dE3782458639f"},
      {"name": "Basic Attention Token", "symbol": "BAT", "address": "0x0D8775F648430679A709E98d2b0Cb6250d2887EF"},
    ],
    selectedToken: null,
  }

  render() {

    window.ethereum.on('accountsChanged', function (accounts) {
      console.log('accountsChanges',accounts);

    });

    window.ethereum.on('chainChanged', function (network) {
      getStuff();
    });

    const getProvider = () => {
      if (window.ethereum) {
        const provider = new providers.Web3Provider(window.ethereum);
        this.setState({provider: "Metamask"});
        return provider;
      } else {
        const provider = new providers.JsonRpcProvider("https://goerli.infura.io/v3/b59953df17ce4e248a1198806fe9c4bd");
        this.setState({provider: "Infura"});
        return provider;
      }
    }

    const getStuff = async() => {
      this.setState({loading: true});

      const provider = getProvider();

      const network = await provider.getNetwork();

      this.setState({network: network.name});

      let blockNumber = await provider.getBlockNumber();
      this.setState({blockNumber});

      let block = await provider.getBlock(blockNumber);

      block.transactions.map(async function(item, index) {
        let tx = await provider.getTransaction(item);
        console.log(tx);
      });

      this.setState({loading: false});
    }

    return (
      <div className="App">
        <div className="container my-5">
          <div className="card w-25 float-end">
            <div className="card-body">
              <div className="provider-box text-center">
                <table className="provider-box-table">
                  <tbody>
                    <tr>
                      <td className="col-3">Provider</td>
                      <td className="col-3">
                        {this.state.provider === "Metamask" && <img src="metamask192.png"></img>}
                        {this.state.provider === "Infura" && <img src="infura192.png"></img>}
                        {!this.state.provider && <span>...</span>}
                      </td>
                      <td className="col-3">Network</td>
                      <td className="col-3">
                        {this.state.network && <span className="badge rounded-pill bg-info">{this.state.network}</span>}
                        {!this.state.network && <span>...</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="m-3 clear-both">
            <button type="button" className={this.state.loading ? 'btn btn-outline-primary disabled' : 'btn btn-outline-primary'}
                    onClick={getStuff}>GET STUFF</button>
          </div>
          <div className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-2">Current ETH Block </h6>
              <h4 className="card-title">{this.state.blockNumber}</h4>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
          <div className="form-group w-25 my-3 m-auto">
            st: {this.state.selectedToken}
            <select onChange={(e) => this.setState({selectedToken: e.target.value})} className="form-select btn btn-outline-primary" id="exampleSelect1">
              <option>Select ERC20 Token</option>
                { this.state.erc20Tokens.map(token =>
                  <option key={token.address} value={token.address}>{token.name} {token.symbol}</option>
                )}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
