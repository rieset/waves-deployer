"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const core = require('@actions/core');
const config = core.getInput('config');
common_1.deploy(config).then((contracts) => {
    if (!contracts) {
        throw new Error('Action complete with error');
    }
    core.setOutput("contracts", contracts);
}).catch((error) => {
    throw new Error('Unexpected error: \n' + error.message);
});
