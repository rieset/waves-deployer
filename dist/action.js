"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var core = require('@actions/core');
var config = core.getInput('config');
index_1.deploy(config).then(function (contracts) {
    if (!contracts) {
        throw new Error('Action complete with error');
    }
    core.setOutput("contracts", JSON.stringify(contracts, null, '\n'));
}).catch(function (error) {
    throw new Error('Unexpected error: \n' + error.message);
});
//# sourceMappingURL=action.js.map