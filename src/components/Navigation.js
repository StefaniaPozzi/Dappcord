import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setAccount(account);
    console.log(`account ${account}`);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>Dappcord</h1>
      </div>

      {!account ? (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          {account.slice(0, 5) + ".." + account.slice(38, 42)}
        </button>
      )}
    </nav>
  );
};

export default Navigation;
