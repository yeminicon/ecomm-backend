/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MerchantService } from 'src/merchant/merchant.service';
import { UsersService } from 'src/users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from 'src/schemas/Product.schema';
import { Merchant } from 'src/schemas/Merchant.schema';
import { User } from 'src/schemas/User.schema';
import mongoose from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

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

  const mockProductService = {
    findOne: jest.fn(),
    findAll: jest.fn().mockResolvedValueOnce([mockProduct]),
    findAllByMerchant: jest.fn(),
    deleteProduct: jest.fn(),
    updateProductInfo: jest.fn(),
    countDocuments: jest.fn(),
  };

  const mockMerchantService = {};
  const mockUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: MerchantService, useValue: mockMerchantService },
        { provide: UsersService, useValue: mockUserService },
        { provide: getModelToken(Product.name), useValue: mongoose.Model },
        { provide: getModelToken(Merchant.name), useValue: mongoose.Model },
        { provide: getModelToken(User.name), useValue: mongoose.Model },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productController = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a new product', async () => {
  //     const createProductDto: CreateProductDto = {
  //       name: 'Fresh meat 5 pieces 2.5kg',
  //       price: 15000,
  //       imageurl: 'https://example.com/image.jpg',
  //       description: 'Cow meat refrigerated in cool',
  //       quantity: 500,
  //       packaging: 'a fine nylon',
  //       dimensions: '2 x 10',
  //       ingredient: 'Meat and allum',
  //       nutritionalInfo: 'best',
  //       storage: 'refrigerator',
  //     };
  //     const result = await productController.create(createProductDto);
  //     expect(result).toEqual(mockProduct);
  //     expect(productService.createNewProduct).toHaveBeenCalledWith(
  //       createProductDto,
  //     );
  //   });
  // });

  // describe('findAll', () => {
  //   it('should return an array of products and total count', async () => {
  //     const result = await productController.findAll('1', 'meat');
  //     expect(result).toEqual({ products: [mockProduct], total: 1 });
  //     expect(productService.findAll).toHaveBeenCalledWith(1, 'meat');
  //   });
  // });

  // describe('findBYMerchant', () => {
  //   it('should return an array of products by merchant', async () => {
  //     const result = await productController.findBYMerchant('234567890987');
  //     expect(result).toEqual([mockProduct]);
  //     expect(productService.findAllByMerchant).toHaveBeenCalledWith(
  //       '234567890987',
  //     );
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a single product by id', async () => {
  //     const result = await productController.findOne(
  //       '66ab6c6cc5ed2e4a33aa46f9',
  //     );
  //     expect(result).toEqual(mockProduct);
  //     expect(productService.findOne).toHaveBeenCalledWith(
  //       '66ab6c6cc5ed2e4a33aa46f9',
  //     );
  //   });
  // });

  // describe('update', () => {
  //   it('should update and return the updated product', async () => {
  //     const updateProductDto: UpdateProductDto = {
  //       price: 20000,
  //     };
  //     const result = await productController.update(
  //       '66ab6c6cc5ed2e4a33aa46f9',
  //       updateProductDto,
  //     );
  //     expect(result).toEqual(mockProduct);
  //     expect(productService.updateProductInfo).toHaveBeenCalledWith(
  //       '66ab6c6cc5ed2e4a33aa46f9',
  //       updateProductDto,
  //     );
  //   });
  // });

  // describe('remove', () => {
  //   it('should delete and return the deleted product', async () => {
  //     const result = await productController.remove('66ab6c6cc5ed2e4a33aa46f9');
  //     expect(result).toEqual(mockProduct);
  //     expect(productService.deleteProduct).toHaveBeenCalledWith(
  //       '66ab6c6cc5ed2e4a33aa46f9',
  //     );
  //   });
  // });
});
