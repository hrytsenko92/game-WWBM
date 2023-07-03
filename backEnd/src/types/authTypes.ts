export interface AuthControllerType {
    registration(req: any, res: any): Promise<void>;
    login(req: any, res: any): Promise<void>;
    getUsers(req: any, res: any): Promise<void>;
}
