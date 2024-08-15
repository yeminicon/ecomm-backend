import {
  Controller,
  Body,
  Patch,
  UseGuards,
  Post,
  Query,
  Get,
  Delete,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateMerchantDto } from './dto/create-merchant.dto';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  create(
    @Query('userId') userId: string,
    @Body() createMechantDto: CreateMerchantDto,
  ) {
    return this.merchantService.create(userId, createMechantDto);
  }

  @Get('/id')
  findById(@Query('id') id: string) {
    return this.merchantService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Query('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.update(id, updateMerchantDto);
  }

  @Delete('/id')
  delete(@Query('id') id: string) {
    return this.merchantService.delete(id);
  }
}
