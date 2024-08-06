import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/User.schema';
import { Merchant } from '../schemas/merchant.schema';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(userId: string): Promise<Merchant> {
    const createdMerchant = new this.merchantModel({
      userId,
      merchantName: userId,
    });
    return createdMerchant.save();
  }

  async findById(id: string): Promise<Merchant> {
    return this.merchantModel.findById(id).populate('user').exec();
  }

  async update(id: string, merchant: UpdateMerchantDto): Promise<Merchant> {
    return this.merchantModel
      .findByIdAndUpdate(id, merchant, { new: true })
      .exec();
  }

  // async scheduledCampaign(merchantId: string, goferId?: string) {

  // }
}
