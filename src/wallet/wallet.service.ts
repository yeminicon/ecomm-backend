import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Merchant } from 'src/schemas/Merchant.schema';
import { Model } from 'mongoose';
import { Wallet } from 'src/schemas/Wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
  ) {}

  private generateAccountNumber(): string {
    const prefix = '6094';
    const randomNumber = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(6, '0');
    return prefix + randomNumber;
  }
  private async isAccountNumberUnique(accountNumber: string): Promise<boolean> {
    const existingWallet = await this.walletModel.findOne({ accountNumber });
    return !existingWallet;
  }

  async create(merchantId: string): Promise<Wallet> {
    const findMerchant = await this.merchantModel.findById(merchantId);

    console.log(findMerchant);
    console.log(merchantId);

    if (!findMerchant) {
      throw new BadRequestException('No merchant record found for this user.');
    }

    console.log(findMerchant);
    let accountNumber = this.generateAccountNumber();

    while (!(await this.isAccountNumberUnique(accountNumber))) {
      accountNumber = this.generateAccountNumber();
    }

    const createWallet = new this.walletModel({
      merchantId: merchantId,
      WalletName: findMerchant.merchantName,
      Balance: 0,
      acctNumber: accountNumber,
      phoneNumber: findMerchant.phoneNumber,
      email: findMerchant.businessEmail,
    });

    return createWallet.save();
  }

  async findAll() {
    return this.walletModel.find().exec();
  }

  async findOne(id: string) {
    return this.walletModel.findById(id);
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    const findWallet = await this.walletModel.findById(id);

    if (!findWallet) {
      throw new BadRequestException('No Wallet record found');
    }
    return this.walletModel
      .findByIdAndUpdate(id, updateWalletDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string) {
    return this.walletModel.findByIdAndDelete(id);
  }
}
