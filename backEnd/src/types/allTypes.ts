export interface AuthControllerType {
    registration(req: any, res: any): Promise<void>;
    login(req: any, res: any): Promise<void>;
}

export interface OptionControllerType {
    getUserScore(req: any, res: any): Promise<void>;
    getAllUsersScore(req: any, res: any): Promise<void>;
    resetUserScore(req: any, res: any): Promise<void>;
    updateUserScore(req: any, res: any): Promise<void>;
}

export interface GameControllerType {
    getQuestion(req: any, res: any): Promise<void>;
    updateUserData(req: any, res: any): Promise<void>;
}

export interface QuestionType {
    _id: string;
    complexity: number;
    qData: QDatum[];
}

export interface QDatum {
    _id: string;
    id: string;
    question: string;
    answers: Answer[];
}

export interface Answer {
    _id: string;
    answer: string;
    isTrue: boolean;
}