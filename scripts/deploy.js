const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const NAME = "Daccord";
  const SYMBOL = "DC";
  const CHANNEL_COST_1 = ethers.utils.parseUnits("0", "ether");
  const CHANNEL_COST_2 = ethers.utils.parseUnits("0.11", "ether");

  const dappcordFactory = await ethers.getContractFactory("Dappcord");
  const dappcordDeployed = await dappcordFactory.deploy(NAME, SYMBOL);
  await dappcordDeployed.deployed();

  console.log(`Deployed at ${dappcordDeployed.address}`);

  //Create 3 channels
  const CHANNEL_NAMES = ["General", "Paleo diet", "Keto diet"];
  const CHANNEL_COSTS = [CHANNEL_COST_1, CHANNEL_COST_2, CHANNEL_COST_2];
  for (var i = 0; i < 3; i++) {
    const tx = await dappcordDeployed
      .connect(deployer)
      .createChannel(CHANNEL_NAMES[i], CHANNEL_COSTS[i]);
    await tx.wait();
    console.log(`Created channel #${CHANNEL_NAMES[i]}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
