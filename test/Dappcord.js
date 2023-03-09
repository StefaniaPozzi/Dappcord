const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Dappcord", function () {
  let dappcordContract;
  let deployer, user;
  const NAME = "MyTokenName";
  const SYMBOL = "MTN";
  const CHANNEL_NAME = "General channel";
  const CHANNEL_COST = tokens(0.1);

  beforeEach(async () => {
    //setup accounts
    [deployer, user] = await ethers.getSigners();

    //deployment
    const dappContractFactory = await ethers.getContractFactory("Dappcord");
    dappcordContract = await dappContractFactory.deploy(NAME, SYMBOL);

    //create channels
    const tx = await dappcordContract
      .connect(deployer)
      .createChannel(CHANNEL_NAME, CHANNEL_COST);
    await tx.wait();
  });
  describe("Deployment", () => {
    it("sets name and symbol", async () => {
      let name = await dappcordContract.name();
      expect(name).to.equal(NAME);
      let symbol = await dappcordContract.symbol();
      expect(symbol).to.equal(SYMBOL);
    });
    it("sets owner", async () => {
      owner = await dappcordContract.owner();
      expect(owner).to.equal(deployer.address);
    });
  });
  describe("Managing channels", () => {
    it("returns total channels", async () => {
      const totalChannels = await dappcordContract.totalChannels();
      expect(totalChannels).to.be.equal(1);
    });
    it("returns channel attributes", async () => {
      const channel = await dappcordContract.getChannel(1);
      expect(channel.id).to.be.equal(1);
      expect(channel.name).to.be.equal(CHANNEL_NAME);
      expect(channel.cost).to.be.equal(CHANNEL_COST);
    } );
    
  });
});
