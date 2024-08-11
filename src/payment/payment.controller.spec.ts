import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('PaymentController', () => {
  let controller: PaymentController;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        PaymentService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mock-paystack-secret-key'),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    paymentService = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('initializePayment', () => {
    it('should call PaymentService.initializePayment and return its result', async () => {
      const mockPayment = {
        status: true,
        data: { reference: 'mock-reference' },
      };
      const email = 'test@example.com';
      const amount = 5000;

      jest
        .spyOn(paymentService, 'initializePayment')
        .mockResolvedValue(mockPayment);

      const result = await controller.initializePayment(email, amount);

      expect(paymentService.initializePayment).toHaveBeenCalledWith(
        email,
        amount,
      );
      expect(result).toEqual(mockPayment);
    });

    it('should handle exceptions from PaymentService.initializePayment', async () => {
      const email = 'test@example.com';
      const amount = 5000;

      jest
        .spyOn(paymentService, 'initializePayment')
        .mockRejectedValue(
          new HttpException(
            'Payment initialization failed',
            HttpStatus.BAD_REQUEST,
          ),
        );

      await expect(controller.initializePayment(email, amount)).rejects.toThrow(
        new HttpException(
          'Payment initialization failed',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('verifyPayment', () => {
    it('should call PaymentService.verifyPayment and return its result', async () => {
      const mockVerification = {
        status: true,
        data: { reference: 'mock-reference', status: 'success' },
      };
      const reference = 'mock-reference';

      jest
        .spyOn(paymentService, 'verifyPayment')
        .mockResolvedValue(mockVerification);

      const result = await controller.verifyPayment(reference);

      expect(paymentService.verifyPayment).toHaveBeenCalledWith(reference);
      expect(result).toEqual(mockVerification);
    });

    it('should handle exceptions from PaymentService.verifyPayment', async () => {
      const reference = 'mock-reference';

      jest
        .spyOn(paymentService, 'verifyPayment')
        .mockRejectedValue(
          new HttpException(
            'Payment verification failed',
            HttpStatus.BAD_REQUEST,
          ),
        );

      await expect(controller.verifyPayment(reference)).rejects.toThrow(
        new HttpException(
          'Payment verification failed',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
