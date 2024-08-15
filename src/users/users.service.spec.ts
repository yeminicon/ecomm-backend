/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MerchantService } from 'src/merchant/merchant.service';
import { Model } from 'mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/User.schema';
import { getModelToken } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common';
import { WalletService } from 'src/wallet/wallet.service';
import { Wallet } from 'src/schemas/Wallet.schema';

describe('MerchantService', () => {
  let merchantService: MerchantService;
  let service: UsersService;
  let model: Model<Merchant>;
  let userModel: Model<User>;
  let walletService: WalletService;
  let walletModel: Model<Wallet>;

  const mockUser = {
    _id: '66a9c224e86fd41e26be3e1b',
    name: 'Ainyele Adeyemi',
    email: 'akinyele.adeyemi9005@gmail.com',
    password: '$2a$10$R1qyFZn3g9taYTJeoByWF.VR54yw9Awa8H/dh5k5zVuQ9YAFdM84a',
    verified: true,

    merchant: [],
    isAdmin: true,
  };

  const mockMerchantService = {};
  const mockUserModel = {
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
    exec: jest.fn().mockResolvedValue(mockUser),
  };
  const mockWalletService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchantService,
        UsersService,
        WalletService,
        {
          provide: getModelToken(Merchant.name),
          useValue: mockMerchantService,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(Wallet.name),
          useValue: mockWalletService,
        },
      ],
    }).compile();

    merchantService = module.get<MerchantService>(MerchantService);
    service = module.get<UsersService>(UsersService);
    walletModel = module.get<Model<Wallet>>(getModelToken(Wallet.name));
    walletService = module.get<WalletService>(WalletService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw an error if user already exists', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);

      await expect(
        service.create({ email: mockUser.email } as any),
      ).rejects.toThrow(HttpException);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: mockUser.email,
      });
    });

    // it('should create a new user', async () => {
    //   mockUserModel.findOne.mockResolvedValue(null);
    //   const saveSpy = jest.fn().mockResolvedValue(mockUser);
    //   mockUserModel.save = saveSpy;
    //   const createUserDto = { email: 'newuser@example.com' } as any;

    //   const result = await service.create(createUserDto);

    //   expect(saveSpy).toHaveBeenCalled();
    //   expect(result).toEqual(mockUser);
    // });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail(mockUser.email);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: mockUser.email,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      mockUserModel.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue([mockUser]),
      });

      const result = await service.findAll();

      expect(mockUserModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      mockUserModel.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await service.findOne(mockUser._id);

      expect(mockUserModel.findById).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { name: 'Updated Name' } as any;
      mockUserModel.findByIdAndUpdate.mockResolvedValue({
        ...mockUser,
        ...updateUserDto,
      });

      const result = await service.update(mockUser._id, updateUserDto);

      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUser._id,
        updateUserDto,
        { new: true },
      );
      expect(result).toEqual({ ...mockUser, ...updateUserDto });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      mockUserModel.findByIdAndDelete.mockResolvedValue(mockUser);

      const result = await service.deleteUser(mockUser._id);

      expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith(
        mockUser._id,
      );
      expect(result).toEqual(mockUser);
    });
  });
});
