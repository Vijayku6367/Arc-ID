async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Badge = await ethers.getContractFactory("ArcBadgeNFT");
  const badge = await Badge.deploy();
  await badge.waitForDeployment();
  const badgeAddress = await badge.getAddress();
  console.log("ArcBadgeNFT deployed:", badgeAddress);

  const Task = await ethers.getContractFactory("TaskRegistry");
  const task = await Task.deploy();
  await task.waitForDeployment();
  const taskAddress = await task.getAddress();
  console.log("TaskRegistry deployed:", taskAddress);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
