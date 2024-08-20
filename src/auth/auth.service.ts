import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
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

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(UserOTPVerification.name)
    private readonly userOtpVerificationModel: Model<UserOTPVerification>,
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    private readonly merchantService: MerchantService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly walletService: WalletService,
  ) {}

  async createUser(signUpDto: SignUpDto): Promise<User> {
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

  async createMerchant(
    // userId: string,
    createMerchantDto?: CreateMerchantDto,
  ): Promise<Merchant> {
    console.log(createMerchantDto);
    const findMerchant = await this.merchantModel.findOne({
      merchantName: createMerchantDto.merchantName,
    });

    if (findMerchant) {
      throw new BadRequestException(
        'Choose another name A merchant with tha name exist',
      );
    }

    const hashedPassword = await bcrypt.hash(createMerchantDto.password, 10);
    const createdMerchant = new this.merchantModel({
      // user: userId,
      merchantName: createMerchantDto.merchantName,
      businessType: createMerchantDto.businessType,
      phoneNumber: createMerchantDto.phoneNumber,
      businessEmail: createMerchantDto.businessEmail,
      businessCategory: createMerchantDto.businessCategory,
      password: hashedPassword,
    });
    const result = await createdMerchant.save();
    console.log(result);
    const _id = result._id.toString(); // Convert ObjectId to string
    await this.walletService.create(_id);

    await this.sendOtpVerification(result.businessEmail, _id);

    return result;
  }

  private async sendOtpVerification(
    email: string,
    userId: string,
  ): Promise<void> {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log(otp);

    const serverAppUrl = this.configService.get<string>('SERVER_APP_URL');
    const verifyUrl = `${serverAppUrl}/emailVerification/${email}`;
    const hashedOTP = await bcrypt.hash(otp, 10);

    const newOTPVerification = new this.userOtpVerificationModel({
      userId,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newOTPVerification.save();
    const result = await this.mailService.sendEmail(
      email,
      userId,
      verifyUrl,
      otp,
    );

    this.logger.log('Email verification result', result);
    return;
  }

  async verifyOTP(
    userId: string,
    otp: string,
  ): Promise<UserOTPVerification | string> {
    const userOtpRecord = await this.userOtpVerificationModel.findOne({
      userId,
    });

    if (!userOtpRecord) {
      this.regenerateOTP(userId);
      throw new BadRequestException('No OTP record found for this user.');
    }

    if (userOtpRecord.expiresAt <= new Date()) {
      this.regenerateOTP(userId);
      throw new BadRequestException('OTP has expired.');
    }

    const isMatch = await bcrypt.compare(otp, userOtpRecord.otp);
    if (!isMatch) {
      this.regenerateOTP(userId);
      throw new BadRequestException('Incorrect OTP.');
    }

    if (isMatch) {
      await this.userModel.updateOne({ _id: userId }, { verified: true });
    }

    return userOtpRecord;
  }

  async verifyMerchantOTP(
    merchantId: string,
    otp: string,
  ): Promise<UserOTPVerification | string> {
    const userOtpRecord = await this.userOtpVerificationModel.findOne({
      merchantId,
    });

    if (!userOtpRecord) {
      this.regenerateOTP(merchantId);
      throw new BadRequestException('No OTP record found for this user.');
    }

    if (userOtpRecord.expiresAt <= new Date()) {
      this.regenerateOTP(merchantId);
      throw new BadRequestException('OTP has expired.');
    }

    const isMatch = await bcrypt.compare(otp, userOtpRecord.otp);
    if (!isMatch) {
      this.regenerateOTP(merchantId);
      throw new BadRequestException('Incorrect OTP.');
    }

    if (isMatch) {
      await this.merchantModel.updateOne(
        { _id: merchantId },
        { verified: true },
      );
    }

    return userOtpRecord;
  }

  async regenerateOTP(userId: string) {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log(otp);

    const hashedOTP = await bcrypt.hash(otp, 10);

    const newOTPVerification = new this.userOtpVerificationModel({
      userId,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newOTPVerification.save();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async generateAuthToken(user: User): Promise<string> {
    return this.jwtService.sign(
      { id: user._id },
      // {
      //   secret: this.configService.get('Secret'),
      //   expiresIn: '10days',
      // }
    );
  }

  async generateMerchantAuthToken(merchant: Merchant): Promise<string> {
    return this.jwtService.sign(
      { id: merchant.merchantName },
      // {
      //   secret: this.configService.get('Secret'),
      //   expiresIn: '10days',
      // }
    );
  }

  async loginUser(): Promise<User> {
    return;
  }

  async verifyUser(user: any) {
    const { id, email } = user;

    const data = {
      id: id,
      email: email,
    };

    return data;
  }
}
