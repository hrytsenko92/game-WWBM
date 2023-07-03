import { Router } from 'express';
export const router = Router();
import { AuthController } from './authController.js';
import { check } from 'express-validator';
const controller = new AuthController();

router.post(
    '/registration',
    [
        check('username', 'ім\'я користувача не може бути порожнім').notEmpty(),
        check(
            'password',
            'Пароль має бути довшим 4 та коротшим 10 символів'
        ).isLength({ min: 4, max: 10 }),
    ],
    controller.registration
);
router.post('/login', controller.login);

router.get('/users', controller.getUsers);
