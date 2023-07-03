import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.PORT)

app.get('/', (req, res) => {
    res.send('this is homepage!11!!');
});

app.listen(port, () => {
    console.log(`server is running at port number ${port}`);
});
