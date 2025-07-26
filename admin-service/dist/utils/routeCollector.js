"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
class RouteCollector {
    app;
    routes = [];
    constructor(app) {
        this.app = app;
    }
    post(path, routeInfo, handler) {
        this.routes.push({
            path,
            method: 'post',
            ...routeInfo,
        });
        this.app.post(path, handler);
    }
    get(path, routeInfo, handler) {
        this.routes.push({
            path,
            method: 'get',
            ...routeInfo,
        });
        this.app.get(path, handler);
    }
    put(path, routeInfo, handler) {
        this.routes.push({
            path,
            method: 'put',
            ...routeInfo,
        });
        this.app.put(path, handler);
    }
    delete(path, routeInfo, handler) {
        this.routes.push({
            path,
            method: 'delete',
            ...routeInfo,
        });
        this.app.delete(path, handler);
    }
    generateSwagger() {
        // Build paths object from collected routes
        const paths = {};
        this.routes.forEach(route => {
            if (!paths[route.path]) {
                paths[route.path] = {};
            }
            paths[route.path][route.method] = {
                summary: route.summary,
                description: route.description,
                tags: route.tags,
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] }
                ],
                ...(route.requestBody && { requestBody: route.requestBody }),
                responses: route.responses || {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object'
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Unauthorized'
                    },
                    500: {
                        description: 'Internal Server Error'
                    }
                }
            };
        });
        const swaggerSpec = {
            openapi: '3.0.0',
            info: {
                title: 'Admin Service API',
                version: '1.0.0',
                description: 'API for managing master configuration data',
            },
            servers: [
                {
                    url: 'http://localhost:3002',
                    description: 'Development server',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                    cookieAuth: {
                        type: 'apiKey',
                        in: 'cookie',
                        name: 'auth_token',
                    },
                },
            },
            paths
        };
        this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    }
}
exports.default = RouteCollector;
