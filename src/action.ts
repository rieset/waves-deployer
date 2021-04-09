import { deploy } from './index';
const core = require('@actions/core');

const config = core.getInput('config');
console.log('Action', config);

deploy(config);
