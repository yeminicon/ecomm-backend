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
exports.MerchantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("../schemas/User.schema");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
const Wallet_schema_1 = require("../schemas/Wallet.schema");
const wallet_service_1 = require("../wallet/wallet.service");
const bcrypt = require("bcryptjs");
const product_service_1 = require("../product/product.service");
const Order_schema_1 = require("../schemas/Order.schema");
let MerchantService = class MerchantService {
    constructor(merchantModel, userModel, walletModel, orderModel, walletService, productService) {
        this.merchantModel = merchantModel;
        this.userModel = userModel;
        this.walletModel = walletModel;
        this.orderModel = orderModel;
        this.walletService = walletService;
        this.productService = productService;
    }
    async create(createMerchantDto) {
        console.log(createMerchantDto);
        const findMerchant = await this.merchantModel.findOne({
            merchantName: createMerchantDto.merchantName,
        });
        if (findMerchant) {
            throw new common_1.BadRequestException('Choose another name A merchant with tha name exist');
        }
        const hashedPassword = await bcrypt.hash(createMerchantDto.password, 10);
        const createdMerchant = new this.merchantModel({
            merchantName: createMerchantDto.merchantName,
            businessType: createMerchantDto.businessType,
            phoneNumber: createMerchantDto.phoneNumber,
            businessEmail: createMerchantDto.businessEmail,
            businessCategory: createMerchantDto.businessCategory,
            password: hashedPassword,
        });
        const result = await createdMerchant.save();
        console.log(result);
        const _id = result._id.toString();
        await this.walletService.create(_id);
        return result;
    }
    async findById(id) {
        return this.merchantModel.findById(id).exec();
    }
    async findByName(name) {
        return this.merchantModel.findOne({ merchantName: name });
    }
    async update(id, merchant) {
        return this.merchantModel
            .findByIdAndUpdate(id, merchant, { new: true })
            .exec();
    }
    async validateMerchant(businessEmail, password) {
        const merchant = await this.merchantModel.findOne({ businessEmail });
        if (merchant && (await bcrypt.compare(password, merchant.password))) {
            return merchant;
        }
        return null;
    }
    async findByEmail(email) {
        const merchant = await this.merchantModel.findOne({ businessEmail: email });
        if (!merchant) {
            throw new common_1.BadRequestException('No merchant record found');
        }
        return merchant;
    }
    async createProduct(merchantId, createProductDto) {
        const findMerchant = await this.merchantModel.findById(merchantId);
        if (!findMerchant) {
            throw new common_1.BadRequestException('No Merchant record found with this merchant id');
        }
        const createProduct = await this.productService.createNewProduct(createProductDto);
        return createProduct;
    }
    async findProductByMerchantId(merchantId) {
        await this.productService.findAllByMerchant(merchantId);
    }
    async delete(id) {
        return this.merchantModel.findByIdAndDelete(id);
    }
    async findMerchantOrders(merchantId) {
        const orders = await this.orderModel
            .find({
            'cartItem.merchantId': merchantId,
        })
            .exec();
        if (!orders.length) {
            throw new common_1.NotFoundException('No orders found for this merchant');
        }
        const filteredOrders = orders.map((order) => {
            const filteredCartItems = order.cartItem.filter((item) => item.merchantId === merchantId);
            return {
                ...order.toObject(),
                cartItem: filteredCartItems,
            };
        });
        return filteredOrders;
    }
};
exports.MerchantService = MerchantService;
exports.MerchantService = MerchantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Merchant_schema_1.Merchant.name)),
    __param(1, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(Wallet_schema_1.Wallet.name)),
    __param(3, (0, mongoose_1.InjectModel)(Order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        wallet_service_1.WalletService,
        product_service_1.ProductService])
], MerchantService);
//# sourceMappingURL=merchant.service.js.map