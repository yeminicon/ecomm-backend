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
import { User } from '../schemas/user.schema';
import { UserOTPVerification } from '../schemas/UserOTPVerification';
import { SignUpDto } from './dto/signup.dto';
import { MerchantService } from '../merchant/merchant.service';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userModel;
    private readonly userOtpVerificationModel;
    private readonly merchantService;
    private readonly jwtService;
    private readonly mailerService;
    private readonly configService;
    private logger;
    constructor(userModel: Model<User>, userOtpVerificationModel: Model<UserOTPVerification>, merchantService: MerchantService, jwtService: JwtService, mailerService: MailerService, configService: ConfigService);
    createUser(signUpDto: SignUpDto): Promise<User>;
    private sendOtpVerification;
    verifyOTP(userId: string, otp: string): Promise<UserOTPVerification | string>;
    regenerateOTP(userId: string): Promise<void>;
    validateUser(email: string, password: string): Promise<User | null>;
    generateAuthToken(user: User): Promise<string>;
    loginUser(loginDto: LoginDto): Promise<User>;
    verifyUser(user: any): Promise<{
        id: any;
        email: any;
    }>;
}
