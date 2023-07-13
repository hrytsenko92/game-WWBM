import { Router } from 'express';
export const gameRouter = Router();
import { GameController } from './gameController.js';
const controller = new GameController();

gameRouter.get('/getquestion', controller.getQuestion);
gameRouter.put('/updateuserdata', controller.updateUserData);

