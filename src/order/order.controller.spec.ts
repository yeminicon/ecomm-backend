import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentStatus } from 'src/schemas/Order.schema';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  // const mockOrder = {
  //   _id: '66ade75e04802b152b1f465d',
  //   shippingAddress: '13 Immaculate',
  //   shippingCity: 'Ado Ota',
  //   shippingState: 'Ogun',
  //   shippingCountry: 'GD',
  //   shippingZipCode: '112102',
  //   name: 'home',
  //   email: 'akinyele.adeyemi9005@gmail.com',
  //   phoneNumber: '08144616094',
  //   cartItem: [],
  //   paymentMethod: 'Pick-Up',
  //   orderStatus: 'PENDING',
  //   orderQuantity: 2,
  //   orderSum: 32000,
  //   merchant: 'home',
  //   createdAt: '2024-08-03T08:16:30.105+00:00',
  //   updatedAt: '2024-08-03T08:16:30.105+00:00',
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
            findAllByUser: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  describe('create', () => {
    it('should call orderService.createOrder and return the result', async () => {
      const createOrderDto: CreateOrderDto = {
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
        orderStatus: PaymentStatus.PENDING,
        orderQuantity: 2,
        orderSum: 32000,
        merchant: 'home',
      };
      const mockResult = {
        /* mock result */
      };

      jest.spyOn(orderService, 'createOrder').mockResolvedValue(mockResult);

      const result = await orderController.create(createOrderDto);
      expect(orderService.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAllByUser', () => {
    it('should call orderService.findAllByUser and return the result', async () => {
      const userId = 'test-user-id';
      const mockResult = [
        /* mock orders */
      ];

      jest.spyOn(orderService, 'findAllByUser').mockResolvedValue(mockResult);

      const result = await orderController.findAllByUser(userId);
      expect(orderService.findAllByUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call orderService.findOne and return the result', async () => {
      const id = 'test-id';
      const userId = 'test-user-id';
      const mockResult = {
        /* mock order */
      };

      jest.spyOn(orderService, 'findOne').mockResolvedValue(mockResult);

      const result = await orderController.findOne(id, userId);
      expect(orderService.findOne).toHaveBeenCalledWith(id, userId);
      expect(result).toEqual(mockResult);
    });
  });

  // describe('update', () => {
  //   it('should call orderService.update and return the result', async () => {
  //     const id = 'test-id';
  //     const updateOrderDto: UpdateOrderDto = {
  //       ...mockOrder
  //     };
  //     const mockResult = {
  //       /* mock updated order */
  //     };

  //     jest.spyOn(orderService, 'update').mockResolvedValue(mockResult);

  //     const result = await orderController.update(id, updateOrderDto);
  //     expect(orderService.update).toHaveBeenCalledWith(id, updateOrderDto);
  //     expect(result).toEqual(mockResult);
  //   });
  // });

  // describe('remove', () => {
  //   it('should call orderService.remove and return the result', async () => {
  //     const id = 'test-id';
  //     const mockResult = {
  //       /* mock delete response */
  //     };

  //     jest.spyOn(orderService, 'remove').mockResolvedValue(mockResult);

  //     const result = await orderController.remove(id);
  //     expect(orderService.remove).toHaveBeenCalledWith(id);
  //     expect(result).toEqual(mockResult);
  //   });
  // });
});
