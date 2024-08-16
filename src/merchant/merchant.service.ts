import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { Merchant } from 'src/schemas/Merchant.schema';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { Wallet } from 'src/schemas/Wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    private readonly walletService: WalletService,
  ) {}

  async create(
    userId: string,
    createMerchantDto?: CreateMerchantDto,
  ): Promise<Merchant> {
    console.log(createMerchantDto);
    const findUser = this.userModel.findById(userId);

    if (!findUser) {
      throw new BadRequestException('No user record found for this user.');
    }

    const hashedPassword = await bcrypt.hash(createMerchantDto.password, 10);
    const createdMerchant = new this.merchantModel({
      user: userId,
      merchantName: createMerchantDto.merchantName,
      businessType: createMerchantDto.businessType,
      phoneNumber: createMerchantDto.phoneNumber,
      businessEmail: createMerchantDto.businessEmail,
      businessCategory: createMerchantDto.businessCategory,
      password: hashedPassword,
    });
    const result = await createdMerchant.save();
    console.log(result);
    const _id = result._id.toString(); // Convert ObjectId to string
    await this.walletService.create(_id);

    return result;
  }

  async findById(id: string): Promise<Merchant> {
    return this.merchantModel.findById(id).populate('user').exec();
  }

  async update(id: string, merchant: UpdateMerchantDto): Promise<Merchant> {
    return this.merchantModel
      .findByIdAndUpdate(id, merchant, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.merchantModel.findByIdAndDelete(id);
  }

  // async scheduledCampaign(merchantId: string, goferId?: string) {

  // }
}
