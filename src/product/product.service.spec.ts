/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { User } from 'src/schemas/User.schema';
import { Product } from 'src/schemas/Product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';
import { MerchantService } from 'src/merchant/merchant.service';
import { UsersService } from 'src/users/users.service';

describe('ProductService', () => {
  let service: ProductService;
  let usersService: UsersService;
  let merchantService: MerchantService;
  let model: Model<Product>;

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
  };
  const mockUserService = {};
  const mockMerchantService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        MerchantService,
        UsersService,
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

    service = module.get<ProductService>(ProductService);
    merchantService = module.get<MerchantService>(MerchantService);
    usersService = module.get<UsersService>(UsersService);
    model = module.get<Model<Product>>(getModelToken(Product.name));
    merchantModel = module.get<Model<Merchant>>(getModelToken(Merchant.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('findById', () => {
    it('should find and return a product', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockProduct);

      const result = await service.findOne(mockProduct._id);
      expect(model.findOne).toHaveBeenCalledWith({ _id: mockProduct._id });
      expect(result).toEqual(mockProduct);
    });
  });
});
