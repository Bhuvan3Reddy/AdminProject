"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./models/database"));
const configurationRoutes_1 = require("./routes/configurationRoutes");
const dataRoutes_1 = require("./routes/dataRoutes");
const swagger_static_1 = require("./utils/swagger-static");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
    credentials: true
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// API documentation
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_static_1.swaggerSpec));
// Routes
app.use('/api/configurations', configurationRoutes_1.configurationRoutes);
app.use('/api', dataRoutes_1.dataRoutes);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Something went wrong!' });
});
// Database connection and server startup
const startServer = async () => {
    try {
        await database_1.default.authenticate();
        // Don't sync in production - use migrations instead
        if (process.env.NODE_ENV !== 'production') {
            await database_1.default.sync({ alter: true });
        }
        app.listen(PORT, () => {
            // Server started successfully
        });
    }
    catch (error) {
        process.exit(1);
    }
};
startServer();
exports.default = app;
