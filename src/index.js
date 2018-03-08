import express from 'express';
import db from './db';
import router from './routes';
import parser from 'body-parser';
import cors from 'cors';

const PORT = process.env.PORT
const app = express();

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use('/api', router);

app.listen(PORT, ()=>{
  console.log('Gighub-Api is listening on PORT:', PORT);
})