/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { Wallet } from 'src/schemas/Wallet.schema';
import { Model } from 'mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/User.schema';

describe('WalletService', () => {
  let service: WalletService;
  let merchantModel: Model<Merchant>;
  let userService: UsersService;
  let userModel: Model<User>;
  let model: Model<Wallet>;

  const mockWallet = {
    WalletName: 'Techpower',
    acctNumber: 'IT',
    mechantId: 'ecommerce',
    email: 'techpower@123.com',
    Balance: 10000,
    phoneNumber: '+2348144616094',
  };

  const mockWalletService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue({
      exec: jest.fn(),
    }),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn(),
  };

  const mockUserService = {
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        email: 'akinyele.adeyemi9005@gmail.com',
        _id: '66a9c224e86fd41e26be3e1b',
      }),
    }),
    findById: jest.fn(),
  };
  const mockMerchantService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: getModelToken(Wallet.name),
          useValue: mockWalletService,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
        {
          provide: getModelToken(Merchant.name),
          useValue: mockMerchantService,
        },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
    model = module.get<Model<Wallet>>(getModelToken(Wallet.name));
    merchantModel = module.get<Model<Merchant>>(getModelToken(Merchant.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
