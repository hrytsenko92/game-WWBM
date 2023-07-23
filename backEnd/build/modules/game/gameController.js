import jwt from 'jsonwebtoken';
import { User } from '../../auth/User.js';
import { QuizHandler } from './questionsSchema.js';
const secret = String(process.env.SKEY);
const isTokenValid = (decoded) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
        return false;
    }
    return true;
};
export class GameController {
    async getQuestion(req, res) {
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
                        const complexity = Number(req.headers.complexity);
                        if (!complexity) {
                            return res.status(400).json({
                                message: 'Необхідно надати complexity в req.headers',
                            });
                        }
                        const prevDataID = user.prevDataID;
                        const hasC1q12 = prevDataID.includes('c1q12');
                        if (hasC1q12) {
                            user.prevDataID.splice(0, prevDataID.length);
                            await user.save();
                        }
                        const quiz = await QuizHandler(complexity).findOne({
                            complexity: complexity,
                        });
                        if (!quiz) {
                            return res.status(404).json({
                                message: 'Елемент колекції не знайдено',
                            });
                        }
                        const getNextQuestion = (quiz, prevDataID) => {
                            if (quiz) {
                                const remainingQuestions = quiz.qData.filter((question) => !prevDataID.includes(question.id));
                                return remainingQuestions.length > 0
                                    ? remainingQuestions[0]
                                    : null;
                            }
                        };
                        const nextQuestion = getNextQuestion(quiz, prevDataID);
                        res.status(200).json({ nextQuestion });
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
    async updateUserData(req, res) {
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
                        const idFromBody = req.body.id;
                        if (!idFromBody) {
                            return res.status(400).json({
                                message: 'Необхідно надати ID в req.body',
                            });
                        }
                        user.prevDataID.push(idFromBody);
                        await user.save();
                        res.json({ isDataUpdated: true });
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
//# sourceMappingURL=gameController.js.map