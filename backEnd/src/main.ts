import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { router } from './auth/authRouter.js';
const PORT = process.env.PORT || 5000;
const login = process.env.LOGIN
const password = process.env.PASSWORD

const app = express();
app.use(express.json());
app.use('/auth', router);

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${login}:${password}@gamedataapi.btxwlgv.mongodb.net/gamedata?retryWrites=true&w=majority`
        );
        app.listen(PORT, () => console.log(`server start on port: ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start() 
