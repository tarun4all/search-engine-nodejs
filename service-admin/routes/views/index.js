// const keystone = require('keystone');
//
// exports = module.exports = function (req, res) {
// 	console.log('Client ip is ', req.clientIp);
// 	const view = new keystone.View(req, res);
// 	const locals = res.locals;
//
// 	// locals.section is used to set the currently selected
// 	// item in the header navigation.
// 	locals.section = 'home';
//
// 	// Render the view
// 	view.render('index');
// };


module.exports = async (req, res) => {
	if(req.query.search){
		res.redirect('FRONTEND_URL');
	}
	// res.send('<h1>backend Home</h1>');
	res.status(301).redirect(process.env.FRONTEND_URL);
};
