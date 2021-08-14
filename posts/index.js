import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
})

app.post('/posts', (req, res) => {
  const id = uuidv4();
  const {title} = req.body;
  posts[id] = {
    id,title
  }
  res.status(200).json(posts[id]);
})

app.listen(4000, () => {
  console.log('Posts listening on port 4000!');
})