import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoreService {
    create(createStoreDto: CreateStoreDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStoreDto: UpdateStoreDto): string;
    remove(id: number): string;
}
