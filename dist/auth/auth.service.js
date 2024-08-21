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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const User_schema_1 = require("../schemas/User.schema");
const UserOTPVerification_1 = require("../schemas/UserOTPVerification");
const merchant_service_1 = require("../merchant/merchant.service");
const config_1 = require("@nestjs/config");
const mailer_service_1 = require("../mailer/mailer.service");
const Merchant_schema_1 = require("../schemas/Merchant.schema");
const wallet_service_1 = require("../wallet/wallet.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(userModel, userOtpVerificationModel, merchantModel, merchantService, jwtService, configService, mailService, walletService) {
        this.userModel = userModel;
        this.userOtpVerificationModel = userOtpVerificationModel;
        this.merchantModel = merchantModel;
        this.merchantService = merchantService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailService = mailService;
        this.walletService = walletService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async createUser(signUpDto) {
        const { name, email, password, isAdmin } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            name,
            email,
            password: hashedPassword,
            isAdmin,
        });
        await user.save();
        if (isAdmin === true) {
            const savedMerchant = await this.merchantService.create(user.id);
            await user.updateOne({
                $push: {
                    merchant: savedMerchant.merchantName,
                },
            });
        }
        await this.sendOtpVerification(email, user.id);
        return user;
    }
    async createMerchant(createMerchantDto) {
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
        const _id = result._id.toString();
        await this.walletService.create(_id);
        await this.sendMerchantOtpVerification(result.businessEmail, _id);
        return result;
    }
    async sendOtpVerification(email, userId) {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const serverAppUrl = this.configService.get('SERVER_APP_URL');
        const verifyUrl = `${serverAppUrl}/emailVerification/${email}`;
        const hashedOTP = await bcrypt.hash(otp, 10);
        const newOTPVerification = new this.userOtpVerificationModel({
            userId,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        await newOTPVerification.save();
        const result = await this.mailService.sendEmail(email, userId, verifyUrl, otp);
        this.logger.log('Email verification result', result);
        return;
    }
    async sendMerchantOtpVerification(email, userId) {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const serverAppUrl = this.configService.get('SERVER_APP_URL');
        const verifyUrl = `${serverAppUrl}/emailMerchantVerification/${email}`;
        const hashedOTP = await bcrypt.hash(otp, 10);
        const newOTPVerification = new this.userOtpVerificationModel({
            userId,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        await newOTPVerification.save();
        const result = await this.mailService.sendEmail(email, userId, verifyUrl, otp);
        this.logger.log('Email verification result', result);
        return;
    }
    async verifyOTP(userId, otp) {
        const userOtpRecord = await this.userOtpVerificationModel.findOne({
            userId,
        });
        if (!userOtpRecord) {
            this.regenerateOTP(userId);
            throw new common_1.BadRequestException('No OTP record found for this user.');
        }
        if (userOtpRecord.expiresAt <= new Date()) {
            this.regenerateOTP(userId);
            throw new common_1.BadRequestException('OTP has expired.');
        }
        const isMatch = await bcrypt.compare(otp, userOtpRecord.otp);
        if (!isMatch) {
            this.regenerateOTP(userId);
            throw new common_1.BadRequestException('Incorrect OTP.');
        }
        if (isMatch) {
            await this.userModel.updateOne({ _id: userId }, { verified: true });
        }
        return userOtpRecord;
    }
    async verifyMerchantOTP(merchantId, otp) {
        const userOtpRecord = await this.userOtpVerificationModel.findOne({
            userId: merchantId,
        });
        if (!userOtpRecord) {
            this.regenerateOTP(merchantId);
            throw new common_1.BadRequestException('No OTP record found for this user.');
        }
        if (userOtpRecord.expiresAt <= new Date()) {
            this.regenerateOTP(merchantId);
            throw new common_1.BadRequestException('OTP has expired.');
        }
        const isMatch = await bcrypt.compare(otp, userOtpRecord.otp);
        if (!isMatch) {
            this.regenerateOTP(merchantId);
            throw new common_1.BadRequestException('Incorrect OTP.');
        }
        if (isMatch) {
            await this.merchantModel.updateOne({ _id: merchantId }, { verified: true });
        }
        return userOtpRecord;
    }
    async regenerateOTP(userId) {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const hashedOTP = await bcrypt.hash(otp, 10);
        const newOTPVerification = new this.userOtpVerificationModel({
            userId,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        await newOTPVerification.save();
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
    async generateAuthToken(user) {
        return this.jwtService.sign({ id: user._id });
    }
    async generateMerchantAuthToken(merchant) {
        return this.jwtService.sign({ id: merchant.merchantName });
    }
    async loginUser() {
        return;
    }
    async verifyUser(user) {
        const { id, email } = user;
        const data = {
            id: id,
            email: email,
        };
        return data;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(UserOTPVerification_1.UserOTPVerification.name)),
    __param(2, (0, mongoose_1.InjectModel)(Merchant_schema_1.Merchant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        merchant_service_1.MerchantService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mailer_service_1.MailService,
        wallet_service_1.WalletService])
], AuthService);
//# sourceMappingURL=auth.service.js.map