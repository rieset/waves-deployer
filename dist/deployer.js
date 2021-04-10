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
exports.Deployer = void 0;
const waves_transactions_1 = require("@waves/waves-transactions");
const node_api_js_1 = require("@waves/node-api-js");
const fs = require("fs");
const path_1 = require("path");
class Deployer {
    constructor(node, chainId) {
        this.node = 'https://nodes.wavesnodes.com';
        this.chainId = 'W';
        this.anchors = [];
        this.chainId = chainId;
        this.node = node;
        this.network = node_api_js_1.create(this.node);
    }
    process(config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!config.contracts || !config.contracts.length) {
                console.error('Contracts are not passed to the script');
            }
            return yield Promise.all(
            // Get address for all contracts
            config.contracts.map((contract) => __awaiter(this, void 0, void 0, function* () {
                const isNew = !contract.seed;
                const seed = contract.seed || waves_transactions_1.libs.crypto.randomSeed(15);
                const address = yield this.getAddress(seed);
                if (contract.anchor) {
                    this.setAnchor(contract.anchor, address);
                }
                return Object.assign(Object.assign({}, contract), { address: address, seed: seed, balance: 0, requestBalance: contract.requestBalance || 10000000, isNew, init: contract.init || null });
            })))
                .then((constracts) => __awaiter(this, void 0, void 0, function* () {
                yield this.checkDeposit(constracts, config.deposit);
                // Get balances
                return Promise.all(constracts
                    .filter(contract => !!contract.address)
                    .map((contract) => __awaiter(this, void 0, void 0, function* () {
                    return Object.assign(Object.assign({}, contract), { balance: yield this.refillBalance(contract.address, config.deposit, contract.requestBalance, contract.isNew), script: yield this.convertScript(contract.script) });
                })));
            }))
                .then((constracts) => __awaiter(this, void 0, void 0, function* () {
                // Get balances
                return Promise.all(constracts
                    // .filter(contract => contract.balance >= contract.requestBalance)
                    .map((contract) => __awaiter(this, void 0, void 0, function* () {
                    return Object.assign(Object.assign({}, contract), { status: yield this.deployContract(contract), script: '...', seed: contract.isNew ? contract.seed : contract.seed.substr(0, 7) });
                })));
            }))
                .then((constracts) => __awaiter(this, void 0, void 0, function* () {
                // Get balances
                return Promise.all(constracts
                    // .filter(contract => contract.balance >= contract.requestBalance)
                    .map((contract) => __awaiter(this, void 0, void 0, function* () {
                    return Object.assign(Object.assign({}, contract), { inited: contract.init ? yield this.initScripts(contract.address, contract.seed, contract.init) : false });
                })));
            }))
                .catch((error) => {
                console.log('Error on flow: ', error.message);
                throw new Error(error.message);
            });
        });
    }
    setAnchor(key, value) {
        this.anchors.push([key, value]);
        process.env[key] = value;
    }
    checkDeposit(contracts, seed) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = contracts.reduce((origin, contract) => origin + contract.requestBalance, 0);
            const address = yield this.getAddress(seed);
            const balance = yield this.getBalance(address);
            if (request > balance) {
                console.error(`Deploy request ${request} Waves. But balance deposit is ${balance} Waves. Need a refill deposit account`);
                throw new Error('Insufficient funds on deposit');
            }
        });
    }
    getAddress(seed) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return ((_a = waves_transactions_1.auth({
                data: '',
                host: this.node
            }, seed, this.chainId)) === null || _a === void 0 ? void 0 : _a.address) || null;
        });
    }
    getBalance(address) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return !address ? 0 : (((_a = (yield this.network.addresses.fetchBalance(address))) === null || _a === void 0 ? void 0 : _a.balance) || 0);
        });
    }
    refillBalance(address, deposit, request, isNew) {
        return __awaiter(this, void 0, void 0, function* () {
            let balance = 0;
            try {
                balance = yield this.getBalance(address);
            }
            catch (error) {
                console.log('Error after we get a balance ', error.message);
            }
            if (balance < request) {
                try {
                    const tx = waves_transactions_1.transfer({
                        recipient: address,
                        amount: (BigInt(request) - BigInt(balance.toString())).toString(),
                        fee: isNew ? 500000 : 900000
                    }, deposit);
                    yield waves_transactions_1.broadcast(Object.assign({}, tx), this.node)
                        .then((data) => __awaiter(this, void 0, void 0, function* () {
                        yield this.checkTx(data.id);
                    }));
                    balance = request;
                }
                catch (error) {
                    console.log('Error after trying to refill the purses of future contracts ', error.message);
                }
            }
            return balance;
        });
    }
    convertScript(script) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let content = yield new Promise((done) => __awaiter(this, void 0, void 0, function* () {
                fs.readFile(path_1.resolve(script), { encoding: 'utf-8' }, (err, data) => {
                    if (err) {
                        console.error('File not exist error reading');
                        done('');
                    }
                    else {
                        done(data);
                    }
                });
            }));
            // Replace anchors on contracts
            this.anchors.forEach(([anchor, value]) => {
                content = content.replace('${' + anchor + '}', value);
            });
            try {
                return (_a = (yield this.network.utils.fetchCompileCode(content))) === null || _a === void 0 ? void 0 : _a.script;
            }
            catch (error) {
                console.log('Couldn\'t transform the script into a compatible format. ', error.message);
            }
            return '';
        });
    }
    deployContract(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const script = waves_transactions_1.setScript({
                    fee: 1900000,
                    version: 2,
                    script: contract.script,
                    chainId: this.chainId
                }, contract.seed);
                yield waves_transactions_1.broadcast(Object.assign({}, script), this.node)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    yield this.checkTx(data.id);
                }));
                return 'success';
            }
            catch (error) {
                console.error('The process ended with an error', error.message);
            }
            return 'error';
        });
    }
    checkTx(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield this.network.transactions.fetchUnconfirmedInfo(id);
                        resolve(this.checkTx(id));
                    }
                    catch (error) {
                        resolve(true);
                    }
                }), 1000);
            });
        });
    }
    initScripts(address, seed, scripts) {
        return __awaiter(this, void 0, void 0, function* () {
            return scripts ? yield Promise.all(Object.keys(scripts).map((functionName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const tx = waves_transactions_1.invokeScript({
                        dApp: address,
                        call: {
                            function: functionName,
                            // @ts-ignore
                            args: scripts[functionName]
                        },
                        fee: 900000,
                        chainId: this.chainId
                    }, seed);
                    yield waves_transactions_1.broadcast(tx, this.node)
                        .then((data) => __awaiter(this, void 0, void 0, function* () {
                        yield this.checkTx(data.id);
                    }));
                    return true;
                }
                catch (error) {
                    console.log('Contract initialization failed ', error.message);
                }
            }))) : false;
        });
    }
}
exports.Deployer = Deployer;
