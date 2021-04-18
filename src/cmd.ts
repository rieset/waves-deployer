import { deploy } from './common';
import { argv } from 'process'

const [ node, script, config ] = argv
deploy(config)
.then((contracts) => {
  console.log(contracts)
})
.catch((error) => {
  console.error('Unexpected error', error);
})
