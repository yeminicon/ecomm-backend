"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../schemas/User.schema");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
const merchant_service_1 = require("../merchant/merchant.service");
const users_service_1 = require("../users/users.service");
const Order_schema_1 = require("../schemas/Order.schema");
const order_service_1 = require("../order/order.service");
const Product_schema_1 = require("../schemas/Product.schema");
const Wallet_schema_1 = require("../schemas/Wallet.schema");
const wallet_service_1 = require("../wallet/wallet.service");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: Wallet_schema_1.Wallet.name,
                    schema: Wallet_schema_1.WalletSchema,
                },
                {
                    name: User_schema_1.User.name,
                    schema: User_schema_1.UserSchema,
                },
                {
                    name: Merchant_schema_1.Merchant.name,
                    schema: Merchant_schema_1.MerchantSchema,
                },
                {
                    name: Order_schema_1.Order.name,
                    schema: Order_schema_1.OrderSchema,
                },
                {
                    name: Product_schema_1.Product.name,
                    schema: Product_schema_1.ProductSchema,
                },
            ]),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [
            product_service_1.ProductService,
            merchant_service_1.MerchantService,
            users_service_1.UsersService,
            order_service_1.OrderService,
            wallet_service_1.WalletService,
        ],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map