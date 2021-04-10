import { deploy } from './common';

const [ node, script, config ] = process.argv
deploy(config)
.then((contracts) => {
  console.log(contracts)
})
.catch((error) => {
  console.error('Unexpected error', error);
})
