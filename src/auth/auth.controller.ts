import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOTPDto } from './dto/otp.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { MerchantService } from 'src/merchant/merchant.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
    private readonly merchantService: MerchantService,
  ) {}

  @ApiCreatedResponse({ description: 'User successfully registered.' })
  @ApiBadRequestResponse({
    description: 'Invalid input or user already exists.',
  })
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.createUser(signUpDto);
    return {
      message:
        'User successfully registered, check your email for confirmation',
      user,
    };
  }

  @ApiOkResponse({ description: 'User successfully logged in.' })
  @ApiBadRequestResponse({ description: 'Invalid email or password.' })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);

    if (!user.verified) {
      throw new HttpException('Kindly verify your account', 401);
    }
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = await this.authService.generateAuthToken(user);
    return {
      token,
      userId: user._id,
      user: user.name,
      message: 'Login successful',
    };
  }

  @ApiOkResponse({ description: 'User successfully logged in.' })
  @ApiBadRequestResponse({ description: 'Invalid email or password.' })
  @Post('/adminlogin')
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() adminLoginDto: any) {
    const { email, password } = adminLoginDto;
    const user = await this.authService.validateUser(email, password);

    if (!user.verified) {
      throw new HttpException('Kindly verify your account', 401);
    }
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = await this.authService.generateAuthToken(user);
    return {
      token,
      userId: user._id,
      user: user.name,
      message: 'Login successful',
    };
  }

  @ApiOkResponse({ description: 'User successfully logged in.' })
  @ApiBadRequestResponse({ description: 'Invalid email or password.' })
  @Post('/merchantlogin')
  @HttpCode(HttpStatus.OK)
  async merchantLogin(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const businessEmail = email;
    const merchant = await this.merchantService.validateMerchant(
      businessEmail,
      password,
    );

    if (!merchant.verified) {
      throw new HttpException('Kindly verify your account', 401);
    }
    if (!merchant) {
      throw new UnauthorizedException('Invalid email or password');
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

  @Post('/verifyMerchantOTP')
  async verifyMerchantUserOTP(@Body() verifyUpDto: VerifyOTPDto) {
    const { email, otp } = verifyUpDto;
    const findMerchant = await this.merchantService.findByEmail(email);
    return this.authService.verifyMerchantOTP(findMerchant.id, otp);
  }

  @Post('/verifyOTP')
  async verifyUserOTP(@Body() verifyUpDto: VerifyOTPDto) {
    const { email, otp } = verifyUpDto;
    const findUser = await this.userService.findByEmail(email);
    return this.authService.verifyOTP(findUser.id, otp);
  }
}
