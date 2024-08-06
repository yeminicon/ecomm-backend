import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findUserByEmail = await this.findByEmail(createUserDto.email);

    if (findUserByEmail) {
      throw new HttpException('User with this email already exists', 400);
    }

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  findAll() {
    return this.userModel.find().populate(['merchant', 'gofer']);
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate(['merchant', 'gofer']);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
