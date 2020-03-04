const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./controllers/user')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: false,
    }))
app.use(cors())

app.post('/add', user.addUser)
  .post('/login', user.login)
  .get('/users', user.getAllUsers)
  .get('/user/:id', user.getUserById)
  .put('/user/:id', user.updateUser)
  .delete('/user/:id', user.deleteUser)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
