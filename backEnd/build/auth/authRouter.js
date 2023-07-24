import { Router } from 'express';
export const authRouter = Router();
import { AuthController } from './authController.js';
import { check } from 'express-validator';
const controller = new AuthController();
authRouter.post('/registration', [
    check('username', "ім'я користувача не може бути порожнім").notEmpty(),
    check('password', 'Пароль має бути довшим 4 та коротшим 10 символів').isLength({ min: 4, max: 10 }),
], controller.registration);
authRouter.post('/login', controller.login);
//# sourceMappingURL=authRouter.js.map