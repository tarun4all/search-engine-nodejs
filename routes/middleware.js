const _ = require('lodash');
const requestIp = require('request-ip');
const fetch = require('node-fetch');
// const Blocked_IP = require('keystone').list('Blocked_IP').model;
const keystone = require('keystone');
const maxScoreAllowed = 0.995;


exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	const flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};

/**
	fetch user's ip address and append it to req
 */
exports.getIP = function (req, res, next) {
	req.clientIp = requestIp.getClientIp(req);
    next();
};

exports.checkForCountry = function (req, res, next) {
	let geolocationApi = "";
	if (process.env.ENVIRONMENT === "dev")
		geolocationApi = "https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.GEO_LOCATION_API_Key + "&ip=" + process.env.US_IP;
	else
	geolocationApi = "https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.GEO_LOCATION_API_Key + "&ip=" + req.clientIp;
	// console.log(geolocationApi);
	fetch(geolocationApi)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			console.log('country Name', data.country_name, 'contry code2', data.country_code2, 'countryCode3', data.country_code3);
			if (data.country_name === "United States" || data.country_code2 === "US" || data.country_code3 === "USA") {
				next();
			}
			else{
				res.status(404).send('Page not available');
			}
		})
		.catch(function (error) {
			console.log('requestFailed', error);
		});

};

exports.checkForProxy = function (req, res, next) {
	let emailId = process.env.EMAIL_ID;
	let ProxyReq = "http://check.getipintel.net/check.php?ip=" + req.ip + "&contact=" + emailId;
	fetch(ProxyReq)
		.then(function(response) {
			return response.json()
		})
		.then(function(data) {
			if(data<maxScoreAllowed) next();
			else res.status(404).send('Page not available');
		})
		.catch(function(error) {
			console.log('Request failed', error);
		});
};

exports.checkIfBlocked = async function (req, res, next) {
	let Blocked_IP = keystone.list('Blocked_IP').model;
	let isBlocked = false;
	isBlocked = await Blocked_IP.findOne({IP: req.clientIp}).catch(err => {console.log(err)});

	if(isBlocked) res.status(404).send('Page not available');
	else next();
};

exports.addIPAddressToDB = async function (req, res, next) {
	console.log('aa');
	let Incoming_IP = keystone.list('Incoming_IP').model;
	console.log(req.clientIp);

	let incomingIp = new Incoming_IP({
		IP: req.clientIp,
		url: req.url,
	});
	await incomingIp.save();
	console.log('>>>',incomingIp);
	next();
};