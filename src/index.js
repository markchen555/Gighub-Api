import express from 'express';
import db from './db';

const PORT = process.env.PORT
const app = express();

app.listen(PORT, ()=>{
  console.log('Gighub-Api is listening on PORT:', PORT);
})