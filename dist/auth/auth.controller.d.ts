import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOTPDto } from './dto/otp.dto';
import { UsersService } from '../users/users.service';
import { MerchantService } from 'src/merchant/merchant.service';
export declare class AuthController {
    private authService;
    private readonly userService;
    private readonly merchantService;
    constructor(authService: AuthService, userService: UsersService, merchantService: MerchantService);
    signUp(signUpDto: SignUpDto): Promise<{
        message: string;
        user: import("../schemas/User.schema").User;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        userId: unknown;
        user: string;
        message: string;
    }>;
    adminLogin(adminLoginDto: any): Promise<{
        token: string;
        userId: unknown;
        user: string;
        message: string;
    }>;
    merchantLogin(loginDto: LoginDto): Promise<{
        token: string;
        userId: unknown;
        email: string;
        name: string;
        message: string;
    }>;
    verifyMerchantUserOTP(verifyUpDto: VerifyOTPDto): Promise<string | import("../schemas/UserOTPVerification").UserOTPVerification>;
    verifyUserOTP(verifyUpDto: VerifyOTPDto): Promise<string | import("../schemas/UserOTPVerification").UserOTPVerification>;
}
