import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { User } from '../schemas/user.schema';
import { UserOTPVerification } from '../schemas/UserOTPVerification';
import { SignUpDto } from './dto/signup.dto';
import { MerchantService } from '../merchant/merchant.service';

import { MailerService } from '@nestjs-modules/mailer';

import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(UserOTPVerification.name)
    private readonly userOtpVerificationModel: Model<UserOTPVerification>,
    private readonly merchantService: MerchantService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
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

  private async sendOtpVerification(
    email: string,
    userId: string,
  ): Promise<void> {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log(otp);
    if (otp) {
      const serverAppUrl = this.configService.get<string>('SERVER_APP_URL');
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
    //await this.mailerService.sendMail(email, 'Verify your Email', text);

    const result = await this.mailerService.sendMail({
      to: email,
      subject: 'Verify Email Address',
      text: text,
      // template: 'verify_email',
      // context: {
      //   hashedOTP,
      //   email,
      // },
    });

    this.logger.log('Email verification result', result);
    const message = 'Sent Succeffully';
    return;

    // await this.mailerService.sendMail(
    //   email,
    //   'Verify your Email',
    //   mailOptions.html,
    // );
  }

  async verifyOTP(
    userId: string,
    otp: string,
  ): Promise<UserOTPVerification | string> {
    // const { userId, unVerifiedOtp } = verifyUpDto;
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

  async regenerateOTP(userId: string) {
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
    // await this.mailerService.sendMail(
    //   findUser.email,
    //   'Verify your Email',
    //   mailOptions.html,
    // );
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

  async loginUser(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

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
