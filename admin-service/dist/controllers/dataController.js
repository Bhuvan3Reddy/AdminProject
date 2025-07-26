"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigurationDataRecord = exports.deleteConfigurationData = exports.updateConfigurationData = exports.createConfigurationData = exports.getConfigurationData = void 0;
// Helper for consistent error responses
function handleError(res, error, context) {
    if (error instanceof Error) {
        if (error.message === 'Configuration not found') {
            return res.status(404).json({ error: 'Configuration not found' });
        }
        if (error.message === 'Record not found') {
            return res.status(404).json({ error: 'Record not found' });
        }
    }
    res.status(500).json({ error: 'Internal server error' });
}
const PostgreSQLRepositoryFactory_1 = require("../factories/PostgreSQLRepositoryFactory");
const ServiceFactory_1 = require("../factories/ServiceFactory");
// Initialize factories
const repositoryFactory = new PostgreSQLRepositoryFactory_1.PostgreSQLRepositoryFactory();
const serviceFactory = new ServiceFactory_1.ServiceFactory(repositoryFactory);
const dataService = serviceFactory.createDataService();
const getConfigurationData = async (req, res) => {
    try {
        const { configId } = req.params;
        const result = await dataService.getConfigurationData(parseInt(configId));
        res.json(result);
    }
    catch (error) {
        handleError(res, error, 'fetching configuration data');
    }
};
exports.getConfigurationData = getConfigurationData;
const createConfigurationData = async (req, res) => {
    try {
        const { configId } = req.params;
        const recordData = req.body;
        const newRecord = await dataService.createDataRecord(parseInt(configId), recordData);
        res.status(201).json(newRecord);
    }
    catch (error) {
        handleError(res, error, 'creating configuration data');
    }
};
exports.createConfigurationData = createConfigurationData;
const updateConfigurationData = async (req, res) => {
    try {
        const { configId, recordId } = req.params;
        const recordData = req.body;
        const updatedRecord = await dataService.updateDataRecord(parseInt(configId), parseInt(recordId), recordData);
        res.json(updatedRecord);
    }
    catch (error) {
        handleError(res, error, 'updating configuration data');
    }
};
exports.updateConfigurationData = updateConfigurationData;
const deleteConfigurationData = async (req, res) => {
    try {
        const { configId, recordId } = req.params;
        await dataService.deleteDataRecord(parseInt(configId), parseInt(recordId));
        res.status(204).send();
    }
    catch (error) {
        handleError(res, error, 'deleting configuration data');
    }
};
exports.deleteConfigurationData = deleteConfigurationData;
const getConfigurationDataRecord = async (req, res) => {
    try {
        const { configId, recordId } = req.params;
        const record = await dataService.getDataRecord(parseInt(configId), parseInt(recordId));
        res.json(record);
    }
    catch (error) {
        handleError(res, error, 'fetching configuration data record');
    }
};
exports.getConfigurationDataRecord = getConfigurationDataRecord;
