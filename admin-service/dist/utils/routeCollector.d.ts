import { Application } from 'express';
interface RouteInfo {
    summary: string;
    description: string;
    tags: string[];
    requestBody?: any;
    responses?: any;
}
export default class RouteCollector {
    private app;
    private routes;
    constructor(app: Application);
    post(path: string, routeInfo: RouteInfo, handler: any): void;
    get(path: string, routeInfo: RouteInfo, handler: any): void;
    put(path: string, routeInfo: RouteInfo, handler: any): void;
    delete(path: string, routeInfo: RouteInfo, handler: any): void;
    generateSwagger(): void;
}
export {};
//# sourceMappingURL=routeCollector.d.ts.map