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
const user_schema_1 = require("../schemas/user.schema");
const UserOTPVerification_1 = require("../schemas/UserOTPVerification");
const merchant_service_1 = require("../merchant/merchant.service");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
let AuthService = AuthService_1 = class AuthService {
    constructor(userModel, userOtpVerificationModel, merchantService, jwtService, mailerService, configService) {
        this.userModel = userModel;
        this.userOtpVerificationModel = userOtpVerificationModel;
        this.merchantService = merchantService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.configService = configService;
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
    async sendOtpVerification(email, userId) {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        console.log(otp);
        if (otp) {
            const serverAppUrl = this.configService.get('SERVER_APP_URL');
            const verifyUrl = `${serverAppUrl}/email_verification/${email}`;
            console.log(verifyUrl);
        }
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your Email',
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup process</p>
             <p>This code <b>expires in 1 hour</b>.</p>`,
        };
        const text = `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup process</p>
             <p>This code <b>expires in 1 hour</b>.</p>`;
        const hashedOTP = await bcrypt.hash(otp, 10);
        const newOTPVerification = new this.userOtpVerificationModel({
            userId,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        await newOTPVerification.save();
        const result = await this.mailerService.sendMail({
            to: email,
            subject: 'Verify Email Address',
            text: text,
        });
        this.logger.log('Email verification result', result);
        const message = 'Sent Succeffully';
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
    async regenerateOTP(userId) {
        const findUser = await this.userModel.findOne({ userId });
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        console.log(otp);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: findUser.email,
            subject: 'reverify your Email',
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup process</p>
             <p>This code <b>expires in 1 hour</b>.</p>`,
        };
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
    async loginUser(loginDto) {
        const { email, password } = loginDto;
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
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(UserOTPVerification_1.UserOTPVerification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        merchant_service_1.MerchantService,
        jwt_1.JwtService,
        mailer_1.MailerService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map