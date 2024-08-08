/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MerchantService } from '../merchant/merchant.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';
import { HttpException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let merchantService: MerchantService;

  const mockUser: CreateUserDto = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatarUrl: 'https://example.com/avatar.jpg',
    password: 'strongPassword123',
    isAdmin: true, // Optional boolean property
    isVerified: true, // Optional boolean property
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        {
          provide: MerchantService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    merchantService = module.get<MerchantService>(MerchantService);
  });

  // describe('create', () => {
  //   it('should create a user and return merchant if user is admin', async () => {
  //     const createUserDto: CreateUserDto = {
  //       email: '123@gmail.com',
  //       name: '123',
  //       password: '123456',
  //       isAdmin: true,
  //     };
  //     const mockUser = { id: 'user-id', ...createUserDto };
  //     const mockMerchant = { id: 'merchant-id' };

  //     jest.spyOn(usersService, 'create');
  //     // jest.spyOn(merchantService, 'create').mockResolvedValue(mockMerchant);

  //     const result = await usersController.create(createUserDto);
  //     expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  //     expect(merchantService.create).toHaveBeenCalledWith(mockUser.id);
  //     expect(result).toEqual(mockMerchant);
  //   });

  //   it('should create a user and return the user if not admin', async () => {
  //     const createUserDto: CreateUserDto = {
  //       email: '123@gmail.com',
  //       name: '123',
  //       password: '123456',
  //       isAdmin: true,
  //     };
  //     const mockUser = { id: 'user-id', ...createUserDto };

  //     jest.spyOn(usersService, 'create');

  //     const result = await usersController.create(createUserDto);
  //     expect(usersService.create).toHaveBeenCalledWith(createUserDto);
  //     expect(result).toEqual(mockUser);
  //   });
  // });

  // describe('findAll', () => {
  //   it('should return an array of users', async () => {
  //     const mockUsers = [{ id: 'user1' }, { id: 'user2' }];
  //     jest.spyOn(usersService, 'findAll');

  //     const result = await usersController.findAll();
  //     expect(usersService.findAll).toHaveBeenCalled();
  //     expect(result).toEqual(mockUsers);
  //   });
  // });

  describe('findOne', () => {
    // it('should return a user if valid ID is provided', async () => {
    //   const userId = 'user-id';
    //   const mockUser = {
    //     id: userId,
    //     name: 'Test User',
    //     email: 'test@example.com',
    //   };

    //   jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);
    //   jest.spyOn(usersService, 'findOne');

    //   const result = await usersController.findOne('invalid-id', userId);
    //   expect(usersService.findOne).toHaveBeenCalledWith(userId);
    //   expect(result).toEqual({ name: mockUser.name, email: mockUser.email });
    // });

    it('should throw an exception if user ID is invalid', async () => {
      jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(false);

      await expect(
        usersController.findOne('invalid-id', 'user-id'),
      ).rejects.toThrow(HttpException);
    });

    it('should throw an exception if user is not found', async () => {
      const userId = 'user-id';

      jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      await expect(
        usersController.findOne('invalid-id', userId),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('updateUser', () => {
    // it('should update a user and return the updated user', async () => {
    //   const userId = 'user-id';
    //   const updateUserDto: UpdateUserDto = {
    //     /* mock data */
    //   };
    //   const mockUser = { id: userId, ...updateUserDto };

    //   jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);
    //   jest.spyOn(usersService, 'update');

    //   const result = await usersController.updateUser(userId, updateUserDto);
    //   expect(usersService.update).toHaveBeenCalledWith(userId, updateUserDto);
    //   expect(result).toEqual(mockUser);
    // });

    it('should throw an exception if user ID is invalid', async () => {
      jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(false);

      await expect(
        usersController.updateUser('invalid-id', {} as UpdateUserDto),
      ).rejects.toThrow(HttpException);
    });

    it('should throw an exception if user is not found', async () => {
      const userId = 'user-id';
      const updateUserDto: UpdateUserDto = {
        /* mock data */
      };

      jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);
      jest.spyOn(usersService, 'update').mockResolvedValue(null);

      await expect(
        usersController.updateUser(userId, updateUserDto),
      ).rejects.toThrow(HttpException);
    });
  });

  // describe('remove', () => {
  //   it('should remove a user and return the result', async () => {
  //     const userId = 'user-id';
  //     const mockResult = { deleted: true };

  //     jest.spyOn(usersService, 'deleteUser');

  //     const result = await usersController.remove(userId);
  //     expect(usersService.deleteUser).toHaveBeenCalledWith(userId);
  //     expect(result).toEqual(mockResult);
  //   });
  // });
});
