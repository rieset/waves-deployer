import { Deployer } from "./deployer";
const core = require('@actions/core');
const path = require('path');

export const deploy = async (config, silly: boolean = false): Promise<any> => {

  if (!config) {
    console.error('Config file is not specified');
  } else {

    const pathToConfig = path.resolve(config);

    // Get config file and start process deploy
    try {
      const configContent = require(pathToConfig);
      const deployer = new Deployer(configContent.node, configContent.chainId);

      return await deployer.process(configContent).then((data) => {
        if (!silly) {
          core.setOutput("contracts", JSON.stringify(data, null, '\n'));
        }
        
        return data;
      })
    } catch (e) {
      console.error('Config is not exist or invalid format: \n', e.message, '\n')
    }
  }
  
  return false;
}
