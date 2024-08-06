import { PaymentStatus } from '../../schemas/Order.schema';
import { CartItemDto } from './cartItem.dto';
export declare class CreateOrderDto {
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingCountry: string;
    shippingZipCode: string;
    name: string;
    email: string;
    phoneNumber: string;
    cartItem: CartItemDto[];
    paymentMethod: string;
    orderStatus: PaymentStatus;
    orderQuantity: number;
    orderSum: number;
    merchant: string;
}
