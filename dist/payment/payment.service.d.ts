import { ConfigService } from '@nestjs/config';
export declare class PaymentService {
    private readonly configService;
    private readonly paystackSecretKey;
    private readonly flutterwaveSecretKey;
    constructor(configService: ConfigService);
    initializePaystackPayment(email: string, amount: number): Promise<any>;
    verifyPaystackPayment(reference: string): Promise<any>;
    initializeFlutterwavePayment(email: string, amount: number, currency?: string): Promise<any>;
    verifyFlutterwavePayment(transactionId: string): Promise<any>;
}
