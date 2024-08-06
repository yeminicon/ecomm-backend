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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../schemas/User.schema");
const mongoose_2 = require("mongoose");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
let UsersService = class UsersService {
    constructor(userModel, merchantModel) {
        this.userModel = userModel;
        this.merchantModel = merchantModel;
    }
    async create(createUserDto) {
        const findUserByEmail = await this.findByEmail(createUserDto.email);
        if (findUserByEmail) {
            throw new common_1.HttpException('User with this email already exists', 400);
        }
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
    findByEmail(email) {
        return this.userModel.findOne({ email: email }).exec();
    }
    findAll() {
        return this.userModel.find().populate(['merchant', 'gofer']);
    }
    findOne(id) {
        return this.userModel.findById(id).populate(['merchant', 'gofer']);
    }
    update(id, updateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }
    deleteUser(id) {
        return this.userModel.findByIdAndDelete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(Merchant_schema_1.Merchant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map