import express from 'express'
import axios from 'axios';

const app = express();

app.use(express.json());

app.post('/events', async(req,res)=>{
    let event = req.body;
    console.log(event);
    await axios.post('http://localhost:4000/events', event)
    await axios.post('http://localhost:4001/events', event)
    await axios.post('http://localhost:4002/events', event)

    res.json({status: 'OK'});
})



app.listen(4005, () => {
    console.log('Event Bus is listening on port 4005!');
})