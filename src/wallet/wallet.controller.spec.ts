/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MerchantService } from 'src/merchant/merchant.service';

describe('WalletController', () => {
  let controller: WalletController;
  let service: WalletService;
  let merchantService: MerchantService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: mockWalletService,
        },
        {
          provide: MerchantService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    service = module.get<WalletService>(WalletService);
    merchantService = module.get<MerchantService>(MerchantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
