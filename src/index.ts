import { Deployer } from "./deployer";

export * from "./deployer";
const path = require('path');

const [node, script, config] = process.argv;

if (!config) {
  console.error('Config file is not specified');
} else {

  const pathToConfig = path.resolve(config);

  // Get config file and start process deploy
  try {
    const configContent = require(pathToConfig);
    const deployer = new Deployer(configContent.node, configContent.chainId);

    deployer.process(configContent)
  } catch (e) {
    console.error('Config is not exist or invalid format: \n', e.message, '\n')
  }

}
