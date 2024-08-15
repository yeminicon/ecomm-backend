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

  @Patch(':id')
  update(@Query('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Query('id') id: string) {
    return this.walletService.remove(id);
  }
}
