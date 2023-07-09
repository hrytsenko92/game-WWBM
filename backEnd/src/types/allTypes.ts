export interface AuthControllerType {
    registration(req: any, res: any): Promise<void>;
    login(req: any, res: any): Promise<void>;
    getUsers(req: any, res: any): Promise<void>;
}

export interface OptionControllerType {
    getUserScore(req: any, res: any): Promise<void>;
    getAllUsersScore(req: any, res: any): Promise<void>;
}