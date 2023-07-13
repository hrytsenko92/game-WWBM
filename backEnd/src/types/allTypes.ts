export interface AuthControllerType {
    registration(req: any, res: any): Promise<void>;
    login(req: any, res: any): Promise<void>;
}

export interface OptionControllerType {
    getUserScore(req: any, res: any): Promise<void>;
    getAllUsersScore(req: any, res: any): Promise<void>;
    resetUserScore(req: any, res: any): Promise<void>;
}

export interface GameControllerType {
    getQuestion(req: any, res: any): Promise<void>;
    updateUserData(req: any, res: any): Promise<void>;
}