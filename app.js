var express = require('express'),
	fs = require('fs'),
	path = require('path'),
	app = express();

// set view engine
app.engine('hbs', require('express-handlebars')({ defaultLayout: 'master', extname: 'hbs' }));
app.set('view engine', 'hbs');

// set configs
app.set('port', 3000);

// static
app.use(express.static(path.join(__dirname, '/build')));

// page object
var page = {
	title: 'Ping Pong',
	scripts: ['/app.js'],
	guiLayouts: []
};

var partialLayoutsPath = path.join(__dirname, 'views/partials');
fs.readdirSync(partialLayoutsPath).forEach(function (partialFilename) {
	page.guiLayouts.push({
		id: partialFilename.substring(0, partialFilename.length - 4),
		layout: fs.readFileSync(path.join(partialLayoutsPath, partialFilename), 'utf-8')
	});
});

// routes
app.get('/', function (req, res) {
	res.render('index', page);
});

// listen
app.listen(app.get('port'), function () {
	console.log('Listening on port ' + app.get('port'));
});