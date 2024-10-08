import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaymentService {
  private readonly paystackSecretKey: string;
  private readonly flutterwaveSecretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.paystackSecretKey = this.configService.get<string>(
      'PAYSTACK_SECRET_KEY',
    );
    this.flutterwaveSecretKey = this.configService.get<string>(
      'FLUTTERWAVE_SECRET_KEY',
    );
  }

  // Paystack Payment
  async initializePaystackPayment(email: string, amount: number) {
    const url = 'https://api.paystack.co/transaction/initialize';
    const headers = {
      Authorization: `Bearer ${this.paystackSecretKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      email,
      amount: amount * 100, // Paystack accepts amount in kobo
    };

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Paystack payment initialization failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyPaystackPayment(reference: string) {
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const headers = {
      Authorization: `Bearer ${this.paystackSecretKey}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Paystack payment verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Flutterwave Payment
  async initializeFlutterwavePayment(
    email: string,
    amount: number,
    currency = 'NGN',
  ) {
    const url = 'https://api.flutterwave.com/v3/payments';
    const headers = {
      Authorization: `Bearer ${this.flutterwaveSecretKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      tx_ref: `tx-${Date.now()}`, // unique transaction reference
      amount,
      currency,
      redirect_url: 'https://deepisces.com.ng/callback',
      customer: {
        email,
      },
    };

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Flutterwave payment initialization failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyFlutterwavePayment(transactionId: string) {
    const url = `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`;
    const headers = {
      Authorization: `Bearer ${this.flutterwaveSecretKey}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Flutterwave payment verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import axios from 'axios';

// @Injectable()
// export class PaymentService {
//   private readonly paystackSecretKey: string;

//   constructor(private readonly configService: ConfigService) {
//     this.paystackSecretKey = this.configService.get<string>(
//       'PAYSTACK_SECRET_KEY',
//     );
//   }

//   async initializePayment(email: string, amount: number) {
//     const url = 'https://api.paystack.co/transaction/initialize';
//     const headers = {
//       Authorization: `Bearer ${this.paystackSecretKey}`,
//       'Content-Type': 'application/json',
//     };

//     const data = {
//       email,
//       amount: amount * 100, // Paystack accepts amount in kobo
//     };

//     try {
//       const response = await axios.post(url, data, { headers });
//       return response.data;
//     } catch (error) {
//       throw new HttpException(
//         'Payment initialization failed',
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }

//   async verifyPayment(reference: string) {
//     const url = `https://api.paystack.co/transaction/verify/${reference}`;
//     const headers = {
//       Authorization: `Bearer ${this.paystackSecretKey}`,
//       'Content-Type': 'application/json',
//     };

//     try {
//       const response = await axios.get(url, { headers });
//       return response.data;
//     } catch (error) {
//       throw new HttpException(
//         'Payment verification failed',
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }
// }
