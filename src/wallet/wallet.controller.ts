import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AddFundDtoDto } from './dto/addFundt.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body('merchantId') merchantId: string) {
    return this.walletService.create(merchantId);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get('/id')
  findOne(@Query('id') id: string) {
    return this.walletService.findOne(id);
  }

  @Get('/merchantId')
  findByMerchant(@Query('merchantId') merchantId: string) {
    return this.walletService.findByMerchantId(merchantId);
  }

  @Patch(':id')
  update(@Query('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(id, updateWalletDto);
  }

  @Post('/addFund')
  updateAcctBalance(@Body() addFundDto: any) {
    console.log(addFundDto);
    return this.walletService.addFund(
      addFundDto.merchantId,
      addFundDto.confirmAmount,
    );
  }

  @Delete(':id')
  remove(@Query('id') id: string) {
    return this.walletService.remove(id);
  }
}
