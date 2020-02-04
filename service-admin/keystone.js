// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
const keystone = require('keystone');
const handlebars = require('express-handlebars');
const fs = require('fs');
const {join} = require('path');

const addSafeReadOnlyGlobal = (prop, val) => {
	console.log('[FRAMEWORK]'.bold.yellow, `Exporting safely '${prop.bold}' from ${this.constructor.name}`.cyan);
	Object.defineProperty(global, prop, {
		get: function () {
			return val;
		},
		set: function () {
			console.log('You are trying to set the READONLY GLOBAL variable `', prop, '`. This is not permitted. Ignored!');
		}
	});
};

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
keystone.init({
	'name': 'Search engine',
	'brand': 'Search engine',
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',
	'admin path': 'admin',
	'adminui custom styles': './public/styles/keystone.less',
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new (require('./templates/views/helpers'))(),
		extname: '.hbs',
	}).engine,
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	enquiries: 'enquiries',
	users: ['users'],
});

//load all services
let services = {};
try {
	console.log('path is ', join(__dirname, '/services'));
	let list = fs.readdirSync(join(__dirname, '/services'));
	list.forEach(item => {
		if (item.search(/.js$/) !== -1) {
			let name = item.toString().replace(/\.js$/, '');
			console.log('[FRAMEWORK]', `Loading Service: '${name}'`);
			services[name] = new (require(join(__dirname, '/services', name)));
		}
	});
	addSafeReadOnlyGlobal('services', services.searchService);
} catch (err) {
	console.log(err);
}

(async function(){
	console.log('hi');
	// let data = await services.searchService.search('test').catch((err) => {console.log("error occures")});
	let data = [];
	let adv = await services.advCampaignService.getAdvCampaign('test').catch((err)=> {console.log(err);});
	if(adv) data.push(adv);
	console.log('>>>',adv);
})()

// Start Keystone to connect to your database and initialise the web server
keystone.start();
