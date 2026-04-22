import express from 'express';
import cors from 'cors';
import user from './user-service.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  /* if (name != undefined && job != undefined) {
    let result = user
      .findUserByName(name, job)
      .then((result) => result)
      .catch((err) => console.log(err));
    res.send(result);
  } else {
    res.send(users);
  } */
 user.getUsers(name, job)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err);
      res.status(404).send(err.message);
    });
});

app.get('/users/:id', (req, res) => {
  const id = req.params['id']; //or req.params.id
  user
    .findUserById(id)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err);
      res.status(404).send(err.message);
    });
});

app.post('/users', (req, res) => {
  const userToAdd = req.body;
  user
    .addUser(userToAdd)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(406).send(err.message);
    });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params['id'];
  user
    .deleteById(id)
    .then((result) => res.status(204).send(result))
    .catch((err) => {
      console.log(err);
      res.status(404).send('Resource not found.');
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
