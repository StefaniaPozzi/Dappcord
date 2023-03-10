const { expect } = require("chai");

describe("Dappcord", function () {
  let dappcordContract;
  let deployer, user;
  const ID = 1;
  const NAME = "MyTokenName";
  const SYMBOL = "MTN";
  const CHANNEL_NAME = "General channel";
  const CHANNEL_COST = ethers.utils.parseUnits("0.1", "ether");

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
  describe("Create channels", () => {
    it("returns total channels", async () => {
      const totalChannels = await dappcordContract.totalChannels();
      expect(totalChannels).to.be.equal(ID);
    });
    it("returns channel attributes", async () => {
      const channel = await dappcordContract.getChannel(ID);
      expect(channel.id).to.be.equal(ID);
      expect(channel.name).to.be.equal(CHANNEL_NAME);
      expect(channel.cost).to.be.equal(CHANNEL_COST);
    });
  });
  describe("Join channels", () => {
    beforeEach(async () => {
      const tx = await dappcordContract
        .connect(user)
        .mint(ID, { value: CHANNEL_COST });
      await tx.wait();
    });
    it("Join the user", async () => {
      const hasJoined = await dappcordContract.hasJoined(ID, user.address);
      expect(hasJoined).to.be.equal(true);
    });
    it("Increase supply", async () => {
      const supply = await dappcordContract.totalSupply();
      expect(supply).to.be.equal(ID);
    });
    it("Updates contract balance", async () => {
      const balance = await ethers.provider.getBalance(
        dappcordContract.address
      );
      expect(balance).to.be.equal(CHANNEL_COST);
    });
  });
  describe("withdraw", () => {
    let balance_0;
    let balance_1;
    beforeEach(async () => {
      balance_0 = await ethers.provider.getBalance(deployer.address);
      let mint_tx = await dappcordContract
        .connect(user)
        .mint(ID, { value: CHANNEL_COST });
      await mint_tx.wait();
      let with_tx = await dappcordContract.connect(deployer).withdraw();
      await with_tx;
    });

    it("Update owner balance", async () => {
      balance_1 = await ethers.provider.getBalance(deployer.address);
      expect(balance_1).to.be.greaterThan(balance_0);
    });
    it("Update contract balance", async () => {
      const contract_balance = await ethers.provider.getBalance(
        dappcordContract.address
      );
      expect(contract_balance).to.equal(0);
    });
  });
});
