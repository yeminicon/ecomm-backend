import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<any>;
    findAllByUser(userId: string): Promise<any>;
    findOne(id: string, userId: string): Promise<any>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("../schemas/Order.schema").Order>;
    remove(id: string): Promise<string>;
}
