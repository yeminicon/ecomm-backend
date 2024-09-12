/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PaymentService', () => {
  let service: PaymentService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<PaymentService>(PaymentService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('initializePayment', () => {
    it('should initialize payment successfully', async () => {
      const mockResponse = {
        data: {
          status: true,
          message: 'Authorization URL created',
          data: {
            authorization_url: 'https://paystack.com/pay/mock-url',
            access_code: 'mock-access-code',
            reference: 'mock-reference',
          },
        },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const email = 'test@example.com';
      const amount = 5000;

      const result = await service.initializePaystackPayment(email, amount);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount: amount * 100, // Paystack accepts amount in kobo
        },
        {
          headers: {
            Authorization: `Bearer mock-paystack-secret-key`,
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('should throw an exception if payment initialization fails', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Request failed'));

      const email = 'test@example.com';
      const amount = 5000;

      await expect(
        service.initializePaystackPayment(email, amount),
      ).rejects.toThrow(
        new HttpException(
          'Paystack payment initialization failed',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('verifyPayment', () => {
    it('should verify payment successfully', async () => {
      const mockResponse = {
        data: {
          status: true,
          message: 'Verification successful',
          data: {
            reference: 'mock-reference',
            amount: 500000,
            currency: 'NGN',
            customer: {
              email: 'test@example.com',
            },
            status: 'success',
          },
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const reference = 'mock-reference';

      const result = await service.verifyPaystackPayment(reference);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer mock-paystack-secret-key`,
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('should throw an exception if payment verification fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Request failed'));

      const reference = 'mock-reference';

      await expect(service.verifyPaystackPayment(reference)).rejects.toThrow(
        new HttpException(
          'Paystack payment verification failed',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
