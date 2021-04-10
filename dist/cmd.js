"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var _a = process.argv, node = _a[0], script = _a[1], config = _a[2];
index_1.deploy(config)
    .then(function (contracts) {
    console.log(contracts);
})
    .catch(function (error) {
    console.error('Unexpected error', error);
});
//# sourceMappingURL=cmd.js.map