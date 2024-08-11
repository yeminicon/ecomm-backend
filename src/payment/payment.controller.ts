import { Controller, Post, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initialize')
  async initializePayment(
    @Body('email') email: string,
    @Body('amount') amount: number,
  ) {
    console.log(email);
    console.log(amount);
    const payment = await this.paymentService.initializePayment(email, amount);
    console.log(payment);
    return payment;
  }

  @Post('verify')
  async verifyPayment(@Query('reference') reference: string) {
    const verification = await this.paymentService.verifyPayment(reference);
    return verification;
  }
}
