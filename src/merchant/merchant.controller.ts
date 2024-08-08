import { Controller, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.update(id, updateMerchantDto);
  }
}
