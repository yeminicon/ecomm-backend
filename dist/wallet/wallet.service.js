"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
const mongoose_2 = require("mongoose");
const Wallet_schema_1 = require("../schemas/Wallet.schema");
let WalletService = class WalletService {
    constructor(merchantModel, walletModel) {
        this.merchantModel = merchantModel;
        this.walletModel = walletModel;
    }
    generateAccountNumber() {
        const prefix = '6094';
        const randomNumber = Math.floor(Math.random() * 10000000)
            .toString()
            .padStart(6, '0');
        return prefix + randomNumber;
    }
    async isAccountNumberUnique(accountNumber) {
        const existingWallet = await this.walletModel.findOne({ accountNumber });
        return !existingWallet;
    }
    async create(merchantId) {
        const findMerchant = await this.merchantModel.findById(merchantId);
        console.log(findMerchant);
        console.log(merchantId);
        if (!findMerchant) {
            throw new common_1.BadRequestException('No merchant record found for this user.');
        }
        console.log(findMerchant);
        let accountNumber = this.generateAccountNumber();
        while (!(await this.isAccountNumberUnique(accountNumber))) {
            accountNumber = this.generateAccountNumber();
        }
        const createWallet = new this.walletModel({
            merchantId: merchantId,
            WalletName: findMerchant.merchantName,
            Balance: 0,
            acctNumber: accountNumber,
            phoneNumber: findMerchant.phoneNumber,
            email: findMerchant.businessEmail,
        });
        return createWallet.save();
    }
    async addFund(merchantId, confirmAmount) {
        const findMerchant = await this.merchantModel.findOne({ _id: merchantId });
        console.log(findMerchant);
        console.log(merchantId);
        if (!findMerchant) {
            throw new common_1.BadRequestException('No merchant record found for this user.');
        }
        const findAccount = await this.walletModel.findOne({
            merchantId: merchantId,
        });
        if (!findAccount) {
            throw new common_1.BadRequestException('No account found for this user.');
        }
        const updatedInformation = {
            Balance: findAccount.Balance + confirmAmount,
        };
        const fundAccount = await this.walletModel.findByIdAndUpdate(findAccount._id.toString(), updatedInformation);
        return fundAccount;
    }
    async findAll() {
        return this.walletModel.find().exec();
    }
    async findOne(id) {
        return this.walletModel.findById(id);
    }
    async update(id, updateWalletDto) {
        const findWallet = await this.walletModel.findById(id);
        if (!findWallet) {
            throw new common_1.BadRequestException('No Wallet record found');
        }
        return this.walletModel
            .findByIdAndUpdate(id, updateWalletDto, {
            new: true,
        })
            .exec();
    }
    async remove(id) {
        return this.walletModel.findByIdAndDelete(id);
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Merchant_schema_1.Merchant.name)),
    __param(1, (0, mongoose_1.InjectModel)(Wallet_schema_1.Wallet.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], WalletService);
//# sourceMappingURL=wallet.service.js.map