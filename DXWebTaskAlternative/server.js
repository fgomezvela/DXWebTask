//The required node modules

var express 	= require('express');
var app 		= express();
var mongoose 	= require('mongoose');

// The connection with mongoDB. It is important to configure the port of the database
mongoose.connect('mongodb://localhost:27017/angular-todo');

// Model definition
var Todo = mongoose.model('Todo', {
	text: String
});

// Configuration
app.configure(function() {
	app.use(express.static(__dirname + '/public'));		
	app.use(express.logger('dev'));						
	app.use(express.bodyParser());						
	app.use(express.methodOverride());					
});

//The RESTFul Api in node
//The GET Method
app.get('/api/todos', function(req, res) {				
	Todo.find(function(err, todos) {
		if(err) {
			res.send(err);
		}
		res.json(todos);
	});
});
//The POST Method
app.post('/api/todos', function(req, res) {				
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err) {
			res.send(err);
		}

		Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	});
});
//The DELETE Method, this method will delete any task we select from the list
app.delete('/api/todos/:todo', function(req, res) {		
	Todo.remove({
		_id: req.params.todo
	}, function(err, todo) {
		if(err){
			res.send(err);
		}

		Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			res.json(todos);
		});

	})
});
//To load our wellcome page
app.get('*', function(req, res) {						
	res.sendFile('./public/index.html');				
});

// Listening and running the server. The port could be change.
app.listen(8080, function() {
	console.log('App listening on port 8080');
});

