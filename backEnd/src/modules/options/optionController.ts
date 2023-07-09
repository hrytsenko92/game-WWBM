import jwt from 'jsonwebtoken';
import { User } from '../../auth/User.js';
import { OptionControllerType } from '../../types/allTypes.js';

export type DecodedType = {
    id: string;
    iat: number;
    exp: number;
};
const secret: string = String(process.env.SKEY);

const isTokenValid = (decoded: DecodedType) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
        return false;
    }
    return true;
};

export class OptionController implements OptionControllerType {
    async getUserScore(req: any, res: any) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: 'Необхідно надати токен' });
            }
            try {
                jwt.verify(
                    token,
                    secret,
                    async (err: any, decoded: any): Promise<void> => {
                        if (err) {
                            console.log(err);
                        } else if (isTokenValid(decoded)) {
                            const userScore = await User.findOne(
                                {},
                                'username bestScore'
                            );

                            res.json(userScore);
                        } else {
                            throw new Error('Токен недійсний');
                        }
                    }
                );
            } catch (err) {
                return res
                    .status(401)
                    .json({ message: 'Невірний токен або недостатньо прав' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }

    async updateUserScore(req: any, res: any) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: 'Необхідно надати токен' });
            }
            try {
                jwt.verify(
                    token,
                    secret,
                    async (err: any, decoded: any): Promise<void> => {
                        if (err) {
                            console.log(err);
                        } else if (isTokenValid(decoded)) {
                           const userId = decoded.id;
                           console.log(userId) /// тут

                           const updatedUser = await User.findOneAndUpdate(
                               { _id: userId },
                               { $set: { bestScore: 0 } },
                               { new: true }
                           );


                            // res.json(userScore);
                        } else {
                            throw new Error('Токен недійсний');
                        }
                    }
                );
            } catch (err) {
                return res
                    .status(401)
                    .json({ message: 'Невірний токен або недостатньо прав' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }

    async getAllUsersScore(req: any, res: any) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: 'Необхідно надати токен' });
            }
            try {
                jwt.verify(
                    token,
                    secret,
                    async (err: any, decoded: any): Promise<void> => {
                        if (err) {
                            console.log(err);
                        } else if (isTokenValid(decoded)) {
                            const users = await User.find(
                                {},
                                'username bestScore'
                            ).sort({ bestScore: -1 });

                            res.json(users);
                        } else {
                            throw new Error('Токен недійсний');
                        }
                    }
                );
            } catch (err) {
                return res
                    .status(401)
                    .json({ message: 'Невірний токен або недостатньо прав' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
}
