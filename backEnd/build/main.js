import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import { authRouter } from './auth/authRouter.js';
import { optionRouter } from './modules/options/optionRouter.js';
import { gameRouter } from './modules/game/gameRouter.js';
const PORT = process.env.PORT || 5000;
const login = process.env.LOGIN;
const password = process.env.PASSWORD;
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
export const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/option', optionRouter);
app.use('/game', gameRouter);
const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${login}:${password}@gamedataapi.btxwlgv.mongodb.net/gamedata?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log(`server start on port: ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=main.js.map