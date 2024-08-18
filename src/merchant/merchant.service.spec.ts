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
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/schemas/Product.schema';

describe('MerchantService', () => {
  let service: MerchantService;
  let userService: UsersService;
  let model: Model<Merchant>;
  let userModel: Model<User>;
  let walletService: WalletService;
  let walletModel: Model<Wallet>;
  let productService: ProductService;

  const mockMerchantService = {};
  const mockUserService = {};
  const mockWalletService = {};
  const mockProductService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchantService,
        UsersService,
        WalletService,
        ProductService,
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
        {
          provide: getModelToken(Product.name),
          useValue: mockProductService,
        },
      ],
    }).compile();

    service = module.get<MerchantService>(MerchantService);
    userService = module.get<UsersService>(UsersService);
    walletModel = module.get<Model<Wallet>>(getModelToken(Wallet.name));
    walletService = module.get<WalletService>(WalletService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
