import { CartItemDto } from './cartItem.dto';
import { PaymentStatus } from 'src/schemas/Order.schema';
export declare class UpdateOrderDto {
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
