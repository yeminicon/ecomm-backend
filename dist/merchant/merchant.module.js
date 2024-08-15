"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantModule = void 0;
const common_1 = require("@nestjs/common");
const merchant_service_1 = require("./merchant.service");
const merchant_controller_1 = require("./merchant.controller");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../schemas/User.schema");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
const Product_schema_1 = require("../schemas/Product.schema");
const product_service_1 = require("../product/product.service");
const users_service_1 = require("../users/users.service");
const Wallet_schema_1 = require("../schemas/Wallet.schema");
const wallet_service_1 = require("../wallet/wallet.service");
let MerchantModule = class MerchantModule {
};
exports.MerchantModule = MerchantModule;
exports.MerchantModule = MerchantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: User_schema_1.User.name,
                    schema: User_schema_1.UserSchema,
                },
                {
                    name: Merchant_schema_1.Merchant.name,
                    schema: Merchant_schema_1.MerchantSchema,
                },
                {
                    name: Product_schema_1.Product.name,
                    schema: Product_schema_1.ProductSchema,
                },
                {
                    name: Wallet_schema_1.Wallet.name,
                    schema: Wallet_schema_1.WalletSchema,
                },
            ]),
        ],
        controllers: [merchant_controller_1.MerchantController],
        providers: [merchant_service_1.MerchantService, product_service_1.ProductService, users_service_1.UsersService, wallet_service_1.WalletService],
    })
], MerchantModule);
//# sourceMappingURL=merchant.module.js.map