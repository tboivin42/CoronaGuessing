const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10;

const hashPassword = password => bcrypt.hash(password, SALT_ROUNDS)

const arePasswordsEquals = (password, hash) => bcrypt.compare(password, hash)

module.exports.hashPassword = hashPassword;
module.exports.arePasswordsEquals = arePasswordsEquals;
