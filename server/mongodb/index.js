const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/corona', { useNewUrlParser: true })

const Connection = mongoose.connection;

Connection.on('connected', () => {
  console.log('Connected to db');
})

Connection.on('disconnected', () => {
  console.log('disconnected to db');
})

Connection.on('error', (err) => {
  console.log('db connection error', err);
})

process.on('SIGINT', () => {
  Connection.close(() => {
    console.log('db connection closed due to process termination')
    process.exit(0)
  })
})

const UserSchema = new mongoose.Schema({
  login: {
    type: String, required: true, unique: true, max: 100,
  },
  mail: {
    type: String, required: true, unique: true, max: 100,
  },
  password: { type: String, required: true, max: 100 
  },
  infected: { type: Boolean, required: true }
})

module.exports = mongoose.model('Users', UserSchema)
