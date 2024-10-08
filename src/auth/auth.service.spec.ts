/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { UserOTPVerification } from 'src/schemas/UserOTPVerification';
import { Merchant } from 'src/schemas/Merchant.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from 'src/mailer/mailer.service';
import { Wallet } from 'src/schemas/Wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/schemas/Product.schema';
import { UsersService } from 'src/users/users.service';
import { Order } from 'src/schemas/Order.schema';

describe('AuthService', () => {
  let service: AuthService;
  let merchantService: MerchantService;
  let mailerService: MailerService;
  let configService: ConfigService;
  let model: Model<User>;
  let otpModel: Model<UserOTPVerification>;
  let walletModel: Model<Wallet>;
  let merchantModel: Model<Merchant>;
  let jwtService: JwtService;
  let mailService: MailService;
  let walletService: WalletService;
  let productService: ProductService;

  const mockUser = {
    _id: '66a9c224e86fd41e26be3e1b',
    name: 'Ainyele Adeyemi',
    email: 'akinyele.adeyemi9005@gmail.com',
    password: '$2a$10$R1qyFZn3g9taYTJeoByWF.VR54yw9Awa8H/dh5k5zVuQ9YAFdM84a',
    verified: true,
    merchant: [],
    isAdmin: true,
  };

  const mockAuthService = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUserService = {};
  const mockMerchantService = {};
  const mockMailerService = {};
  const mockWalletService = {};
  const mockProductService = {};
  const mockOrderService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        MerchantService,
        ConfigService,
        MailService,
        WalletService,
        ProductService,
        UsersService,
        {
          provide: MailerService,
          useValue: mockMailerService, // Mocking the MailerService
        },
        {
          provide: 'MAILER_OPTIONS',
          useValue: {}, // Providing mock options for MailerService
        },
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService,
        },
        {
          provide: getModelToken(UserOTPVerification.name),
          useValue: mockUserService,
        },
        {
          provide: getModelToken(Merchant.name),
          useValue: mockMerchantService,
        },
        {
          provide: getModelToken(Wallet.name),
          useValue: mockWalletService,
        },
        {
          provide: getModelToken(Product.name),
          useValue: mockProductService,
        },
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    merchantService = module.get<MerchantService>(MerchantService);
    mailerService = module.get<MailerService>(MailerService);
    model = module.get<Model<User>>(getModelToken(User.name));
    otpModel = module.get<Model<UserOTPVerification>>(
      getModelToken(UserOTPVerification.name),
    );
    walletModel = module.get<Model<Wallet>>(getModelToken(Wallet.name));
    jwtService = module.get<JwtService>(JwtService);
    walletService = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
