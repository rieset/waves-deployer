import { Deployer } from "./deployer";
const path = require('path');

export const deploy = async (config): Promise<any> => {

  if (!config) {
    console.error('Config file is not specified');
  } else {

    const pathToConfig = path.resolve(config);

    // Get config file and start process deploy
    try {
      const configContent = require(pathToConfig);
      const deployer = new Deployer(configContent.node, configContent.chainId);

      return await deployer.process(configContent)
    } catch (e) {
      console.error('Config is not exist or invalid format: \n', e.message, '\n')
    }
  }
  
  return false;
}
