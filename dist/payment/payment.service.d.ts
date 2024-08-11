import { ConfigService } from '@nestjs/config';
export declare class PaymentService {
    private readonly configService;
    private readonly paystackSecretKey;
    constructor(configService: ConfigService);
    initializePayment(email: string, amount: number): Promise<any>;
    verifyPayment(reference: string): Promise<any>;
}
