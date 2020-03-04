const Users = require('./mongodb/index');
const dataJSON = require('./data.json');


  const { users } = dataJSON;

  users.map((data) => {
    const user = new Users(data); // Initialize a model with users data
    user.save(); // and save it into the database
  });
