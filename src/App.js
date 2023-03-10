import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { io } from "socket.io-client";

// Components
import Navigation from "./components/Navigation";
import Servers from "./components/Servers";
import Channels from "./components/Channels";
import Messages from "./components/Messages";

// ABIs
import abi from "./abis/Dappcord.json";

// Config
import config from "./config.json";

// Socket
//const socket = io("ws://localhost:3030");

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [channels, setChannels] = useState(null);

  const loadBlockchainData = async () => {
    //retrieve provider(network) and contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const contract = new ethers.Contract(
      config[network.chainId].Dappcord.address,
      abi,
      provider
    );
    setContract(contract);

    //retrieve channels
    const totalChannels = await contract.totalChannels();
    const channels = [];
    for (var i = 1; i <= totalChannels; i++) {
      channels.push(await contract.getChannel(i));
    }
    setChannels(channels);

    console.log(channels);
    window.ethereum.on("accountsChanged", async () => {
      window.location.reload();
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <main>
        <Servers />
        <Channels
          account={account}
          provider={provider}
          contract={contract}
          channels={channels}
        />
        <Messages />
      </main>
    </div>
  );
}

export default App;
