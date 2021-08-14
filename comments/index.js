import express from 'express'
import cors from 'cors'
import {v4 as uuidv4} from 'uuid'

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.json(commentsByPostId[req.params.id] || []);
})
app.post('/posts/:id/comments', (req, res) => {
 const commentId = uuidv4();
 const {content} = req.body;

 const comments = commentsByPostId[req.params.id] || [];

 comments.push({id: commentId, content});

 commentsByPostId[req.params.id] = comments;

 res.status(201).json(comments);
})
app.listen(4001, () => {
  console.log('Comments listening on port 4001!');
})