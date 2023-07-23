import jwt from 'jsonwebtoken';
import { User } from '../../auth/User.js';
const secret = String(process.env.SKEY);
const isTokenValid = (decoded) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
        return false;
    }
    return true;
};
export class OptionController {
    async getUserScore(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: 'Необхідно надати токен' });
            }
            try {
                jwt.verify(token, secret, async (err, decoded) => {
                    if (err) {
                        console.log(err);
                    }
                    else if (isTokenValid(decoded)) {
                        const user = await User.findById(decoded.id);
                        if (!user) {
                            return res.status(404).json({
                                message: 'Користувача не знайдено',
                            });
                        }
                        const userScore = await User.findOne(user._id, 'username bestScore');
                        res.json(userScore);
                    }
                    else {
                        throw new Error('Токен недійсний');
                    }
                });
            }
            catch (err) {
                return res
                    .status(401)
                    .json({ message: 'Невірний токен або недостатньо прав' });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
    async getAllUsersScore(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: 'Необхідно надати токен' });
            }
            try {
                jwt.verify(token, secret, async (err, decoded) => {
                    if (err) {
                        console.log(err);
                    }
                    else if (isTokenValid(decoded)) {
                        const users = await User.find({}, 'username bestScore').sort({ bestScore: -1 });
                        res.json(users);
                    }
                    else {
                        throw new Error('Токен недійсний');
                    }
                });
            }
            catch (err) {
                return res
                    .status(401)
                    .json({ message: 'Невірний токен або недостатньо прав' });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
    async resetUserScore(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: 'Необхідно надати токен' });
            }
            try {
                jwt.verify(token, secret, async (err, decoded) => {
                    if (err) {
                        console.log(err);
                    }
                    else if (isTokenValid(decoded)) {
                        const user = await User.findById(decoded.id);
                        if (!user) {
                            return res.status(404).json({
                                message: 'Користувача не знайдено',
                            });
                        }
                        await User.findByIdAndUpdate(user._id, { bestScore: 0 }, { new: true });
                        res.json({
                            isScoreReset: true,
                        });
                    }
                    else {
                        throw new Error('Токен недійсний');
                    }
                });
            }
            catch (err) {
                return res
                    .status(401)
                    .json({ message: 'Невірний токен або недостатньо прав' });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
    async updateUserScore(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: 'Необхідно надати токен' });
            }
            try {
                jwt.verify(token, secret, async (err, decoded) => {
                    if (err) {
                        console.log(err);
                    }
                    else if (isTokenValid(decoded)) {
                        const user = await User.findById(decoded.id);
                        if (!user) {
                            return res.status(404).json({
                                message: 'Користувача не знайдено',
                            });
                        }
                        const bestScoreFromBody = req.body.bestScore;
                        if (!bestScoreFromBody) {
                            return res.status(400).json({
                                message: 'Необхідно надати bestScore в req.body',
                            });
                        }
                        if (bestScoreFromBody > user.bestScore) {
                            user.bestScore = bestScoreFromBody;
                            await user.save();
                            res.json({ updated: true });
                        }
                        else {
                            res.json({ updated: false });
                        }
                    }
                    else {
                        throw new Error('Токен недійсний');
                    }
                });
            }
            catch (err) {
                return res
                    .status(401)
                    .json({ message: 'Невірний токен або недостатньо прав' });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
}
//# sourceMappingURL=optionController.js.map