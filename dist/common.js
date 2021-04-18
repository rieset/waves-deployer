"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = void 0;
const deployer_1 = require("./deployer");
const path = require('path');
const deploy = (config) => __awaiter(void 0, void 0, void 0, function* () {
    if (!config) {
        console.error('Config file is not specified');
    }
    else {
        const pathToConfig = path.resolve(config);
        // Get config file and start process deploy
        try {
            const configContent = require(pathToConfig);
            const deployer = new deployer_1.Deployer(configContent.node, configContent.chainId);
            return yield deployer.processing(configContent);
        }
        catch (e) {
            console.error('Config is not exist or invalid format: \n', e.message, '\n');
        }
    }
    return false;
});
exports.deploy = deploy;
