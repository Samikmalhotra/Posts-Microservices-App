import express from 'express'
import axios from 'axios'

const app = express();

app.use(express.json());

app.post('/events',(req,res)=>{

})

app.listen(4003, ()=>{
  console.log('Moderation listening on 4003');
})