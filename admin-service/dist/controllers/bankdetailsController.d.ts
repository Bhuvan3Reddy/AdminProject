import { Controller } from "tsoa";
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export declare class BankControllertsoa extends Controller {
    BankDetailService: any;
    IBankDetailRepository: any;
    constructor();
    getAllUsers(page?: number, limit?: number, role?: string, isActive?: boolean, search?: string): Promise<ApiResponse<any>>;
}
//# sourceMappingURL=bankdetailsController.d.ts.map