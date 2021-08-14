import express from 'express'
import cors from 'cors'


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(4001, () => {
  console.log('Comments listening on port 4001!');
})