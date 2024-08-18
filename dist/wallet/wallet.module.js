"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const Wallet_schema_1 = require("../schemas/Wallet.schema");
const wallet_service_1 = require("./wallet.service");
const wallet_controller_1 = require("./wallet.controller");
const mongoose_1 = require("@nestjs/mongoose");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
const merchant_service_1 = require("../merchant/merchant.service");
const User_schema_1 = require("../schemas/User.schema");
const users_service_1 = require("../users/users.service");
const product_service_1 = require("../product/product.service");
const Product_schema_1 = require("../schemas/Product.schema");
let WalletModule = class WalletModule {
};
exports.WalletModule = WalletModule;
exports.WalletModule = WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: Merchant_schema_1.Merchant.name,
                    schema: Merchant_schema_1.MerchantSchema,
                },
                {
                    name: User_schema_1.User.name,
                    schema: User_schema_1.UserSchema,
                },
                {
                    name: Wallet_schema_1.Wallet.name,
                    schema: Wallet_schema_1.WalletSchema,
                },
                {
                    name: Product_schema_1.Product.name,
                    schema: Product_schema_1.ProductSchema,
                },
            ]),
        ],
        controllers: [wallet_controller_1.WalletController],
        providers: [wallet_service_1.WalletService, merchant_service_1.MerchantService, users_service_1.UsersService, product_service_1.ProductService],
    })
], WalletModule);
//# sourceMappingURL=wallet.module.js.map