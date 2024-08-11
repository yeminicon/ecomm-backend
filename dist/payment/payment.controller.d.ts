import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    initializePayment(email: string, amount: number): Promise<any>;
    verifyPayment(reference: string): Promise<any>;
}
