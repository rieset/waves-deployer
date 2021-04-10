import { deploy } from './common';
const core = require('@actions/core');

const config = core.getInput('config');

deploy(config).then((contracts) => {
  if (!contracts) {
    throw new Error('Action complete with error');
  }

  core.setOutput("contracts", JSON.stringify(contracts, null, '\n'));
}).catch((error) => {
  throw new Error('Unexpected error: \n' + error.message);
})

