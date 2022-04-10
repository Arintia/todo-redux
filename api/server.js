const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { uid } = require('uid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let todos = [
  {
    id: uid(),
    name: 'todo 1',
    completed: true,
  },
  {
    id: uid(),
    name: 'todo 2',
    completed: false,
  },
  {
    id: uid(),
    name: 'todo 3',
    completed: false,
  },
  {
    id: uid(),
    name: 'todo 4',
    completed: false,
  },
  {
    id: uid(),
    name: 'todo 5',
    completed: false,
  },
];

app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
  const todo = { id: uid(), name: req.body.name, completed: false };
  todos.push(todo);
  return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const completed = Boolean(req.body.completed);
  if (index > -1) {
    todos[index].completed = completed;
  }
  return res.send(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

app.delete('/todos', (req, res) => {
  const newList = todos.filter(todo => !todo.completed);
  todos = newList;
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));