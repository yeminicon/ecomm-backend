/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/User.schema';
import { UserOTPVerification } from '../schemas/UserOTPVerification';
import { SignUpDto } from './dto/signup.dto';
import { MerchantService } from '../merchant/merchant.service';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mailer/mailer.service';
import { Merchant } from 'src/schemas/Merchant.schema';
import { CreateMerchantDto } from 'src/merchant/dto/create-merchant.dto';
import { WalletService } from 'src/wallet/wallet.service';
export declare class AuthService {
    private readonly userModel;
    private readonly userOtpVerificationModel;
    private merchantModel;
    private readonly merchantService;
    private readonly jwtService;
    private readonly configService;
    private readonly mailService;
    private readonly walletService;
    private logger;
    constructor(userModel: Model<User>, userOtpVerificationModel: Model<UserOTPVerification>, merchantModel: Model<Merchant>, merchantService: MerchantService, jwtService: JwtService, configService: ConfigService, mailService: MailService, walletService: WalletService);
    createUser(signUpDto: SignUpDto): Promise<User>;
    createMerchant(createMerchantDto?: CreateMerchantDto): Promise<Merchant>;
    private sendOtpVerification;
    verifyOTP(userId: string, otp: string): Promise<UserOTPVerification | string>;
    verifyMerchantOTP(merchantId: string, otp: string): Promise<UserOTPVerification | string>;
    regenerateOTP(userId: string): Promise<void>;
    validateUser(email: string, password: string): Promise<User | null>;
    generateAuthToken(user: User): Promise<string>;
    generateMerchantAuthToken(merchant: Merchant): Promise<string>;
    loginUser(): Promise<User>;
    verifyUser(user: any): Promise<{
        id: any;
        email: any;
    }>;
}
