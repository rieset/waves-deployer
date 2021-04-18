"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const process_1 = require("process");
const [node, script, config] = process_1.argv;
common_1.deploy(config)
    .then((contracts) => {
    console.log(contracts);
})
    .catch((error) => {
    console.error('Unexpected error', error);
});
