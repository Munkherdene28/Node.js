import express from 'express'
import bp from 'body-parser'
import mongoose from 'mongoose';
import Url from './schema/Url.js'

const port = 8000;
const MONGODB_URL = 'mongodb+srv://munkherdene28:MongoDB12@cluster0.ha9qx3q.mongodb.net/?retryWrites=true&w=majority';
const app = express();
app.use(bp.json());

// let users = [
//   {
//     id: 1,
//     name: "orgil"
//   },
//   {
//     id: 2,
//     name: "naki"
//   },
//   {
//     id: 3,
//     name: "munkherdene"
//   }
// ]

app.get('/', async (req, res) => {
  const rest = await Url.find();
  res.send({ success: true, rest }).end();
});

// app.get('/:id', (req, res) => {
//   const id = req.params.id;
//   const filteredData = users.filter((user) => user.id === parseInt(id));
//   res.send({ success: true, users: filteredData }).end();
// });

app.post('/', async (req, res) => {
  const newUrl = await Url.create(req.body);
  // const data = req.body;
  // users.push(data);
  res.send({ success: true, urls: newUrl }).end();
});

// app.put('/:id', (req, res) => {
//   const id = req.params.id;

//   users.map((user) => {
//     if (user.id === parseInt(id)) {
//       console.log(id);
//       user.name = req.body.name
//     }
//   });
//   res.send({ success: true, users: users }).end();
// });

// app.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   const deletedUserId = users.findIndex((user) => user.id === parseInt(id));

//   if (deletedUserId !== -1) {
//     users.splice(deletedUserId, 1)
//   }
//   res.send({ success: true, users: users }).end();
// });

app.listen(port, async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('DB connection success');
  } catch (error) {
    console.log(error);
  }
  console.log('SERVER Running');
});
