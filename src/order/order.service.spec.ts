/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/schemas/User.schema';
import { Product } from 'src/schemas/Product.schema';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';
import { Order } from 'src/schemas/Order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { HttpException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;
  let usersService: UsersService;
  let merchantService: MerchantService;
  let productService: ProductService;
  let orderModel: Model<Order>;
  let userModel: Model<User>;
  let merchantModel: Model<Merchant>;
  let productModel: Model<Product>;

  const mockOrder = {
    _id: '66ade75e04802b152b1f465d',
    shippingAddress: '13 Immaculate',
    shippingCity: 'Ado Ota',
    shippingState: 'Ogun',
    shippingCountry: 'GD',
    shippingZipCode: '112102',
    name: 'home',
    email: 'akinyele.adeyemi9005@gmail.com',
    phoneNumber: '08144616094',
    cartItem: [],
    paymentMethod: 'Pick-Up',
    orderStatus: 'PENDING',
    orderQuantity: 2,
    orderSum: 32000,
    merchant: 'home',
    createdAt: '2024-08-03T08:16:30.105+00:00',
    updatedAt: '2024-08-03T08:16:30.105+00:00',
    toObject: jest.fn().mockReturnValue({
      _id: '66ade75e04802b152b1f465d',
      shippingAddress: '13 Immaculate',
      shippingCity: 'Ado Ota',
      shippingState: 'Ogun',
      shippingCountry: 'GD',
      shippingZipCode: '112102',
      name: 'home',
      email: 'akinyele.adeyemi9005@gmail.com',
      phoneNumber: '08144616094',
      cartItem: [],
      paymentMethod: 'Pick-Up',
      orderStatus: 'PENDING',
      orderQuantity: 2,
      orderSum: 32000,
      merchant: 'home',
      createdAt: '2024-08-03T08:16:30.105+00:00',
      updatedAt: '2024-08-03T08:16:30.105+00:00',
    }),
  };

  const mockOrders = [
    {
      _id: '66ade75e04802b152b1f465d',
      shippingAddress: '13 Immaculate',
      shippingCity: 'Ado Ota',
      shippingState: 'Ogun',
      shippingCountry: 'GD',
      shippingZipCode: '112102',
      name: 'home',
      email: 'akinyele.adeyemi9005@gmail.com',
      phoneNumber: '08144616094',
      cartItem: [],
      paymentMethod: 'Pick-Up',
      orderStatus: 'PENDING',
      orderQuantity: 2,
      orderSum: 32000,
      merchant: 'home',
      createdAt: '2024-08-03T08:16:30.105+00:00',
      updatedAt: '2024-08-03T08:16:30.105+00:00',
    },
  ];

  const mockUser = {
    email: 'akinyele.adeyemi9005@gmail.com',
    _id: '66a9c224e86fd41e26be3e1b',
  };

  const mockOrderService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockOrders),
    }),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn().mockResolvedValue(mockOrder),
  };

  const mockUserService = {
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        email: 'akinyele.adeyemi9005@gmail.com',
        _id: '66a9c224e86fd41e26be3e1b',
      }),
    }),
    findById: jest.fn().mockResolvedValue(mockUser),
  };

  const mockMerchantService = {};
  const mockProductService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        ProductService,
        MerchantService,
        UsersService,
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderService,
        },
        {
          provide: getModelToken(Product.name),
          useValue: mockProductService,
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

    service = module.get<OrderService>(OrderService);
    productService = module.get<ProductService>(ProductService);
    merchantService = module.get<MerchantService>(MerchantService);
    usersService = module.get<UsersService>(UsersService);
    orderModel = module.get<Model<Order>>(getModelToken(Order.name));
    merchantModel = module.get<Model<Merchant>>(getModelToken(Merchant.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  // describe('create', () => {
  //   it('should create and return an order', async () => {
  //     const newOrder = {
  //       _id: '66ade75e04802b152b1f465d',
  //       shippingAddress: '13 Immaculate',
  //       shippingCity: 'Ado Ota',
  //       shippingState: 'Ogun',
  //       shippingCountry: 'GD',
  //       shippingZipCode: '112102',
  //       name: 'home',
  //       phoneNumber: '08144616094',
  //       email: 'akinyele.adeyemi9005@gmail.com',
  //       orderSum: 32000,
  //       orderQuantity: 2,
  //       cartItem: [],
  //       paymentMethod: 'Pick-Up',
  //       orderStatus: 'PENDING',
  //       user: '66a9c224e86fd41e26be3e1b',
  //       merchant: 'home',
  //       createdAt: '2024-08-03T08:16:30.105+00:00',
  //       updatedAt: '2024-08-03T08:16:30.105+00:00',
  //     };

  //     const result = await service.createOrder(newOrder as CreateOrderDto);
  //     console.log(result);
  //     expect(result).toEqual(mockOrder);
  //   });
  // });

  describe('findAllByUser', () => {
    it('should find all orders', async () => {
      const userId = '66a9c224e86fd41e26be3e1b';
      jest.spyOn(userModel, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(orderModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockOrders),
      } as any);

      const result = await service.findAllByUser(userId);
      console.log(result);
      expect(result).toEqual(mockOrders);
    });

    it('should throw an exception if user not found', async () => {
      const userId = 'nonexistentUserId';
      jest.spyOn(userModel, 'findById').mockResolvedValue(null);

      await expect(service.findAllByUser(userId)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('deleteById', () => {
    // Add your deleteById tests here
  });
});
