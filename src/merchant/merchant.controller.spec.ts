/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { getModelToken } from '@nestjs/mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';
import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

describe('MerchantController', () => {
  let merchantController: MerchantController;
  let merchantService: MerchantService;
  let authService: AuthService;

  const mockMerchantService = {
    update: jest.fn(),
  };

  const mockAuthService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantController],
      providers: [
        {
          provide: MerchantService,
          useValue: mockMerchantService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        { provide: getModelToken(Merchant.name), useValue: mongoose.Model },
      ],
    }).compile();

    merchantController = module.get<MerchantController>(MerchantController);
    merchantService = module.get<MerchantService>(MerchantService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(merchantController).toBeDefined();
  });

  // Add more tests here as you implement methods in the controller
});
