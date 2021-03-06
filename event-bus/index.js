import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://post-clusterip-svc:4000/events', event);
  axios.post('http://comments-svc:4001/events', event);
  axios.post('http://query-svc:4002/events', event);
  axios.post('http://moderation-svc:4003/events', event);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.json(events);
});

app.listen(4005, () => {
  console.log('Event Bus is listening on port 4005!');
});
