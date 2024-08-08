/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MerchantService } from './merchant.service';
import { Model } from 'mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/User.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('MerchantService', () => {
  let service: MerchantService;
  let userService: UsersService;
  let model: Model<Merchant>;
  let userModel: Model<User>;

  const mockMerchantService = {};
  const mockUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchantService,
        UsersService,
        {
          provide: getModelToken(Merchant.name),
          useValue: mockMerchantService,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<MerchantService>(MerchantService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
