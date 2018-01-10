var express = require('express');
var Users = require('./users');
var Invoices = require('./invoices');
var Items = require('./items');

var app = express();
var PORT = 5010;

app.get('/', function(req, res){
	res.json({ message : " API OK!"});
});
app.get('/api/', function(req, res){
	res.json({ message : " API OK!"});
});

app.get('/api/invoices/', function(req, res){
	// res.json(obj);
	Invoices.fetchAll().then(function(result){
		res.json(result.toJSON());
	});
})

app.get('/api/items/:id', function(req, res){
	// res.json(obj);
	Items.where({ invoice_id : req.params.id}).fetchAll().then(function(result){
		res.json(result.toJSON());
	});
})


// app.get('/api/users/:id', function(req, res){
// 	console.log(req.params.id);
// 	const obj = JSON.parse(req.params.id);
// 	// res.json(obj);
// 	Users.where({id: obj.id , username: obj.name}).fetchAll().then(function(result){
// 		res.json(result.toJSON());
// 	});
// })

app.get('/api/invoices/add/:id', function(req,res) // id = { id: ,name: }
{
	const obj = JSON.parse(req.params.id);
	Invoices.forge().save({id : obj.id, name : obj.name, total : 0});
});

app.get('/api/items/add/:id', function(req,res) // id = { id: ,invoice_id: ,name: ,rate: ,hrs,total}
{
	const obj = JSON.parse(req.params.id);
	Items.forge().save({id : obj.id,invoice_id: obj.invoice_id, name : obj.name, rate : obj.rate, hrs : obj.hrs, total : obj.total});
});


app.get('/api/items/edit/:id', function(req,res) // id = { id: , name : , rate: ,hrs: , total:  }
{
	const obj = JSON.parse(req.params.id);
	Items.forge({id : obj.id}).save({name : obj.name, rate : obj.rate, hrs: obj.hrs,total: obj.total});
	res.json({message : "Hi. I am Ok"});
});

app.get('/api/invoices/edit/:id', function(req,res) // id = { id: , name : ,  total:  }
{
	const obj = JSON.parse(req.params.id);
	Invoices.forge({id : obj.id}).save({name : obj.name, total: obj.total});
	res.json({message : "Hi. I am still Ok"});
});

app.get('/api/users/delete/:id', function(req,res)
{
	//const obj = JSON.parse(req.params.id);
	Users.where({id : req.params.id}).destroy();
});

app.get('/api/invoices/delete/:id', function(req,res)
{
	//const obj = JSON.parse(req.params.id);
	Invoices.where({id : req.params.id}).destroy();
	Items.where({invoice_id : req.params.id}).destroy();
});

app.get('/api/items/delete/:id', function(req,res)
{
	//const obj = JSON.parse(req.params.id);
	Items.where({id : req.params.id}).destroy();
});

// app.post('/users', function(req, res){
// 	new Users({username: req.body.username}).save().then(function(result){
// 		res.json(result.toJSON());
// 	})
// })

app.listen(PORT, function(){
	console.log('Liteningn at port : ', PORT);
})
