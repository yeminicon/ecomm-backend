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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signup_dto_1 = require("./dto/signup.dto");
const login_dto_1 = require("./dto/login.dto");
const otp_dto_1 = require("./dto/otp.dto");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
const merchant_service_1 = require("../merchant/merchant.service");
let AuthController = class AuthController {
    constructor(authService, userService, merchantService) {
        this.authService = authService;
        this.userService = userService;
        this.merchantService = merchantService;
    }
    async signUp(signUpDto) {
        const user = await this.authService.createUser(signUpDto);
        return {
            message: 'User successfully registered, check your email for confirmation',
            user,
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.authService.validateUser(email, password);
        if (!user.verified) {
            throw new common_1.HttpException('Kindly verify your account', 401);
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = await this.authService.generateAuthToken(user);
        return {
            token,
            userId: user._id,
            user: user.name,
            message: 'Login successful',
        };
    }
    async adminLogin(adminLoginDto) {
        const { email, password } = adminLoginDto;
        const user = await this.authService.validateUser(email, password);
        if (!user.verified) {
            throw new common_1.HttpException('Kindly verify your account', 401);
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = await this.authService.generateAuthToken(user);
        return {
            token,
            userId: user._id,
            user: user.name,
            message: 'Login successful',
        };
    }
    async merchantLogin(loginDto) {
        const { email, password } = loginDto;
        const businessEmail = email;
        const merchant = await this.merchantService.validateMerchant(businessEmail, password);
        if (!merchant.verified) {
            throw new common_1.HttpException('Kindly verify your account', 401);
        }
        if (!merchant) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = await this.authService.generateMerchantAuthToken(merchant);
        const { merchantName } = merchant;
        console.log(merchantName);
        console.log(token);
        return {
            token,
            userId: merchant._id,
            user: merchant,
            message: 'Login successful',
        };
    }
    async verifyMerchantUserOTP(verifyUpDto) {
        const { email, otp } = verifyUpDto;
        const findMerchant = await this.merchantService.findByEmail(email);
        console.log(findMerchant);
        return this.authService.verifyMerchantOTP(findMerchant.id, otp);
    }
    async verifyUserOTP(verifyUpDto) {
        const { email, otp } = verifyUpDto;
        const findUser = await this.userService.findByEmail(email);
        return this.authService.verifyOTP(findUser.id, otp);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ description: 'User successfully registered.' }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid input or user already exists.',
    }),
    (0, common_1.Post)('/signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'User successfully logged in.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid email or password.' }),
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'User successfully logged in.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid email or password.' }),
    (0, common_1.Post)('/adminlogin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ description: 'User successfully logged in.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid email or password.' }),
    (0, common_1.Post)('/merchantlogin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "merchantLogin", null);
__decorate([
    (0, common_1.Post)('/verifyMerchantOTP'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.VerifyOTPDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyMerchantUserOTP", null);
__decorate([
    (0, common_1.Post)('/verifyOTP'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.VerifyOTPDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyUserOTP", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        merchant_service_1.MerchantService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map