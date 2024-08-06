"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const users_service_1 = require("../users/users.service");
const merchant_service_1 = require("../merchant/merchant.service");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../schemas/User.schema");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
const Order_schema_1 = require("../schemas/Order.schema");
const Product_schema_1 = require("../schemas/Product.schema");
const product_service_1 = require("../product/product.service");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
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
                    schema: Order_schema_1.OrderSchema,
                },
            ]),
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, users_service_1.UsersService, merchant_service_1.MerchantService, product_service_1.ProductService],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map