var bookshelf = require('./bookshelf');

var Invoices = bookshelf.Model.extend({
   tableName: 'invoices',
});

module.exports = Invoices;