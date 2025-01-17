const Joi = require('joi')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const joiSchema = require('../validators')
const crypto = require('../security/passwordCrypt')
const User = require('../mongodb')

const addUser = (req, res) => {
  const user = req.body;

  const { error } = Joi.validate(user, joiSchema.createValidator, { abortEarly: false })
  if (error) {
    return res
      .status(200)
      .send(error.details.reduce(
        (accu, value) => ({
          ...accu,
          [value.path[0]]: value.message,
        }),
        {},
      ))
  }

  return crypto.hashPassword(user.password)
    .then((hash) => {
      const newUser = new User({ ...user, password: hash });
      newUser.save();
      res.send(_.omit(newUser._doc, ['password']));
    })
}

const getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err)
    } else {
      res.send(users)
    }
  })
}

const getUserById = (req, res) => {
  const { id: userId } = req.params;
  User.findById(userId)
    .exec()
    .then(user => res.send(_.omit(user._doc, ['password'])))
    .catch(() => res.status(404).send({ message: 'User not found' }))
}

const updateUser = (req, res) => {
  const { id: userId } = req.params;
  const userInput = req.body;

  console.log('HEY BEBE')

  User.findByIdAndUpdate(userId, userInput, { new: true })
    .exec()
    .then(() => res.send({ message: 'User updated' }))
    .catch(() => res.status(500).send({ message: 'An error occurred' }))
}
const deleteUser = (req, res) => {
  const { id: userId } = req.params;

  console.log('coucou toi')

  User.findByIdAndRemove(userId)
    .exec()
    .then(() => res.send({ message: 'User deleted' }))
    .catch(() => res.status(500).send({ message: 'An error occured' }))
}

const login = (req, res) => {
  const { email: userMail, password: userPassword } = req.body;

  const privateKey = 'private';
  User.findOne({ mail: userMail })
    .exec()
    .then(user => crypto.arePasswordsEquals(userPassword, user.password)
      .then((isCompare) => {
        if (isCompare) {
          const token = jwt.sign({ sub: user._id }, privateKey, { expiresIn: '30m' }, { algorithm: 'HS256'})
          console.log(user)
          res.json(({ success: true, token: `JWT ${token}`, user }))
        } else {
          res.status(401).send({ message: 'Invalid identification' })
        }
      }))
}

module.exports.addUser = addUser;
module.exports.getUserById = getUserById;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.login = login;
module.exports.getAllUsers = getAllUsers;
