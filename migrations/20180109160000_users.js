exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.createTable('users', function(table){
    	table.integer('id').primary();
    	table.string('username');
    	table.string('password');
    	table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};