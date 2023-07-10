import { Router } from 'express';
export const optionRouter = Router();
import { OptionController } from './optionController.js';
const controller = new OptionController();

optionRouter.get('/allscore', controller.getAllUsersScore);
optionRouter.get('/userscore', controller.getUserScore);
optionRouter.get('/resetuserscore', controller.resetUserScore);
