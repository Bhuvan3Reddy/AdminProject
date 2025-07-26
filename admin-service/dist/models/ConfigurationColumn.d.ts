import { Model } from 'sequelize-typescript';
import { Configuration } from './Configuration';
export declare class ConfigurationColumn extends Model<ConfigurationColumn> {
    id: number;
    configurationId: number;
    columnName: string;
    dataType: string;
    isPrimaryKey: boolean;
    isRequired: boolean;
    defaultValue?: string;
    createdAt: Date;
    updatedAt: Date;
    configuration: Configuration;
}
//# sourceMappingURL=ConfigurationColumn.d.ts.map