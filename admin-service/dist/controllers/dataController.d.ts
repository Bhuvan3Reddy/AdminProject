import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    user?: any;
}
export declare const getConfigurationData: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const createConfigurationData: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const updateConfigurationData: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const deleteConfigurationData: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const getConfigurationDataRecord: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=dataController.d.ts.map