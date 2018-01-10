var { DB_HOST, DB_NAME, DB_USER } = process.env;
var knex = require('knex')({
  client: 'mysql',
  debug: true,
  connection: {
    host: 'localhost',
    database: 'nodetuts',
    user: 'root',
  },
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
