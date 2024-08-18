"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../schemas/User.schema");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
const Order_schema_1 = require("../schemas/Order.schema");
const order_service_1 = require("../order/order.service");
const merchant_service_1 = require("../merchant/merchant.service");
const analytics_service_1 = require("../analytics/analytics.service");
const auth_service_1 = require("../auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
const Product_schema_1 = require("../schemas/Product.schema");
const UserOTPVerification_1 = require("../schemas/UserOTPVerification");
const mailer_service_1 = require("../mailer/mailer.service");
const wallet_service_1 = require("../wallet/wallet.service");
const Wallet_schema_1 = require("../schemas/Wallet.schema");
const product_service_1 = require("../product/product.service");
const merchant_module_1 = require("../merchant/merchant.module");
const wallet_module_1 = require("../wallet/wallet.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
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
                    name: Order_schema_1.Order.name,
                    schema: Order_schema_1.OrderSchema,
                },
                {
                    name: Product_schema_1.Product.name,
                    schema: Product_schema_1.ProductSchema,
                },
                {
                    name: UserOTPVerification_1.UserOTPVerification.name,
                    schema: UserOTPVerification_1.UserOTPVerificationSchema,
                },
                {
                    name: Wallet_schema_1.Wallet.name,
                    schema: Wallet_schema_1.WalletSchema,
                },
            ]),
            merchant_module_1.MerchantModule,
            wallet_module_1.WalletModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            order_service_1.OrderService,
            merchant_service_1.MerchantService,
            analytics_service_1.AnalyticsService,
            auth_service_1.AuthService,
            jwt_1.JwtService,
            mailer_service_1.MailService,
            wallet_service_1.WalletService,
            product_service_1.ProductService,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map