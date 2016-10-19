// Loading the require modules
var express = require('express'),
	app = express(),
	cons = require('consolidate');

// Loading and setting up the engine
app.engine('html', cons.swing);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Registering the bodyParser middleware to process before app.router
app.use(express.bodyParser());
app.use(app.router);

// Handler for internal server errors
function errorHandler(err, req, res, next) {
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function(req, res, next) {
	res.render('movie_form');
});

app.post('/submited_movie', function(req, res, next) {
	if(req.body.title == '' || req.body.year == '' || req.body.imdb == '') {
		next(Error('Please fill all the fields!'));
	}
	else {
		res.render('submited_movie');
	}
});

app.listen(3000);
console.log('Express server listening on port 3000');