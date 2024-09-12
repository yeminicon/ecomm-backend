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
    const payment = await this.paymentService.initializePaystackPayment(
      email,
      amount,
    );
    console.log(payment);
    return payment;
  }

  @Post('verify')
  async verifyPayment(@Query('reference') reference: string) {
    const verification =
      await this.paymentService.verifyPaystackPayment(reference);
    return verification;
  }
  @Post('initializeFlutter')
  async initializeFlutterWavePayment(
    @Body('email') email: string,
    @Body('amount') amount: number,
  ) {
    console.log(email);
    console.log(amount);
    const payment = await this.paymentService.initializeFlutterwavePayment(
      email,
      amount,
    );
    console.log(payment);
    return payment;
  }

  @Post('verifyFlutter')
  async verifyFlutterWavePayment(@Query('reference') reference: string) {
    const verification =
      await this.paymentService.verifyFlutterwavePayment(reference);
    return verification;
  }
}
