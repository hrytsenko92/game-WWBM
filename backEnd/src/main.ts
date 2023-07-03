import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { router } from './auth/authRouter.js';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/auth', router);

const start = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://gameUser:jTJVEOcpG0SWk8R2@gamedataapi.btxwlgv.mongodb.net/gamedata?retryWrites=true&w=majority'
        );
        app.listen(PORT, () => console.log(`server start on port: ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start() 








// app.get('/', (req, res) => {
//     res.send('this is homepage!!!');
// });

// app.listen(port, () => {
//     console.log(`server is running at port number ${port}`);
// });
