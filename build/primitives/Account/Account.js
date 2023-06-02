"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.Account = void 0;
var elliptic = __importStar(require("elliptic"));
var core_1 = require("../../Client/providers/LCDClient/core");
var key_1 = require("../../Client/providers/LCDClient/key");
var Account = /** @class */ (function () {
    function Account(key, accountIndex, lcdcInstance) {
        if (accountIndex === void 0) { accountIndex = 0; }
        this.lcdcInstance = lcdcInstance !== null && lcdcInstance !== void 0 ? lcdcInstance : null;
        this.derivableAccountKey = key.derivePath("m/".concat(accountIndex, "'"));
        this.accountIndex = accountIndex;
    }
    Account.prototype.getAddress = function (index) {
        if (index === void 0) { index = 0; }
        return this.derivableAccountKey.derivePath("m/0/".concat(index)).toAddress();
        // return this.derivableAccountKey.toAddress();
    };
    Account.prototype.getPrivate = function (index) {
        if (index === void 0) { index = 0; }
        return this.derivableAccountKey.derivePath("m/0/".concat(index)).toPrivate();
    };
    Account.prototype.getPublic = function (index) {
        if (index === void 0) { index = 0; }
        return this.derivableAccountKey.derivePath("m/0/".concat(index)).toPublic();
    };
    Account.prototype.signMessage = function (message, index) {
        if (index === void 0) { index = 0; }
        var privateKey = this.getPrivate(index);
        var ec = new elliptic.ec('secp256k1');
        var key = ec.keyFromPrivate(privateKey);
        var sign = key.sign(message.toString()).toDER();
        // @ts-ignore
        return Buffer.from(sign);
    };
    Account.prototype.verifySignature = function (signature, message, publicKey) {
        var ec = new elliptic.ec('secp256k1');
        var isValid = false;
        if (!publicKey) {
            throw new Error('Expected publicKey');
        }
        // We verify a publicKey
        var pubKey = ec.keyFromPublic(publicKey, 'hex');
        isValid = pubKey.verify(message.toString(), Buffer.from(signature, 'hex'));
        return isValid;
    };
    Account.prototype.getLCDClient = function () {
        return this.lcdcInstance;
    };
    Account.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var lcdClient, balanceAddress, balance, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lcdClient = this.getLCDClient();
                        if (!lcdClient)
                            throw new Error('LCDClient not initialized');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        balanceAddress = address !== null && address !== void 0 ? address : this.getAddress();
                        return [4 /*yield*/, lcdClient.bank.balance(balanceAddress)];
                    case 2:
                        balance = (_a.sent())[0];
                        return [2 /*return*/, balance.get('ujmes') || new core_1.Coin("ujmes", 0)];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Account.prototype.getVotingRights = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var lcdClient, balanceAddress, balance, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lcdClient = this.getLCDClient();
                        if (!lcdClient)
                            throw new Error('LCDClient not initialized');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        balanceAddress = address !== null && address !== void 0 ? address : this.getAddress();
                        return [4 /*yield*/, lcdClient.bank.balance(balanceAddress)];
                    case 2:
                        balance = (_a.sent())[0];
                        return [2 /*return*/, balance.get('bujmes') || new core_1.Coin("bujmes", 0)];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2);
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // @ts-ignore
    Account.prototype.sendTransaction = function (transactionOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var send, txOpts, lcdClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        send = new core_1.MsgSend(this.getAddress(), transactionOpts.recipientAddress, { ujmes: transactionOpts.recipientAmount });
                        txOpts = { msgs: [send] };
                        if (transactionOpts.memo) {
                            //@ts-ignore
                            txOpts.memo = transactionOpts.memo;
                        }
                        return [4 /*yield*/, this.getLCDClient()];
                    case 1:
                        lcdClient = _a.sent();
                        // @ts-ignore
                        return [2 /*return*/, lcdClient.wallet(new key_1.RawKey(this.getPrivate()))
                                //@ts-ignore
                                .createAndSignTx(txOpts)
                                //@ts-ignore
                                .then(function (tx) { return lcdClient.tx.broadcast(tx); })
                                //@ts-ignore
                                .then(function (result) {
                                console.log("TX hash: ".concat(result.txhash));
                                return result;
                            }).catch(function (e) {
                                // console.log(e);
                                throw e;
                            })];
                }
            });
        });
    };
    Account.prototype.withdrawCommission = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            var lcdClient, fee, msg, wallet, signedTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLCDClient()];
                    case 1:
                        lcdClient = _a.sent();
                        if (!lcdClient)
                            return [2 /*return*/, null];
                        fee = new core_1.Fee(0, new core_1.Coins({ ujmes: 0 }));
                        msg = new core_1.MsgWithdrawValidatorCommission(validator);
                        wallet = lcdClient.wallet(new key_1.RawKey(this.getPrivate()));
                        return [4 /*yield*/, wallet
                                //@ts-ignore
                                .createAndSignTx({ msgs: [msg] }, fee)
                            // .createAndSignTx({msgs: [msg]}, fee)
                        ];
                    case 2:
                        signedTx = _a.sent();
                        // .createAndSignTx({msgs: [msg]}, fee)
                        return [2 /*return*/, lcdClient.tx.broadcast(signedTx)];
                }
            });
        });
    };
    /**
     * Allow to withdraw delegator rewards given an address and set of validators
     * @param address
     * @param validators
     * @param type=[delegator|validator]
     */
    Account.prototype.withdrawRewards = function (address, validators) {
        return __awaiter(this, void 0, void 0, function () {
            var lcdClient, msgs, _i, validators_1, validator, msg, wallet, signedTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLCDClient()];
                    case 1:
                        lcdClient = _a.sent();
                        if (!lcdClient)
                            return [2 /*return*/, null];
                        msgs = [];
                        for (_i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
                            validator = validators_1[_i];
                            msg = new core_1.MsgWithdrawDelegatorReward(address, validator);
                            msgs.push(msg);
                        }
                        wallet = lcdClient.wallet(new key_1.RawKey(this.getPrivate()));
                        return [4 /*yield*/, wallet
                                .createAndSignTx({ msgs: msgs })];
                    case 2:
                        signedTx = _a.sent();
                        return [2 /*return*/, lcdClient.tx.broadcast(signedTx)];
                }
            });
        });
    };
    Account.prototype.delegateTokens = function (validatorAddress, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var lcdClient, msg, msgs, wallet, signedTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLCDClient()];
                    case 1:
                        lcdClient = _a.sent();
                        if (!lcdClient)
                            return [2 /*return*/, null];
                        msg = new core_1.MsgDelegate(this.getAddress(), validatorAddress, amount);
                        msgs = [msg];
                        wallet = lcdClient.wallet(new key_1.RawKey(this.getPrivate()));
                        return [4 /*yield*/, wallet
                                .createAndSignTx({ msgs: msgs })];
                    case 2:
                        signedTx = _a.sent();
                        return [2 /*return*/, lcdClient.tx.broadcast(signedTx)];
                }
            });
        });
    };
    Account.prototype.undelegateTokens = function (validatorAddress, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var lcdClient, msg, msgs, wallet, signedTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLCDClient()];
                    case 1:
                        lcdClient = _a.sent();
                        if (!lcdClient)
                            return [2 /*return*/, null];
                        msg = new core_1.MsgUndelegate(this.getAddress(), validatorAddress, amount);
                        msgs = [msg];
                        wallet = lcdClient.wallet(new key_1.RawKey(this.getPrivate()));
                        return [4 /*yield*/, wallet
                                .createAndSignTx({ msgs: msgs })];
                    case 2:
                        signedTx = _a.sent();
                        return [2 /*return*/, lcdClient.tx.broadcast(signedTx)];
                }
            });
        });
    };
    return Account;
}());
exports.Account = Account;
;
//# sourceMappingURL=Account.js.map