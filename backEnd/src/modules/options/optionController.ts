


import { User } from '../../auth/User.js';
import { OptionControllerType } from '../../types/allTypes.js';

export class OptionController implements OptionControllerType {
    async registration(req: any, res: any): Promise<void> {
        // try {
        //     const errors = validationResult(req);
        //     if (!errors.isEmpty()) {
        //         return res
        //             .status(400)
        //             .json({ message: 'Помилка під час реєстрації', errors });
        //     }
        //     const { username, password } = req.body;
        //     const candidate = await User.findOne({ username });
        //     if (candidate) {
        //         return res.status(400).json({
        //             message: 'Користувач під такий іменем вже зареєстрований',
        //         });
        //     }
        //     const hashPassword = bcrypt.hashSync(password, 7);
        //     const user = new User({
        //         username,
        //         password: hashPassword,
        //     });
        //     await user.save();
        //     return res.json({
        //         hasAccount: true,
        //     });
        // } catch (e) {
        //     console.log(e);
        //     res.status(400).json({ message: 'Помилка під час реєстрації' });
        // }
    }

    async login(req: any, res: any): Promise<void> {
        // try {
        //     const { username, password } = req.body;
        //     const user = await User.findOne({ username });
        //     if (!user) {
        //         return res
        //             .status(400)
        //             .json({ message: `Користувач ${username} не знайдений` });
        //     }
        //     const validPassword = bcrypt.compareSync(password, user.password);
        //     if (!validPassword) {
        //         return res
        //             .status(400)
        //             .json({ message: `Введений не правильний пароль` });
        //     }
        //     const token = generateAccessToken(user._id);
        //     console.log(user._id);
        //     return res.json({ token });
        // } catch (e) {
        //     console.log(e);
        //     res.status(400).json({ message: 'Помилка входу' });
        // }
    }

    async getAllUsersScore(req: any, res: any): Promise<void> {
        try {
            const users = await User.find({}, 'username bestScore');
            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }
}
