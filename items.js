var bookshelf = require('./bookshelf');

var Items = bookshelf.Model.extend({
   tableName: 'items',
});

module.exports = Items;