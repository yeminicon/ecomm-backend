import { Controller, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  // @Post()
  // create(@Body() createMerchantDto: CreateMerchantDto) {
  //   return this.merchantService.create(createMerchantDto);
  // }

  // @Get()
  // findAll() {
  //   return this.merchantService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.merchantService.findOne(+id);
  // }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.update(id, updateMerchantDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.merchantService.remove(+id);
  // }
}