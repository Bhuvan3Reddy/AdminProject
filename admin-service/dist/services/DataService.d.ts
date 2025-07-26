import { Configuration } from '../models/Configuration';
import { IDataService, IDataRepository } from '../interfaces/factory';
export declare class DataService implements IDataService {
    private dataRepository;
    constructor(dataRepository: IDataRepository);
    getConfigurationData(configId: number): Promise<{
        configuration: Configuration;
        data: any[];
    }>;
    getDataRecord(configId: number, recordId: number): Promise<any>;
    createDataRecord(configId: number, recordData: Record<string, any>): Promise<any>;
    updateDataRecord(configId: number, recordId: number, recordData: Record<string, any>): Promise<any>;
    deleteDataRecord(configId: number, recordId: number): Promise<void>;
}
//# sourceMappingURL=DataService.d.ts.map