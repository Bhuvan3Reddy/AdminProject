"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const configurationController_1 = require("../controllers/configurationController");
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
exports.configurationRoutes = router;
// Apply authentication middleware to all routes
router.use(auth_1.authenticateHybrid);
// Configuration metadata routes
router.get('/', configurationController_1.getAllConfigurations);
router.post('/', configurationController_1.createConfiguration);
router.get('/:id', configurationController_1.getConfigurationById);
router.put('/:id', configurationController_1.updateConfiguration);
router.delete('/:id', configurationController_1.deleteConfiguration);
