import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOTPDto } from './dto/otp.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  const mockAuthService = {
    createUser: jest.fn(),
    validateUser: jest.fn(),
    generateAuthToken: jest.fn(),
    verifyOTP: jest.fn(),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a new user and return success message', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: '123456',
        name: 'Test',
      };
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };

      mockAuthService.createUser.mockResolvedValue(mockUser);

      const result = await authController.signUp(signUpDto);

      expect(result).toEqual({
        message:
          'User successfully registered, check your email for confirmation',
        user: mockUser,
      });
      expect(authService.createUser).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('login', () => {
    it('should return a token and user details if credentials are valid', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: '123456',
      };
      const mockUser = {
        _id: '1',
        email: 'test@example.com',
        name: 'Test',
        verified: true,
      };
      const mockToken = 'some-jwt-token';

      mockAuthService.validateUser.mockResolvedValue(mockUser);
      mockAuthService.generateAuthToken.mockResolvedValue(mockToken);

      const result = await authController.login(loginDto);

      expect(result).toEqual({
        token: mockToken,
        userId: mockUser._id,
        user: mockUser.name,
        message: 'Login successful',
      });
      expect(authService.validateUser).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(authService.generateAuthToken).toHaveBeenCalledWith(mockUser);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: '123456',
      };

      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(authController.login(loginDto)).rejects.toThrow(TypeError);
    });

    it('should throw HttpException if user is not verified', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: '123456',
      };
      const mockUser = {
        _id: '1',
        email: 'test@example.com',
        name: 'Test',
        verified: false,
      };

      mockAuthService.validateUser.mockResolvedValue(mockUser);

      await expect(authController.login(loginDto)).rejects.toThrow(
        new HttpException(
          'Kindly verify your account',
          HttpStatus.UNAUTHORIZED,
        ),
      );
    });
  });

  describe('adminLogin', () => {
    it('should return a token and user details if credentials are valid', async () => {
      const adminLoginDto = {
        email: 'admin@example.com',
        password: '123456',
        adminLogin: true,
      };
      const mockUser = {
        _id: '1',
        email: 'admin@example.com',
        name: 'Admin',
        verified: true,
      };
      const mockToken = 'some-jwt-token';

      mockAuthService.validateUser.mockResolvedValue(mockUser);
      mockAuthService.generateAuthToken.mockResolvedValue(mockToken);

      const result = await authController.adminLogin(adminLoginDto);

      expect(result).toEqual({
        token: mockToken,
        userId: mockUser._id,
        user: mockUser.name,
        message: 'Login successful',
      });
      expect(authService.validateUser).toHaveBeenCalledWith(
        adminLoginDto.email,
        adminLoginDto.password,
      );
      expect(authService.generateAuthToken).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('verifyUserOTP', () => {
    it('should verify the user OTP and return the result', async () => {
      const verifyOTPDto: VerifyOTPDto = {
        email: 'test@example.com',
        otp: '123456',
      };
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockVerifyResult = { success: true };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockAuthService.verifyOTP.mockResolvedValue(mockVerifyResult);

      const result = await authController.verifyUserOTP(verifyOTPDto);

      expect(result).toEqual(mockVerifyResult);
      expect(usersService.findByEmail).toHaveBeenCalledWith(verifyOTPDto.email);
      expect(authService.verifyOTP).toHaveBeenCalledWith(
        mockUser.id,
        verifyOTPDto.otp,
      );
    });
  });
});
