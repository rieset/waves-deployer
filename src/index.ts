import { Deployer } from "./deployer";
const core = require('@actions/core');
const path = require('path');

const config = core.getInput('config');

console.log('Action', config);

if (!config) {
  console.error('Config file is not specified');
} else {

  const pathToConfig = path.resolve(config);

  // Get config file and start process deploy
  try {
    const configContent = require(pathToConfig);
    const deployer = new Deployer(configContent.node, configContent.chainId);

    deployer.process(configContent).then((data) => {
      core.setOutput("contracts", JSON.stringify(data, null, '\t'));
    })
  } catch (e) {
    console.error('Config is not exist or invalid format: \n', e.message, '\n')
  }

}
