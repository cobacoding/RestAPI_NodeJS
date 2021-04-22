'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'NodeJS'
      },
      {
        name: 'VueJS'
      },
      {
        name: 'ReactJS'
      },
      {
        name: 'Flutter'
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {})
  }
}
