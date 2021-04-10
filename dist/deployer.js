"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deployer = void 0;
var waves_transactions_1 = require("@waves/waves-transactions");
var node_api_js_1 = require("@waves/node-api-js");
var fs = require("fs");
var path_1 = require("path");
var Deployer = /** @class */ (function () {
    function Deployer(node, chainId) {
        this.node = 'https://nodes.wavesnodes.com';
        this.chainId = 'W';
        this.anchors = [];
        this.chainId = chainId;
        this.node = node;
        this.network = node_api_js_1.create(this.node);
    }
    Deployer.prototype.process = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!config.contracts || !config.contracts.length) {
                            console.error('Contracts are not passed to the script');
                        }
                        return [4 /*yield*/, Promise.all(
                            // Get address for all contracts
                            config.contracts.map(function (contract) { return __awaiter(_this, void 0, void 0, function () {
                                var isNew, seed, address;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            isNew = !contract.seed;
                                            seed = contract.seed || waves_transactions_1.libs.crypto.randomSeed(15);
                                            return [4 /*yield*/, this.getAddress(seed)];
                                        case 1:
                                            address = _a.sent();
                                            if (contract.anchor) {
                                                this.setAnchor(contract.anchor, address);
                                            }
                                            return [2 /*return*/, __assign(__assign({}, contract), { address: address, seed: seed, balance: 0, requestBalance: contract.requestBalance || 10000000, isNew: isNew, init: contract.init || null })];
                                    }
                                });
                            }); }))
                                .then(function (constracts) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.checkDeposit(constracts, config.deposit)];
                                        case 1:
                                            _a.sent();
                                            // Get balances
                                            return [2 /*return*/, Promise.all(constracts
                                                    .filter(function (contract) { return !!contract.address; })
                                                    .map(function (contract) { return __awaiter(_this, void 0, void 0, function () {
                                                    var _a;
                                                    var _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                _a = [__assign({}, contract)];
                                                                _b = {};
                                                                return [4 /*yield*/, this.refillBalance(contract.address, config.deposit, contract.requestBalance, contract.isNew)];
                                                            case 1:
                                                                _b.balance = _c.sent();
                                                                return [4 /*yield*/, this.convertScript(contract.script)];
                                                            case 2: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_b.script = _c.sent(), _b)]))];
                                                        }
                                                    });
                                                }); }))];
                                    }
                                });
                            }); })
                                .then(function (constracts) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    // Get balances
                                    return [2 /*return*/, Promise.all(constracts
                                            // .filter(contract => contract.balance >= contract.requestBalance)
                                            .map(function (contract) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a;
                                            var _b;
                                            return __generator(this, function (_c) {
                                                switch (_c.label) {
                                                    case 0:
                                                        _a = [__assign({}, contract)];
                                                        _b = {};
                                                        return [4 /*yield*/, this.deployContract(contract)];
                                                    case 1: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_b.status = _c.sent(), _b.script = '...', _b.seed = contract.isNew ? contract.seed : contract.seed.substr(0, 7), _b)]))];
                                                }
                                            });
                                        }); }))];
                                });
                            }); })
                                .then(function (constracts) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    // Get balances
                                    return [2 /*return*/, Promise.all(constracts
                                            // .filter(contract => contract.balance >= contract.requestBalance)
                                            .map(function (contract) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a, _b;
                                            var _c;
                                            return __generator(this, function (_d) {
                                                switch (_d.label) {
                                                    case 0:
                                                        _a = [__assign({}, contract)];
                                                        _c = {};
                                                        if (!contract.init) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, this.initScripts(contract.address, contract.seed, contract.init)];
                                                    case 1:
                                                        _b = _d.sent();
                                                        return [3 /*break*/, 3];
                                                    case 2:
                                                        _b = false;
                                                        _d.label = 3;
                                                    case 3: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_c.inited = _b, _c)]))];
                                                }
                                            });
                                        }); }))];
                                });
                            }); })
                                .catch(function (error) {
                                console.log('Error on flow: ', error.message);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Deployer.prototype.setAnchor = function (key, value) {
        this.anchors.push([key, value]);
    };
    Deployer.prototype.checkDeposit = function (contracts, seed) {
        return __awaiter(this, void 0, void 0, function () {
            var request, address, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = contracts.reduce(function (origin, contract) { return origin + contract.requestBalance; }, 0);
                        return [4 /*yield*/, this.getAddress(seed)];
                    case 1:
                        address = _a.sent();
                        return [4 /*yield*/, this.getBalance(address)];
                    case 2:
                        balance = _a.sent();
                        if (request > balance) {
                            console.error("Deploy request " + request + " Waves. But balance deposit is " + balance + " Waves. Need a refill deposit account");
                            throw new Error('Insufficient funds on deposit');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Deployer.prototype.getAddress = function (seed) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, ((_a = waves_transactions_1.auth({
                        data: '',
                        host: this.node
                    }, seed, this.chainId)) === null || _a === void 0 ? void 0 : _a.address) || null];
            });
        });
    };
    Deployer.prototype.getBalance = function (address) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!address) return [3 /*break*/, 1];
                        _b = 0;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.network.addresses.fetchBalance(address)];
                    case 2:
                        _b = (((_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.balance) || 0);
                        _c.label = 3;
                    case 3: return [2 /*return*/, _b];
                }
            });
        });
    };
    Deployer.prototype.refillBalance = function (address, deposit, request, isNew) {
        return __awaiter(this, void 0, void 0, function () {
            var balance, error_1, tx, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        balance = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getBalance(address)];
                    case 2:
                        balance = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log('Error after we get a balance ', error_1.message);
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(balance < request)) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        tx = waves_transactions_1.transfer({
                            recipient: address,
                            amount: (BigInt(request) - BigInt(balance.toString())).toString(),
                            fee: isNew ? 500000 : 900000
                        }, deposit);
                        return [4 /*yield*/, waves_transactions_1.broadcast(__assign({}, tx), this.node)
                                .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.checkTx(data.id)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 6:
                        _a.sent();
                        balance = request;
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        console.log('Error after trying to refill the purses of future contracts ', error_2.message);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, balance];
                }
            });
        });
    };
    Deployer.prototype.convertScript = function (script) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var content, error_3;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (done) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                fs.readFile(path_1.resolve(script), { encoding: 'utf-8' }, function (err, data) {
                                    if (err) {
                                        console.error('File not exist error reading');
                                        done('');
                                    }
                                    else {
                                        done(data);
                                    }
                                });
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        content = _b.sent();
                        // Replace anchors on contracts
                        this.anchors.forEach(function (_a) {
                            var anchor = _a[0], value = _a[1];
                            content = content.replace('${' + anchor + '}', value);
                        });
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.network.utils.fetchCompileCode(content)];
                    case 3: return [2 /*return*/, (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.script];
                    case 4:
                        error_3 = _b.sent();
                        console.log('Couldn\'t transform the script into a compatible format. ', error_3.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, ''];
                }
            });
        });
    };
    Deployer.prototype.deployContract = function (contract) {
        return __awaiter(this, void 0, void 0, function () {
            var script, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        script = waves_transactions_1.setScript({
                            fee: 1900000,
                            version: 2,
                            script: contract.script,
                            chainId: this.chainId
                        }, contract.seed);
                        return [4 /*yield*/, waves_transactions_1.broadcast(__assign({}, script), this.node)
                                .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.checkTx(data.id)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 'success'];
                    case 2:
                        error_4 = _a.sent();
                        console.error('The process ended with an error', error_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, 'error'];
                }
            });
        });
    };
    Deployer.prototype.checkTx = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var error_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.network.transactions.fetchUnconfirmedInfo(id)];
                                    case 1:
                                        _a.sent();
                                        resolve(this.checkTx(id));
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_5 = _a.sent();
                                        resolve(true);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }, 1000);
                    })];
            });
        });
    };
    Deployer.prototype.initScripts = function (address, seed, scripts) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!scripts) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(Object.keys(scripts).map(function (functionName) { return __awaiter(_this, void 0, void 0, function () {
                                var tx, error_6;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            tx = waves_transactions_1.invokeScript({
                                                dApp: address,
                                                call: {
                                                    function: functionName,
                                                    // @ts-ignore
                                                    args: scripts[functionName]
                                                },
                                                fee: 900000,
                                                chainId: this.chainId
                                            }, seed);
                                            return [4 /*yield*/, waves_transactions_1.broadcast(tx, this.node)
                                                    .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, this.checkTx(data.id)];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, true];
                                        case 2:
                                            error_6 = _a.sent();
                                            console.log('Contract initialization failed ', error_6.message);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = false;
                        _b.label = 3;
                    case 3: return [2 /*return*/, _a];
                }
            });
        });
    };
    return Deployer;
}());
exports.Deployer = Deployer;
//# sourceMappingURL=deployer.js.map