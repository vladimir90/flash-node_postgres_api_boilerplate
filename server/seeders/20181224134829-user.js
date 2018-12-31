'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John ',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        password: bcrypt.hashSync("password", 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
