const _ = require('lodash');
const requestIp = require('request-ip');
const fetch = require('node-fetch');
const keystone = require('keystone');
const path = require('path');
const maxScoreAllowed = 0.995;
let Blocked_IP = keystone.list('Blocked_IP').model;
let Incoming_IP = keystone.list('Incoming_IP').model;

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
	console.log('>>>>>ip',req.clientIp );
    next();
};


exports.checkForCountry = function (req, res, next) {
	// let geolocationApi = "";
	// if (process.env.ENVIRONMENT === "dev")
	// 	geolocationApi = "https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.GEO_LOCATION_API_Key + "&ip=" + process.env.US_IP;
	// else
	// console.log('geolocation');
	let geolocationApi = "https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.GEO_LOCATION_API_Key + "&ip=" + req.clientIp;
	console.log(geolocationApi);
	fetch(geolocationApi)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data);
			// console.log('country Name', data.country_name, 'contry code2', data.country_code2, 'countryCode3', data.country_code3);
			if (data.country_name === "United States" || data.country_code2 === "US" || data.country_code3 === "USA") {
				req.isAllowed = true;
			}
			else{
				// console.log('not from us');
				req.isAllowed = false;
				// res.status(404).send('Page not available');
			}
			next();
		})
		.catch(function (error) {
			console.log('requestFailed', error);
		});

};

exports.checkForProxy = function (req, res, next) {
	let emailId = process.env.EMAIL_ID;
	let ProxyReq = "http://check.getipintel.net/check.php?ip=" + req.clientIp + "&contact=" + emailId +"&format=json&flags=m";
	fetch(ProxyReq)
		.then(function(response) {
			return response.json()
		})
		.then(function(data) {
			if(data['status']!=="success") console.log('getIpIntel error ', data['message']);
			if(data['result'] < maxScoreAllowed) next();
			else console.log(data);
		})
		.catch(function(error) {
			console.log('Request failed', error);
		});
};

exports.checkIfBlocked = async function (req, res, next) {
	let isBlocked = await Blocked_IP.findOne({IP: req.clientIp}).catch(err => {console.log(err)});
	let incoming_ip = await Incoming_IP.findOne({IP: req.clientIp}).catch(err => {
		console.log(err)
	});
	// next();
	if(isBlocked){
		console.log('>>>>.');
		await addToLogs(req.clientIp);

		// console.log('dirname', path.join(__dirname, '..', 'templates', 'forbidden.html'));
		// res.sendfile(path.join(__dirname, '..', 'templates', 'forbidden.html'));
		// req.isBlocked = true;
		// res.send('hello');
	}
	else{
		next();
	}
	// else if (incoming_ip && incoming_ip.TotalSessions>3){
	// 	let blockedIp = new Blocked_IP({
	// 		IP: req.clientIp,
	// 		Remarks:"blocked automatically after 3 sessions"
	// 	});
	// 	await blockedIp.save();
	// 	res.sendfile(path.join(__dirname, '..', 'templates', 'forbidden.html'));
	// }
	// else {
	// 	console.log('ip',incoming_ip);
	// 	console.log('<<<<');
	// 	next();
	// }
};

async function addToLogs(IP){
	Incoming_IP.findOne({ IP:IP },function (err, doc) {
		if(err) throw err;
		if(doc) {
			doc.TotalSessions += 1;
			doc.save(err => {
				if (err) console.log('err', err)
			})
		}
	});
}

// exports.addIPAddressToDB = async function (req, res, next) {
// 	let Incoming_IP = keystone.list('Incoming_IP').model;
// 	console.log(req.clientIp);
//
// 	let incomingIp = new Incoming_IP({
// 		IP: req.clientIp
// 	});
// 	await incomingIp.save();
// 	next();
// };
