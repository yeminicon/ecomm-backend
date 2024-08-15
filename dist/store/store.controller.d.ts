import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    create(createStoreDto: CreateStoreDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStoreDto: UpdateStoreDto): string;
    remove(id: string): string;
}
