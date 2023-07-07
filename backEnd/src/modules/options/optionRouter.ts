import { Router } from 'express';
export const optionRouter = Router();
import { OptionController } from './optionController.js';
const controller = new OptionController();

// optionRouter.post('/registration',controller.registration);
// optionRouter.post('/login', controller.login);

optionRouter.get('/allscore', controller.getAllUsersScore);
