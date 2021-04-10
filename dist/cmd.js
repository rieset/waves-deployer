"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const [node, script, config] = process.argv;
common_1.deploy(config)
    .then((contracts) => {
    console.log(contracts);
})
    .catch((error) => {
    console.error('Unexpected error', error);
});
