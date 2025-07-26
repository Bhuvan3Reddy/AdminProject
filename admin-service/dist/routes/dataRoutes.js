"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controllers/dataController");
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
exports.dataRoutes = router;
// Apply authentication middleware to all routes
router.use(auth_1.authenticateHybrid);
// Dynamic data routes
router.get('/configurations/:configId/data', dataController_1.getConfigurationData);
router.post('/configurations/:configId/data', dataController_1.createConfigurationData);
router.get('/configurations/:configId/data/:recordId', dataController_1.getConfigurationDataRecord);
router.put('/configurations/:configId/data/:recordId', dataController_1.updateConfigurationData);
router.delete('/configurations/:configId/data/:recordId', dataController_1.deleteConfigurationData);
