/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MerchantService } from './merchant.service';
import { Model } from 'mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/User.schema';
import { getModelToken } from '@nestjs/mongoose';
import { WalletService } from 'src/wallet/wallet.service';
import { Wallet } from 'src/schemas/Wallet.schema';

describe('MerchantService', () => {
  let service: MerchantService;
  let userService: UsersService;
  let model: Model<Merchant>;
  let userModel: Model<User>;
  let walletService: WalletService;
  let walletModel: Model<Wallet>;

  const mockMerchantService = {};
  const mockUserService = {};
  const mockWalletService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchantService,
        UsersService,
        WalletService,
        {
          provide: getModelToken(Merchant.name),
          useValue: mockMerchantService,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
        {
          provide: getModelToken(Wallet.name),
          useValue: mockWalletService,
        },
      ],
    }).compile();

    service = module.get<MerchantService>(MerchantService);
    userService = module.get<UsersService>(UsersService);
    walletModel = module.get<Model<Wallet>>(getModelToken(Wallet.name));
    walletService = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
