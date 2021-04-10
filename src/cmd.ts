import { deploy } from './index';

const [ node, script, config ] = process.argv
deploy(config);
