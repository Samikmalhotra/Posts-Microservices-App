import express from 'express'
import cors from 'cors'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios';

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.json(commentsByPostId[req.params.id] || []);
})
app.post('/posts/:id/comments', async(req, res) => {
 const commentId = uuidv4();
 const {content} = req.body;

 const comments = commentsByPostId[req.params.id] || [];

 comments.push({id: commentId, content, status: 'pending'});

 commentsByPostId[req.params.id] = comments;

 await axios.post('http://localhost:4005/events', {
   type: 'CommentCreated',
   data:{
     id: commentId,
     content,
     postId: req.params.id,
     status: 'pending'
   }
 })


 res.status(201).json(comments);
})

app.post('/events', (req,res)=>{
  console.log('Recieved Event', req.body.type);
  res.status(200).send({});
})
app.listen(4001, () => {
  console.log('Comments listening on port 4001!');
})