import { MerchantService } from './merchant.service';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
export declare class MerchantController {
    private readonly merchantService;
    constructor(merchantService: MerchantService);
    update(id: string, updateMerchantDto: UpdateMerchantDto): Promise<import("../schemas/Merchant.schema").Merchant>;
}
