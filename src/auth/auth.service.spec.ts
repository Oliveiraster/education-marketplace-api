import { BadRequestException, ForbiddenException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { TokenService } from './services/token.service';
import { UserService } from '../modules/identity/user/user.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };
  const mockTokenService = {
    generateAuthToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    const userDto = {
      name: 'José Luiz',
      email: 'test@test.com',
      password: '@testedeSenha0123',
      confirmPassword: '@testedeSenha0123',
    };

    it('should create a user and return token', async () => {
      const createUser = { email: userDto.email };
      const saveUser = {
        id: 1,
        email: userDto.email,
        role: 'USER',
      };

      mockUserService.findByEmail.mockResolvedValueOnce(null).mockResolvedValueOnce(saveUser);

      mockUserService.create.mockResolvedValue(createUser);

      mockTokenService.generateAuthToken.mockReturnValue('token123');

      const result = await service.createUser(userDto);
      expect(result).toBe('token123');
      expect(mockUserService.create).toHaveBeenCalledWith(userDto);
      expect(mockTokenService.generateAuthToken).toHaveBeenCalledWith({
        sub: saveUser.id,
        email: saveUser.email,
        roles: [saveUser.role],
      });
    });
    it('should throw error if user already exists', async () => {
      mockUserService.findByEmail.mockResolvedValue({ id: 1 });

      await expect(service.createUser(userDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw error if user not found after creation', async () => {
      mockUserService.findByEmail.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

      mockUserService.create.mockResolvedValue({ email: userDto.email });

      await expect(service.createUser(userDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@test.com',
      password: '123456',
    };

    it('should login successfully and return token', async () => {
      const user = {
        id: 1,
        email: loginDto.email,
        password: loginDto.password,
        role: 'USER',
      };

      mockUserService.findByEmail.mockResolvedValue(user);
      mockTokenService.generateAuthToken.mockReturnValue('token123');

      const result = await service.login(loginDto);

      expect(result).toBe('token123');
      expect(mockTokenService.generateAuthToken).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
        roles: [user.role],
      });
    });

    it('should throw error if user does not exist', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(ForbiddenException);
    });

    it('should throw error if password is incorrect', async () => {
      const user = {
        id: 1,
        email: loginDto.email,
        password: 'wrong-password',
        role: 'USER',
      };

      mockUserService.findByEmail.mockResolvedValue(user);

      await expect(service.login(loginDto)).rejects.toThrow(ForbiddenException);
    });
  });
});
