import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts',(req,res)=>{
  res.json(posts);
})

app.post('/events',(req,res)=>{
  const {type,data} = req.body;
  if(type === 'PostCreated'){
    const {id,title} = data;

    posts[id] = {id,title,comments:[]};
  }
  if(type === 'CommentCreated'){
    const {id,content,postId} = data;

    const post = posts[postId];
    post.comments.push({id,content});

  }

  res.send({});
})    

app.listen(4002, () => {
  console.log('Queries listening on port 4002!');
})