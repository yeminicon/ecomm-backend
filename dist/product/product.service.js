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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../schemas/User.schema");
const mongoose_2 = require("mongoose");
const Product_schema_1 = require("../schemas/Product.schema");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
let ProductService = class ProductService {
    constructor(userService, userModel, productModel, merchantModel) {
        this.userService = userService;
        this.userModel = userModel;
        this.productModel = productModel;
        this.merchantModel = merchantModel;
    }
    async createNewProduct(createProductDto, merchantId) {
        if (createProductDto.quantity === 0) {
            throw new common_1.BadRequestException(' Quantity cannot be empty');
        }
        const product = await this.productModel.create({
            createProductDto,
            merchantId,
        });
        return product;
    }
    async updateProductInfo(productId, updateProduct) {
        return this.productModel.findByIdAndUpdate(productId, updateProduct, {
            new: true,
        });
    }
    async deleteProduct(productId) {
        const removeProduct = await this.productModel.findByIdAndDelete(productId);
        if (!removeProduct) {
            throw new common_1.HttpException('Product not found', 404);
        }
        const message = 'Succefully deleted this product';
        return message;
    }
    async findAll(pageNumber, searchWord) {
        const resPerPage = 10;
        const currentPage = pageNumber > 0 ? pageNumber : 1;
        const skip = resPerPage * (currentPage - 1);
        const keyword = searchWord
            ? {
                name: {
                    $regex: searchWord,
                    $options: 'i',
                },
            }
            : {};
        const total = await this.productModel.countDocuments({ ...keyword });
        const products = await this.productModel
            .find({ ...keyword })
            .limit(resPerPage)
            .skip(skip);
        return { products, total };
    }
    async findAllByMerchant(merchantId) {
        return this.productModel.find({ merchant: merchantId }).exec();
    }
    async findOne(productId) {
        const isValidId = mongoose_2.default.isValidObjectId(productId);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id,');
        }
        const product = this.productModel.findOne({ _id: productId });
        if (!product) {
            throw new common_1.NotFoundException('product not found');
        }
        return product;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(Product_schema_1.Product.name)),
    __param(3, (0, mongoose_1.InjectModel)(Merchant_schema_1.Merchant.name)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map