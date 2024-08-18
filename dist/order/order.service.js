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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const merchant_service_1 = require("../merchant/merchant.service");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
const User_schema_1 = require("../schemas/User.schema");
const Order_schema_1 = require("../schemas/Order.schema");
const Product_schema_1 = require("../schemas/Product.schema");
const wallet_service_1 = require("../wallet/wallet.service");
let OrderService = class OrderService {
    constructor(usersService, merchantService, walletService, merchantModel, userModel, productModel, orderModel) {
        this.usersService = usersService;
        this.merchantService = merchantService;
        this.walletService = walletService;
        this.merchantModel = merchantModel;
        this.userModel = userModel;
        this.productModel = productModel;
        this.orderModel = orderModel;
    }
    async createOrder({ ...createOrderDto }) {
        const email = createOrderDto.email;
        const findUser = await this.usersService.findByEmail(email);
        if (!findUser) {
            throw new common_1.HttpException('Merchant not found', 404);
        }
        const newOrder = new this.orderModel({
            user: findUser._id,
            ...createOrderDto,
        });
        await newOrder.save();
        const { _id, shippingAddress, shippingCity, shippingState, shippingCountry, shippingZipCode, name, email: orderEmail, phoneNumber, cartItem, paymentMethod, orderStatus, orderQuantity, orderSum, merchant, createdAt, updatedAt, } = newOrder.toObject();
        return {
            _id,
            shippingAddress,
            shippingCity,
            shippingState,
            shippingCountry,
            shippingZipCode,
            name,
            email: orderEmail,
            phoneNumber,
            cartItem,
            paymentMethod,
            orderStatus,
            orderQuantity,
            orderSum,
            merchant,
            createdAt,
            updatedAt,
        };
    }
    async findAllByMerchant(merchantId) {
        const findMerchant = await this.merchantService.findById(merchantId);
        if (!findMerchant) {
            throw new common_1.HttpException('Merchant not found', 404);
        }
        return this.orderModel.find({ merchantId }).exec();
    }
    async findAllByUser(userId) {
        const findUser = await this.userModel.findById(userId);
        if (!findUser) {
            throw new common_1.HttpException('User not found', 404);
        }
        if (findUser) {
        }
        const orders = await this.orderModel.find({ user: findUser._id }).exec();
        if (!orders.length) {
            return {
                message: 'No transaction found',
                orders: [],
            };
        }
        return orders.map((order) => {
            const { _id, shippingAddress, shippingCity, shippingState, shippingCountry, shippingZipCode, name, email: orderEmail, phoneNumber, cartItem, paymentMethod, orderStatus, orderQuantity, orderSum, merchant, createdAt, updatedAt, } = order;
            return {
                _id,
                shippingAddress,
                shippingCity,
                shippingState,
                shippingCountry,
                shippingZipCode,
                name,
                email: orderEmail,
                phoneNumber,
                cartItem,
                paymentMethod,
                orderStatus,
                orderQuantity,
                orderSum,
                merchant,
                createdAt,
                updatedAt,
            };
        });
    }
    async findOne(id) {
        const order = await this.orderModel.findOne({ _id: id }).exec();
        if (!order) {
            throw new common_1.HttpException('Order not found', 404);
        }
        const { _id, shippingAddress, shippingCity, shippingState, shippingCountry, shippingZipCode, name, email: orderEmail, phoneNumber, cartItem, paymentMethod, orderStatus, orderQuantity, orderSum, merchant, createdAt, updatedAt, } = order.toObject();
        return {
            _id,
            shippingAddress,
            shippingCity,
            shippingState,
            shippingCountry,
            shippingZipCode,
            name,
            email: orderEmail,
            phoneNumber,
            cartItem,
            paymentMethod,
            orderStatus,
            orderQuantity,
            orderSum,
            merchant,
            createdAt,
            updatedAt,
        };
    }
    async update(id, updateOrderDto) {
        console.log(updateOrderDto);
        console.log(id);
        const updatedOrder = await this.orderModel.findByIdAndUpdate({ _id: id }, updateOrderDto, { new: true });
        if (!updatedOrder) {
            throw new common_1.HttpException('Order not found', 404);
        }
        return updatedOrder;
    }
    async updateWalletBasedOnMerchant(orderId, orderStatus) {
        if (orderStatus === Order_schema_1.PaymentStatus.PENDING) {
            throw new common_1.HttpException('Payment not confirm yet', 404);
        }
        else if (orderStatus === Order_schema_1.PaymentStatus.FAILED) {
            throw new common_1.HttpException('Payment failed yet', 404);
        }
        const findOrder = await this.orderModel.findById(orderId);
        if (!findOrder) {
            throw new common_1.HttpException('Order not found', 404);
        }
        for (const item of findOrder.cartItem) {
            const productId = item.id;
            const quantity = item.quantity;
            const findProduct = await this.productModel
                .findById(productId)
                .populate('merchant');
            if (!findProduct) {
                throw new common_1.HttpException(`Product with ID ${productId} not found`, 404);
            }
            const price = findProduct.price;
            const totalAmount = price * quantity;
            const deveolopmemtFee = totalAmount * 0.075;
            const calculatedAmount = totalAmount - deveolopmemtFee;
            const merchantId = findProduct.merchantId;
            await this.walletService.addFund(merchantId, calculatedAmount);
        }
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.HttpException('Order not found', 404);
        }
        const removedOrder = await this.orderModel.findByIdAndDelete(id).exec();
        if (!removedOrder) {
            throw new common_1.HttpException('Order not found', 404);
        }
        const message = 'Succefully deleted this order';
        return message;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(Merchant_schema_1.Merchant.name)),
    __param(4, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __param(5, (0, mongoose_1.InjectModel)(Product_schema_1.Product.name)),
    __param(6, (0, mongoose_1.InjectModel)(Order_schema_1.Order.name)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        merchant_service_1.MerchantService,
        wallet_service_1.WalletService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map