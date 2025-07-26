"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
class DataService {
    dataRepository;
    constructor(dataRepository) {
        this.dataRepository = dataRepository;
    }
    async getConfigurationData(configId) {
        return await this.dataRepository.findAllByConfiguration(configId);
    }
    async getDataRecord(configId, recordId) {
        const record = await this.dataRepository.findById(configId, recordId);
        if (!record) {
            throw new Error('Record not found');
        }
        return record;
    }
    async createDataRecord(configId, recordData) {
        return await this.dataRepository.create(configId, recordData);
    }
    async updateDataRecord(configId, recordId, recordData) {
        const updatedRecord = await this.dataRepository.update(configId, recordId, recordData);
        if (!updatedRecord) {
            throw new Error('Record not found');
        }
        return updatedRecord;
    }
    async deleteDataRecord(configId, recordId) {
        const success = await this.dataRepository.delete(configId, recordId);
        if (!success) {
            throw new Error('Record not found');
        }
    }
}
exports.DataService = DataService;
