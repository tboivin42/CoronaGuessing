const User = require('./mongodb/index');
const dataJSON = require('./data.json');


  const { users } = dataJSON;

  users.map((data) => {
    const game = new User(data); // Initialize a model with games data
    game.save(); // and save it into the database
  });
