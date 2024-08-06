import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOTPDto } from './dto/otp.dto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
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
    verifyUserOTP(verifyUpDto: VerifyOTPDto): Promise<string | import("../schemas/UserOTPVerification").UserOTPVerification>;
}
