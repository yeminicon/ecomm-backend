/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { User } from 'src/schemas/User.schema';
import { Product } from 'src/schemas/Product.schema';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';
import { MerchantService } from 'src/merchant/merchant.service';
import { UsersService } from 'src/users/users.service';
import { BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Wallet } from 'src/schemas/Wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';
import { Order } from 'src/schemas/Order.schema';

describe('ProductService', () => {
  let service: ProductService;
  let usersService: UsersService;
  let merchantService: MerchantService;
  let model: Model<Product>;
  let walletService: WalletService;
  let walletModel: Model<Wallet>;

  const mockProduct = {
    _id: '66ab6c6cc5ed2e4a33aa46f9',
    name: 'Fresh meat 5 pieces 2.5kg',
    price: 15000,
    imageurl:
      'https://res.cloudinary.com/dm9lgej0j/image/upload/v1722509560/upload/R…',
    description: 'Cow meat refrigerated in cool ',
    quantity: 500,
    packaging: 'a fine nylon',
    dimensions: '2 x 10',
    ingredient: 'Meat and allum',
    nutritionalInfo: 'best',
    storage: 'refrigertor',
    merchant: '234567890987',
  };
  let userModel: Model<User>;
  let merchantModel: Model<Merchant>;
  const mockProductService = {
    //get all the function like findbyid findall
    findOne: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn().mockResolvedValue(mockProduct),
    countDocuments: jest.fn(),
  };
  const mockUserService = {};
  const mockMerchantService = {};
  const mockWalletService = {};
  const mockOrderService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        MerchantService,
        UsersService,
        WalletService,
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
        {
          provide: getModelToken(Wallet.name),
          useValue: mockWalletService,
        },
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    merchantService = module.get<MerchantService>(MerchantService);
    usersService = module.get<UsersService>(UsersService);
    model = module.get<Model<Product>>(getModelToken(Product.name));
    merchantModel = module.get<Model<Merchant>>(getModelToken(Merchant.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
    walletModel = module.get<Model<Wallet>>(getModelToken(Wallet.name));
    walletService = module.get<WalletService>(WalletService);
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const NewProduct = {
        _id: '66ab6c6cc5ed2e4a33aa46f9',
        name: 'Fresh meat 5 pieces 2.5kg',
        price: 15000,
        imageurl:
          'https://res.cloudinary.com/dm9lgej0j/image/upload/v1722509560/upload/R…',
        description: 'Cow meat refrigerated in cool ',
        quantity: 500,
        packaging: 'a fine nylon',
        dimensions: '2 x 10',
        ingredient: 'Meat and allum',
        nutritionalInfo: 'best',
        storage: 'refrigertor',
        merchant: '234567890987',
      };

      jest.spyOn(model, 'create');

      const result = await service.createNewProduct(
        NewProduct as CreateProductDto,
      );
      expect(result).toEqual(mockProduct);
    });
  });

  describe('deleteById', () => {
    it('should find by id and delete', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockProduct);

      const result = await service.deleteProduct(mockProduct._id);
      const message = 'Succefully deleted this product';

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockProduct._id);
      expect(result).toEqual(message);
    });
  });

  describe('findAll', () => {
    it('should return an array of product', async () => {
      const pageNumber = 1;
      const searchWord = 'test';

      jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(1);
      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockProduct]),
            }),
          }) as any,
      );
      const result = await service.findAll(pageNumber, searchWord);
      expect(model.countDocuments).toHaveBeenCalledWith({
        name: { $regex: 'test', $options: 'i' },
      });
      expect(model.find).toHaveBeenCalledWith({
        name: { $regex: 'test', $options: 'i' },
      });
      expect(result).toEqual({ products: [mockProduct], total: 1 });
    });
  });

  describe('updateById', () => {
    it('should find by id and update', async () => {
      const updatedProduct = {
        ...mockProduct,
        name: 'Fresh meat 5 pieces 2.5kg',
      };

      const product = {
        name: 'Fresh meat 5 pieces 2.5kg',
      };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedProduct);

      const result = await service.updateProductInfo(
        mockProduct._id,
        product as any,
      );

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockProduct._id,
        product,
        {
          new: true,
        },
      );
      expect(result.name).toEqual(product.name);
    });
  });

  describe('findById', () => {
    it('should find and return a product', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockProduct);

      const result = await service.findOne(mockProduct._id);
      expect(model.findOne).toHaveBeenCalledWith({ _id: mockProduct._id });
      expect(result).toEqual(mockProduct);
    });

    it('should throw BadRequestException if invalid Id is provided', async () => {
      const id = 'invalid-id';

      const isValidObjectIdMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(service.findOne(id)).rejects.toThrow(BadRequestException);

      expect(isValidObjectIdMock).toHaveBeenCalledWith(id);
      isValidObjectIdMock.mockRestore();
    });

    it('should throw NotFound', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockProduct);

      const result = await service.findOne(mockProduct._id);

      expect(model.findOne).toHaveBeenLastCalledWith({ _id: mockProduct._id });
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAllByMerchant', () => {
    it('should find and return products based on the merchantId', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockProduct]),
      } as any);

      const merchantId = '234567890987';
      const result = await service.findAllByMerchant(merchantId);

      expect(model.find).toHaveBeenCalledWith({ merchant: merchantId });
      expect(result).toEqual([mockProduct]);
    });
  });
  // describe('findAllByMerchant', () => {
  //   it('should find and return products based on the merchantId', async () => {
  //     const merchantId = '234567890987';

  //     const result = await service.findAllByMerchant(merchantId);
  //     console.log(result);

  //     expect(model.find).toHaveBeenCalledWith({ merchant: merchantId });
  //     // expect(result).toEqual);
  //   });
  // });
});
